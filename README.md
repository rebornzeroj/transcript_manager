# Transcript Manager

A private transcript library Site. It accepts transcript text from ChatGPT, stores it in the owner's D1 database, and provides a searchable interface for reviewing and managing transcripts.

## Features

- Search transcript titles, bodies, and notes with a plain text scan (no full-text index)
- Sort by newest, oldest, or title
- Edit transcript text and optional notes, language, source, and tags
- Copy text or export as Markdown or plain text
- Delete transcripts with an in-app confirmation
- Save transcripts from ChatGPT through the Site MCP tool

## Source layout

- `worker/index.js` — Worker routes, MCP endpoint, and embedded responsive UI
- `drizzle/0001_create_transcripts.sql` — D1 schema migration
- `.openai/hosting.json` — Site identity, D1 binding, and MCP capability
- `scripts/build.sh` — Creates the deployable Worker artifact
- `scripts/validate-artifact.mjs` — Validates the Worker artifact

Edit source files, not generated `dist/` output.

## Build and validate

```sh
bash scripts/build.sh
node scripts/validate-artifact.mjs
```

The generated Worker entrypoint is `dist/server/index.js`. The Sites packaging workflow includes the D1 migration from `drizzle/`.

## Publishing

The live Site is published through OpenAI Sites and currently uses its Sites-managed source repository for deployment. This GitHub repository is the private code-management copy; after changes are made here, sync the intended source to the Sites checkout and publish through the Sites workflow.

## Data

Transcript records are scoped by the authenticated Site user ID. The library uses D1; audio files are not retained. Search uses SQL `LIKE` scans, suitable for the expected small collection (about 2–3 transcripts per week).