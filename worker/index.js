const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Transcript Library</title>
<style>
:root {
  font: 15px/1.5 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #252a24;
  background: #f5f6f1;
}
* { box-sizing: border-box; }
body { margin: 0; }
.top {
  min-height: 66px;
  background: #fff;
  border-bottom: 1px solid #e6e8e1;
  display: flex;
  align-items: center;
  padding: 14px max(22px, calc((100vw - 1216px)/2));
  gap: 11px;
}
.mark { width: 34px; height: 34px; flex: 0 0 34px; border-radius: 11px; background: #e1f0dc; color: #32683c; display: grid; place-items: center; font-weight: 800; }
.brand { font-weight: 720; letter-spacing: -.02em; }
.private { margin-left: auto; color: #727a70; font-size: 12px; }
.shell { max-width: 1260px; padding: 0 22px; margin: 36px auto; }
.intro { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 22px; }
.eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: .13em; color: #63825b; font-weight: 750; }
h1 { font-size: 31px; letter-spacing: -.045em; line-height: 1.15; margin: 7px 0 6px; }
.sub { margin: 0; color: #737a71; }
.total { font-size: 13px; color: #6e766d; white-space: nowrap; }
.layout { display: grid; grid-template-columns: minmax(270px, .76fr) minmax(0, 1.24fr); gap: 18px; align-items: start; }
.panel { min-width: 0; background: #fff; border: 1px solid #e5e8e1; border-radius: 16px; box-shadow: 0 4px 16px #22301b08; overflow: hidden; }
.panel-head { padding: 18px 19px 14px; border-bottom: 1px solid #eef0eb; }
.panel-head h2 { font-size: 16px; letter-spacing: -.02em; margin: 0; }
.muted { font-size: 12px; color: #7b8279; margin: 3px 0 0; }
.library-tools { padding: 14px 16px; display: grid; gap: 12px; }
.search { position: relative; }
.search input, .field input, .field textarea {
  display: block;
  font: inherit;
  width: 100%;
  min-width: 0;
  border: 1px solid #dce0d7;
  border-radius: 9px;
  padding: 10px 11px;
  outline: none;
  background: #fdfdfa;
  color: inherit;
}
.search input { padding-left: 39px; }
.search span { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #7c847a; display: flex; pointer-events: none; }
.search svg { width: 17px; height: 17px; }
.search input:focus, .field input:focus, .field textarea:focus { border-color: #79a870; box-shadow: 0 0 0 3px #e7f3e3; }
.toolbar { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 12px; color: #777e75; }
.toolbar label { display: flex; align-items: center; gap: 6px; }
.toolbar select { border: 1px solid #e1e4dd; background: white; border-radius: 8px; padding: 7px; font: inherit; color: #555d53; }
.results { padding: 0 10px 12px; max-height: 660px; overflow: auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 7px; }
.result { min-width: 0; border: 1px solid transparent; border-radius: 11px; padding: 12px; cursor: pointer; }
.result:hover { background: #fafcf8; border-color: #e7ece3; }
.result.active { background: #f0f7ec; border-color: #dbe9d5; }
.result:focus-visible { outline: 2px solid #79a870; outline-offset: -2px; }
.result-title { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.result-meta { font-size: 11px; color: #81877f; margin-top: 2px; }
.snippet { font-size: 12px; color: #5c6459; margin: 7px 0 0; line-height: 1.45; overflow-wrap: anywhere; }
.tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px; min-width: 0; }
.tag { max-width: 100%; font-size: 10px; padding: 2px 7px; border-radius: 99px; background: #edf2e9; color: #566b4f; overflow-wrap: anywhere; }
.empty { padding: 32px 14px; text-align: center; color: #81877d; font-size: 13px; }
.detail { min-height: 660px; }
.detail-body { padding: 22px; }
.detail-top { display: flex; justify-content: space-between; gap: 15px; align-items: flex-start; flex-wrap: wrap; }
.detail-top > div:first-child { min-width: 0; flex: 1 1 100%; }
.detail-title { font-size: 24px; line-height: 1.25; letter-spacing: -.04em; margin: 0 0 6px; overflow-wrap: anywhere; }
.meta-line { font-size: 12px; color: #7c837a; overflow-wrap: anywhere; }
.actions { display: flex; gap: 7px; flex-wrap: wrap; justify-content: flex-start; }
.btn { font: inherit; font-size: 12px; border: 1px solid #dfe3dc; background: #fff; border-radius: 8px; padding: 8px 11px; color: #343a32; cursor: pointer; white-space: nowrap; }
.btn:hover { background: #f6f8f3; }
.btn:focus-visible, .toolbar select:focus-visible { outline: 2px solid #79a870; outline-offset: 3px; }
.btn.primary { background: #326a3c; border-color: #326a3c; color: #fff; font-weight: 650; }
.btn.primary:hover { background: #285832; border-color: #285832; }
.btn.danger { color: #a8443e; }
.meta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 20px 0; }
.meta-box { min-width: 0; border: 1px solid #edf0e9; border-radius: 10px; padding: 10px 12px; }
.meta-box.wide { grid-column: 1 / -1; }
.meta-label { font-size: 10px; text-transform: uppercase; letter-spacing: .1em; color: #858b82; }
.meta-value { font-size: 13px; margin-top: 3px; overflow-wrap: anywhere; }
.section-label { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: #7f867c; font-weight: 700; margin: 22px 0 8px; }
.notes { color: #535b51; font-size: 13px; white-space: pre-wrap; overflow-wrap: anywhere; }
.transcript { white-space: pre-wrap; overflow-wrap: anywhere; border: 1px solid #edf0e9; border-radius: 11px; background: #fdfdfa; padding: 16px; font-size: 14px; line-height: 1.75; max-height: 460px; overflow: auto; }
.match { background: #ffefaf; border-radius: 3px; }
.form { display: grid; gap: 14px; margin-top: 22px; }
.editor-heading { flex-wrap: nowrap; }
.editor-heading > div:first-child { flex: 1 1 auto; }
.editor-heading > .btn { flex-shrink: 0; }
.field { min-width: 0; }
.field label { display: block; font-size: 12px; font-weight: 650; margin: 0 0 5px; }
.field textarea { min-height: 320px; resize: vertical; }
.form-footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; }
.status { font-size: 12px; color: #326a3c; overflow-wrap: anywhere; }
.confirm { margin-top: 18px; padding: 13px; border-radius: 10px; background: #fff5f3; border: 1px solid #f1d9d5; font-size: 13px; overflow-wrap: anywhere; }
.confirm p { margin: 0 0 10px; }
.confirm-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.foot { font-size: 11px; color: #92988f; margin: 17px 2px; }
@media (max-width: 820px) {
  .shell { margin: 26px auto; }
  .layout { grid-template-columns: minmax(0, 1fr); }
  .results { max-height: 350px; }
  .detail { min-height: 430px; }
  .intro { align-items: flex-start; flex-direction: column; gap: 8px; }
}
@media (max-width: 720px) {
  .top { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; row-gap: 6px; }
  .private { grid-column: 2 / -1; grid-row: 2; margin-left: 0; font-size: 11px; }
  #new-transcript { grid-column: 3; grid-row: 1; }
}
@media (max-width: 520px) {
  .shell { padding: 0 16px; }
  .top { padding: 12px 16px; gap: 6px 9px; }
  .brand { font-size: 14px; }
  .detail-body { padding: 18px; }
  .detail-title { font-size: 21px; }
  .meta-grid { grid-template-columns: minmax(0, 1fr); }
  .field input, .field textarea, .search input { font-size: 16px; }
}
</style></head><body>
<header class="top"><div class="mark">T</div><div class="brand">Transcript Library</div><div class="private">Private · only you can access this library</div><button class="btn primary" id="new-transcript">+ New transcript</button></header>
<main class="shell"><div class="intro"><div><div class="eyebrow">Your words, easy to find</div><h1>Transcript Library</h1><p class="sub">Search, revisit, and refine transcripts saved from your conversations.</p></div><div class="total" id="total">Loading library…</div></div>
<div class="layout"><section class="panel"><div class="panel-head"><h2>All transcripts</h2><p class="muted">Search titles and full text</p></div><div class="library-tools"><div class="search"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m16 16 4.5 4.5"></path></svg></span><input id="search" type="search" placeholder="Search transcript text…" aria-label="Search transcripts"></div><div class="toolbar"><span id="result-count">Loading…</span><label>Sort <select id="sort"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option></select></label></div></div><div id="results" class="results"></div></section>
<section class="panel detail"><div id="detail"></div></section></div><div class="foot">Audio transcription happens in ChatGPT. Text and optional details are stored in your private Site database.</div></main>
<script>
const $=s=>document.querySelector(s),results=$('#results'),detail=$('#detail'),search=$('#search'),sort=$('#sort');let entries=[],selected=null,timer;
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function preview(text,q){if(!q)return text.slice(0,130)+(text.length>130?'…':'');const i=text.toLocaleLowerCase().indexOf(q.toLocaleLowerCase());if(i<0)return text.slice(0,130)+(text.length>130?'…':'');const a=Math.max(0,i-45),b=Math.min(text.length,i+q.length+80);return(a?'…':'')+text.slice(a,b)+(b<text.length?'…':'')}
function ordered(){const a=[...entries];if(sort.value==='oldest')a.sort((x,y)=>x.createdAt.localeCompare(y.createdAt));else if(sort.value==='title')a.sort((x,y)=>x.title.localeCompare(y.title));else a.sort((x,y)=>y.createdAt.localeCompare(x.createdAt));return a}
function renderList(){const a=ordered();$('#total').textContent=entries.length+' '+(entries.length===1?'transcript':'transcripts');$('#result-count').textContent=a.length+' '+(a.length===1?'result':'results');if(!a.length){results.innerHTML='<div class="empty">No transcripts found.<br>Try another search or add one from ChatGPT.</div>';renderDetail();return}results.innerHTML=a.map(e=>'<article class="result '+(e.id===selected?'active':'')+'" data-id="'+esc(e.id)+'"><div class="result-title">'+esc(e.title)+'</div><div class="result-meta">'+new Date(e.createdAt).toLocaleDateString()+' · '+e.text.length.toLocaleString()+' characters</div><p class="snippet">'+esc(preview(e.text,search.value.trim()))+'</p>'+(e.tags?.length?'<div class="tags">'+e.tags.map(t=>'<span class="tag">'+esc(t)+'</span>').join('')+'</div>':'')+'</article>').join('');results.querySelectorAll('.result').forEach(el=>el.onclick=()=>{selected=el.dataset.id;renderList();renderDetail()})}
function renderDetail(){const e=entries.find(x=>x.id===selected);if(!e){detail.innerHTML='<div class="empty" style="padding:95px 24px"><div style="font-size:22px;color:#53644e;margin-bottom:7px">Choose a transcript</div>Select a result to read, edit, copy, or export it.</div>';return}const q=search.value.trim();detail.innerHTML='<div class="detail-body"><div class="detail-top"><div><h2 class="detail-title">'+esc(e.title)+'</h2><div class="meta-line">Added '+new Date(e.createdAt).toLocaleString()+(e.updatedAt&&e.updatedAt!==e.createdAt?' · Edited '+new Date(e.updatedAt).toLocaleString():'')+'</div></div><div class="actions"><button class="btn" id="edit">Edit</button><button class="btn" id="copy">Copy</button><button class="btn" id="txt">Export .txt</button><button class="btn" id="md">Export .md</button><button class="btn danger" id="delete">Delete</button></div></div><div class="meta-grid"><div class="meta-box"><div class="meta-label">Language</div><div class="meta-value">'+esc(e.language||'Not specified')+'</div></div><div class="meta-box"><div class="meta-label">Source</div><div class="meta-value">'+esc(e.source||'ChatGPT')+'</div></div><div class="meta-box wide"><div class="meta-label">Tags</div><div class="tags">'+(e.tags?.length?e.tags.map(t=>'<span class="tag">'+esc(t)+'</span>').join(''):'<span class="muted">No tags</span>')+'</div></div></div>'+(e.notes?'<div class="section-label">Notes</div><div class="notes">'+esc(e.notes)+'</div>':'')+'<div class="section-label">Transcript</div><div class="transcript" id="transcript-body">'+(q?highlight(e.text,q):esc(e.text))+'</div><div id="confirm"></div></div>';
$('#edit').onclick=()=>editForm(e);$('#copy').onclick=async()=>{await navigator.clipboard.writeText(e.text);flash('Transcript copied.')};$('#txt').onclick=()=>download(e.title+'.txt',e.text);$('#md').onclick=()=>download(e.title+'.md','# '+e.title+'\\n\\n'+e.text);$('#delete').onclick=()=>{$('#confirm').innerHTML='<div class="confirm"><p>Delete “'+esc(e.title)+'” permanently?</p><div class="confirm-actions"><button class="btn danger" id="yes-delete">Delete transcript</button><button class="btn" id="no-delete">Cancel</button></div></div>';$('#yes-delete').onclick=()=>remove(e.id);$('#no-delete').onclick=()=>$('#confirm').replaceChildren()};}
function highlight(s,q){
  if(!q)return esc(s);
  const escaped=q.replace(/[.*+?^\${}()|[\\]\\\\]/g,'\\\\$&');
  const pattern=new RegExp(escaped,'giu');
  let out='',from=0;
  for(const match of s.matchAll(pattern)){
    out+=esc(s.slice(from,match.index))+'<mark class="match">'+esc(match[0])+'</mark>';
    from=match.index+match[0].length;
  }
  return out+esc(s.slice(from));
}
function editForm(e){detail.innerHTML='<div class="detail-body"><div class="detail-top editor-heading"><div><h2 class="detail-title">'+(e?'Edit transcript':'New transcript')+'</h2><div class="meta-line">Keep notes, language, source, and tags optional.</div></div><button class="btn" id="cancel">Cancel</button></div><form class="form" id="edit-form"><div class="field"><label for="f-title">Title</label><input id="f-title" required maxlength="160" value="'+esc(e?.title||'')+'" placeholder="e.g. Author interview"></div><div class="field"><label for="f-text">Transcript</label><textarea id="f-text" required maxlength="200000" placeholder="Paste transcript text…">'+esc(e?.text||'')+'</textarea></div><div class="field"><label for="f-notes">Notes</label><textarea id="f-notes" style="min-height:72px" placeholder="Optional context or follow-up…">'+esc(e?.notes||'')+'</textarea></div><div class="meta-grid" style="margin:0"><div class="field"><label for="f-language">Language</label><input id="f-language" value="'+esc(e?.language||'')+'" placeholder="e.g. Chinese, Japanese"></div><div class="field"><label for="f-source">Source</label><input id="f-source" value="'+esc(e?.source||'')+'" placeholder="e.g. ChatGPT audio transcription"></div></div><div class="field"><label for="f-tags">Tags</label><input id="f-tags" value="'+esc((e?.tags||[]).join(', '))+'" placeholder="interview, rights meeting, project"></div><div class="form-footer"><span class="status" id="save-status"></span><button class="btn primary" type="submit">Save transcript</button></div></form></div>';
$('#cancel').onclick=()=>renderDetail();$('#edit-form').onsubmit=async ev=>{ev.preventDefault();const data={title:$('#f-title').value,text:$('#f-text').value,notes:$('#f-notes').value,language:$('#f-language').value,source:$('#f-source').value,tags:$('#f-tags').value.split(',').map(x=>x.trim()).filter(Boolean)};const status=$('#save-status');status.textContent='Saving…';try{const url=e?'/api/transcripts/'+encodeURIComponent(e.id):'/api/transcripts';const r=await fetch(url,{method:e?'PATCH':'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)}),d=await r.json();if(!r.ok)throw Error(d.error||'Could not save');selected=d.id;await load();flash('Transcript saved.')}catch(err){status.textContent=err.message}};}
async function remove(id){try{const r=await fetch('/api/transcripts/'+encodeURIComponent(id),{method:'DELETE'});if(!r.ok)throw Error('Could not delete transcript.');selected=null;await load();flash('Transcript deleted.')}catch(e){flash(e.message)}}
function download(name,content){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));a.download=name.replace(/[\\/:*?"<>|]/g,'_');a.click();URL.revokeObjectURL(a.href)}
function flash(message){let el=$('#flash');if(!el){el=document.createElement('div');el.id='flash';el.className='status';detail.querySelector('.detail-body')?.append(el)}el.textContent=message;setTimeout(()=>el.remove(),2200)}
async function load(){try{const p=new URLSearchParams();if(search.value.trim())p.set('q',search.value.trim());const r=await fetch('/api/transcripts?'+p);if(!r.ok)throw Error('Could not load library.');entries=await r.json();if(!entries.some(e=>e.id===selected))selected=entries[0]?.id||null;renderList();renderDetail()}catch{results.innerHTML='<div class="empty">Could not load transcripts. Refresh the page to try again.</div>'}}
search.oninput=()=>{clearTimeout(timer);timer=setTimeout(load,180)};sort.onchange=renderList;$('#new-transcript').onclick=()=>editForm(null);load();
</script></body></html>`;

const headers = {"content-type":"application/json; charset=utf-8", "cache-control":"no-store"};
const fail = (error, status=400) => Response.json({error}, {status, headers});
function identity(request){return request.headers.get("oai-authenticated-user-id") || "local-demo";}
function cleanTitle(value){return typeof value === "string" ? value.trim().slice(0,160) : "";}
function cleanText(value){return typeof value === "string" ? value.trim().slice(0,200000) : "";}
function cleanOptional(value,max=5000){return typeof value === "string"?value.trim().slice(0,max):"";}
function cleanTags(value){if(Array.isArray(value))return [...new Set(value.map(v=>cleanOptional(v,50)).filter(Boolean))].slice(0,30);if(typeof value==="string")return cleanTags(value.split(","));return[];}
function db(env){if(!env.DB)throw Error("Site database is not configured yet.");return env.DB;}
function decodeRow(row){return{...row,tags:JSON.parse(row.tags||"[]"),notes:row.notes||"",language:row.language||"",source:row.source||""};}
async function readAll(env,user,q=""){const pattern=`%${q.replace(/[\^%_]/g,"^$&")}%`;const sql=q?"SELECT id,title,body AS text,notes,language,source,tags,created_at AS createdAt,updated_at AS updatedAt FROM transcripts WHERE user_id=? AND (title LIKE ? ESCAPE '^' OR body LIKE ? ESCAPE '^' OR notes LIKE ? ESCAPE '^') ORDER BY created_at DESC LIMIT 500":"SELECT id,title,body AS text,notes,language,source,tags,created_at AS createdAt,updated_at AS updatedAt FROM transcripts WHERE user_id=? ORDER BY created_at DESC LIMIT 500";const result=q?await db(env).prepare(sql).bind(user,pattern,pattern,pattern).all():await db(env).prepare(sql).bind(user).all();return(result.results||[]).map(decodeRow);}
async function save(env,user,title,text,extra={}){title=cleanTitle(title);text=cleanText(text);if(!title||!text)throw Error("Both title and transcript text are required.");const id=crypto.randomUUID(),now=new Date().toISOString(),notes=cleanOptional(extra.notes),language=cleanOptional(extra.language,100),source=cleanOptional(extra.source,160),tags=JSON.stringify(cleanTags(extra.tags));await db(env).prepare("INSERT INTO transcripts (id,user_id,title,body,notes,language,source,tags,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)").bind(id,user,title,text,notes,language,source,tags,now,now).run();return{id,title,text,notes,language,source,tags:JSON.parse(tags),createdAt:now,updatedAt:now};}
async function update(env,user,id,data){const title=cleanTitle(data.title),text=cleanText(data.text);if(!title||!text)throw Error("Both title and transcript text are required.");const now=new Date().toISOString(),notes=cleanOptional(data.notes),language=cleanOptional(data.language,100),source=cleanOptional(data.source,160),tags=JSON.stringify(cleanTags(data.tags));const result=await db(env).prepare("UPDATE transcripts SET title=?,body=?,notes=?,language=?,source=?,tags=?,updated_at=? WHERE id=? AND user_id=?").bind(title,text,notes,language,source,tags,now,id,user).run();if(!result.meta?.changes)throw Error("Transcript not found.");const rows=await db(env).prepare("SELECT id,title,body AS text,notes,language,source,tags,created_at AS createdAt,updated_at AS updatedAt FROM transcripts WHERE id=? AND user_id=?").bind(id,user).all();return decodeRow(rows.results[0]);}
async function handleMcp(request,env){let body;try{body=await request.json()}catch{return fail("Invalid JSON-RPC request.")};const id=body.id??null;const reply=(result)=>Response.json({jsonrpc:"2.0",id,result},{headers});if(body.method==="server/discover")return reply({supportedVersions:["2026-07-28"],capabilities:{tools:{}}});if(body.method==="initialize")return reply({protocolVersion:"2026-07-28",capabilities:{tools:{}},serverInfo:{name:"transcript-inbox",version:"1.1.0"}});if(body.method==="notifications/initialized")return new Response(null,{status:202});if(body.method==="tools/list")return reply({tools:[{name:"save_transcript",description:"Save a transcript to the signed-in user's private Transcript Library. Optionally include notes, language, source, and tags.",inputSchema:{type:"object",properties:{title:{type:"string",description:"A short descriptive title."},text:{type:"string",description:"Full transcript text."},notes:{type:"string"},language:{type:"string"},source:{type:"string"},tags:{type:"array",items:{type:"string"}}},required:["title","text"],additionalProperties:false}}]});if(body.method==="tools/call"){const name=body.params?.name,args=body.params?.arguments||{};if(name!=="save_transcript")return Response.json({jsonrpc:"2.0",id,error:{code:-32601,message:"Unknown tool."}},{status:404,headers});try{const saved=await save(env,identity(request),args.title,args.text,args);return reply({content:[{type:"text",text:JSON.stringify({saved:true,id:saved.id,title:saved.title,createdAt:saved.createdAt})}],structuredContent:{saved:true,id:saved.id,title:saved.title,createdAt:saved.createdAt}})}catch(e){return reply({content:[{type:"text",text:e.message}],isError:true})}}return Response.json({jsonrpc:"2.0",id,error:{code:-32601,message:"Method not found."}},{status:404,headers});}

export default {async fetch(request,env){const url=new URL(request.url),path=url.pathname;if(path==="/mcp"&&request.method==="POST")return handleMcp(request,env);if(path==="/api/transcripts"){const user=identity(request);if(request.method==="GET"){try{return Response.json(await readAll(env,user,url.searchParams.get("q")||""),{headers})}catch(e){return fail(e.message,500)}}if(request.method==="POST"){try{const body=await request.json();const record=await save(env,user,body.title,body.text,body);return Response.json(record,{status:201,headers})}catch(e){return fail(e.message)}}return new Response("Method not allowed",{status:405,headers:{allow:"GET, POST"}})}if(path.startsWith("/api/transcripts/")){const user=identity(request),id=decodeURIComponent(path.slice("/api/transcripts/".length));try{if(request.method==="PATCH"){const body=await request.json();return Response.json(await update(env,user,id,body),{headers})}if(request.method==="DELETE"){const result=await db(env).prepare("DELETE FROM transcripts WHERE id=? AND user_id=?").bind(id,user).run();if(!result.meta?.changes)return fail("Transcript not found.",404);return Response.json({deleted:true},{headers})}return new Response("Method not allowed",{status:405,headers:{allow:"PATCH, DELETE"}})}catch(e){return fail(e.message,e.message==="Transcript not found."?404:400)}}if(path!=="/")return new Response("Not found",{status:404});return new Response(page,{headers:{"content-type":"text/html; charset=utf-8"}})}};
