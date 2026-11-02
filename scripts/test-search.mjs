import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { test } from 'node:test';
import worker from '../worker/index.js';

const schema = readFileSync(new URL('../drizzle/0001_create_transcripts.sql', import.meta.url), 'utf8');

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(schema);
  function prepare(sql, values = []) {
    return {
      bind: (...parameters) => prepare(sql, parameters),
      all: async () => ({ results: sqlite.prepare(sql).all(...values) }),
      run: async () => ({ meta: { changes: Number(sqlite.prepare(sql).run(...values).changes) } }),
    };
  }
  return { sqlite, env: { DB: { prepare, batch: statements => Promise.all(statements.map(statement => statement.all())) } } };
}

function insert(sqlite, { id, user = 'owner', title = id, body = 'Conversation', notes = '', tags = [], createdAt = '2026-11-02T00:00:00.000Z' }) {
  sqlite.prepare('INSERT INTO transcripts (id,user_id,title,body,notes,tags,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)')
    .run(id, user, title, body, notes, JSON.stringify(tags), createdAt, createdAt);
}

async function request(env, pathname, { query = '', tags = [], user = 'owner', method = 'GET', body } = {}) {
  const url = new URL(pathname, 'https://library.test');
  if (query) url.searchParams.set('q', query);
  for (const tag of tags) url.searchParams.append('tag', tag);
  const response = await worker.fetch(new Request(url, {
    method,
    headers: { 'oai-authenticated-user-id': user, 'content-type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }), env);
  return { status: response.status, data: await response.json() };
}

async function ids(env, options) {
  const response = await request(env, '/api/transcripts', options);
  assert.equal(response.status, 200);
  return response.data.map(row => row.id).sort();
}

function seed(sqlite) {
  insert(sqlite, { id: 'alpha', body: 'Needle in transcript text', tags: ['design', 'interview'] });
  insert(sqlite, { id: 'beta', notes: 'Needle in notes', tags: ['research'] });
  insert(sqlite, { id: 'gamma', tags: ['design', 'research'] });
  insert(sqlite, { id: 'untagged' });
  insert(sqlite, { id: 'literal', body: 'Literal % _ ^ & <speaker>', tags: ['100%', 'a_b', 'work, notes', '"quoted"', '<tag>'] });
  insert(sqlite, { id: 'different-case', tags: ['Design'] });
  insert(sqlite, { id: 'other-owner', user: 'someone-else', body: 'Needle', tags: ['secret', 'design'] });
}

test('multiple tag filters match any exact tag and combine with text search', async () => {
  const { sqlite, env } = database();
  try {
    seed(sqlite);
    assert.deepEqual(await ids(env, { tags: ['design'] }), ['alpha', 'gamma']);
    assert.deepEqual(await ids(env, { tags: ['design', 'research'] }), ['alpha', 'beta', 'gamma']);
    assert.deepEqual(await ids(env, { query: 'Needle', tags: ['design', 'research'] }), ['alpha', 'beta']);
    assert.deepEqual(await ids(env, { query: 'Needle', tags: ['design'] }), ['alpha']);
    assert.deepEqual(await ids(env, { tags: ['unknown'] }), []);
    assert.deepEqual(await ids(env, { tags: ['unknown', 'design', 'design'] }), ['alpha', 'gamma']);
    assert.deepEqual(await ids(env, { tags: ['Design'] }), ['different-case']);
    assert.deepEqual(await ids(env, { tags: [''] }), ['alpha', 'beta', 'different-case', 'gamma', 'literal', 'untagged']);
    assert.deepEqual(await ids(env, { query: 'design' }), [], 'Text search does not implicitly search the tag field');
    assert.deepEqual(await ids(env, { tags: ['design'], user: 'someone-else' }), ['other-owner']);
  } finally { sqlite.close(); }
});

test('literal punctuation and SQL-looking input stay parameterized', async () => {
  const { sqlite, env } = database();
  try {
    seed(sqlite);
    for (const tag of ['100%', 'a_b', 'work, notes', '"quoted"', '<tag>']) {
      assert.deepEqual(await ids(env, { tags: [tag] }), ['literal']);
    }
    assert.deepEqual(await ids(env, { tags: ['work'] }), []);
    for (const query of ['%', '_', '^', '&', '<speaker>']) {
      assert.deepEqual(await ids(env, { query }), ['literal']);
    }
    assert.deepEqual(await ids(env, { tags: ["' OR 1=1 --"] }), []);
    assert.deepEqual(await ids(env, { query: "' OR 1=1 --" }), []);
  } finally { sqlite.close(); }
});

test('tag choices and counts cover the whole owner library and count each transcript once', async () => {
  const { sqlite, env } = database();
  try {
    seed(sqlite);
    insert(sqlite, { id: 'legacy-duplicate', tags: ['design', 'design'] });
    const { status, data } = await request(env, '/api/tags', { query: 'does not match', tags: ['unknown'] });
    assert.equal(status, 200);
    assert.equal(data.total, 7);
    assert.deepEqual(Object.fromEntries(data.tags.map(tag => [tag.name, tag.count])), {
      design: 3, interview: 1, research: 2, '100%': 1, a_b: 1, 'work, notes': 1, '"quoted"': 1, '<tag>': 1, Design: 1,
    });
    const other = await request(env, '/api/tags', { user: 'someone-else' });
    assert.equal(other.data.total, 1);
    assert.deepEqual(Object.fromEntries(other.data.tags.map(tag => [tag.name, tag.count])), { design: 1, secret: 1 });
    assert.deepEqual((await request(env, '/api/tags', { user: 'empty-owner' })).data, { tags: [], total: 0 });
  } finally { sqlite.close(); }
});

test('filtering happens before the result limit; tag choices include older transcripts', async () => {
  const { sqlite, env } = database();
  try {
    for (let index = 0; index < 600; index++) {
      insert(sqlite, { id: String(index), tags: index === 0 ? ['archive'] : ['recent'], createdAt: new Date(Date.UTC(2026, 0, 1) + index * 1000).toISOString() });
    }
    const unfiltered = await ids(env, {});
    assert.equal(unfiltered.length, 500);
    assert.ok(!unfiltered.includes('0'));
    assert.deepEqual(await ids(env, { tags: ['archive'] }), ['0']);
    const catalog = (await request(env, '/api/tags')).data;
    assert.equal(catalog.total, 600);
    assert.deepEqual(catalog.tags, [{ name: 'archive', count: 1 }, { name: 'recent', count: 599 }]);
  } finally { sqlite.close(); }
});

test('catalog updates after saving, editing, and deleting tagged transcripts', async () => {
  const { sqlite, env } = database();
  try {
    const created = await request(env, '/api/transcripts', { method: 'POST', body: { title: 'New entry', text: 'Transcript text', tags: ['new topic'] } });
    assert.equal(created.status, 201);
    assert.deepEqual((await request(env, '/api/tags')).data, { tags: [{ name: 'new topic', count: 1 }], total: 1 });
    const updated = await request(env, '/api/transcripts/' + created.data.id, { method: 'PATCH', body: { title: 'New entry', text: 'Transcript text', tags: ['updated topic'] } });
    assert.equal(updated.status, 200);
    assert.deepEqual(await ids(env, { tags: ['new topic'] }), []);
    assert.deepEqual((await request(env, '/api/tags')).data, { tags: [{ name: 'updated topic', count: 1 }], total: 1 });
    assert.equal((await request(env, '/api/transcripts/' + created.data.id, { method: 'DELETE' })).status, 200);
    assert.deepEqual((await request(env, '/api/tags')).data, { tags: [], total: 0 });
  } finally { sqlite.close(); }
});
