<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mosaïque TNT France 2025</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.12/hls.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a12;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;overflow-x:hidden}
#topbar{background:linear-gradient(135deg,#1a1a2e,#16213e);padding:8px 15px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #2a2a4a;position:sticky;top:0;z-index:100;flex-wrap:wrap;gap:6px}
#topbar h1{font-size:1.1em;background:linear-gradient(90deg,#4facfe,#00f2fe);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.controls label{font-size:.8em;color:#8888aa}
.ctrl-btn,.ctrl-sel{background:#1e1e3a;color:#fff;border:1px solid #3a3a5c;border-radius:6px;padding:5px 10px;font-size:.8em;cursor:pointer}
.ctrl-sel:hover,.ctrl-btn:hover{border-color:#4facfe}
.ctrl-btn.primary{background:#4facfe;color:#000;border-color:#4facfe;font-weight:700}
.ctrl-btn.green{background:#1e3a1e;color:#4f4;border-color:#2a5c2a}
.ctrl-btn.green:hover{border-color:#4f4}
.ctrl-btn.red{background:#3a1e1e;color:#f66;border-color:#5c2a2a}
.ctrl-btn.red:hover{border-color:#f66}
#sidebar{position:fixed;left:0;top:0;bottom:0;width:280px;background:#12122a;border-right:1px solid #2a2a4a;overflow-y:auto;z-index:200;transform:translateX(-280px);transition:transform .3s}
#sidebar.open{transform:translateX(0)}
#sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:190}
#sidebar-overlay.open{display:block}
#sidebar h3{padding:12px 15px 8px;font-size:.78em;color:#6a6a8a;text-transform:uppercase;letter-spacing:1px}
#sidebar .sidebar-header{display:flex;align-items:center;justify-content:space-between;padding:12px 15px 0}
#sidebar .sidebar-header h2{font-size:.95em;color:#4facfe}
#sidebar .sidebar-close{background:none;border:none;color:#888;font-size:1.3em;cursor:pointer}
#sidebar .sidebar-close:hover{color:#fff}
.ch-item{display:flex;align-items:center;gap:10px;padding:7px 15px;cursor:pointer;transition:background .2s;border-left:3px solid transparent}
.ch-item:hover{background:#1a1a3a}
.ch-item.selected{background:#1a1a3a;border-left-color:#4facfe}
.ch-item input[type=checkbox]{accent-color:#4facfe;width:15px;height:15px;cursor:pointer}
.ch-item .ch-num{font-size:.72em;color:#5a5a7a;min-width:20px;text-align:right}
.ch-item .ch-name{font-size:.82em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.select-actions{padding:8px 15px;display:flex;gap:5px}
.select-actions button{flex:1;background:#1e1e3a;color:#aaa;border:1px solid #2a2a4a;border-radius:5px;padding:4px;font-size:.7em;cursor:pointer}
.select-actions button:hover{color:#fff;border-color:#4facfe}
#profile-section{padding:10px 15px;border-bottom:1px solid #2a2a4a}
#profile-section .profile-row{display:flex;gap:5px;margin-bottom:6px;align-items:center}
#profile-section select{flex:1;background:#1e1e3a;color:#fff;border:1px solid #3a3a5c;border-radius:5px;padding:5px;font-size:.8em}
#profile-section input{flex:1;background:#1e1e3a;color:#fff;border:1px solid #3a3a5c;border-radius:5px;padding:5px;font-size:.8em}
#profile-section input::placeholder{color:#555}
.pbtn{background:#1e1e3a;color:#aaa;border:1px solid #2a2a4a;border-radius:5px;padding:4px 8px;font-size:.75em;cursor:pointer;white-space:nowrap}
.pbtn:hover{color:#fff;border-color:#4facfe}
.pbtn.save{color:#4f4;border-color:#2a5c2a}
.pbtn.save:hover{border-color:#4f4}
.pbtn.del{color:#f66;border-color:#5c2a2a}
.pbtn.del:hover{border-color:#f66}
#proxy-section{padding:10px 15px;border-bottom:1px solid #2a2a4a}
#proxy-section .proxy-row{display:flex;gap:5px;margin-bottom:6px;align-items:center}
#proxy-section .proxy-status{font-size:.72em;padding:4px 8px;border-radius:4px;margin-top:4px;display:inline-block}
#proxy-section .proxy-status.ok{background:#1e3a1e;color:#4f4}
#proxy-section .proxy-status.warn{background:#3a3a1a;color:#ff4}
#proxy-section .proxy-status.err{background:#3a1e1e;color:#f66}
#main{padding:10px;min-height:calc(100vh - 52px)}
#mosaic{display:grid;gap:4px;width:100%;height:calc(100vh - 60px)}
.tile{position:relative;background:#111125;border-radius:6px;overflow:hidden;cursor:pointer;border:2px solid transparent;transition:border-color .2s}
.tile:hover{border-color:#4facfe}
.tile.playing{border-color:#00f2fe;box-shadow:0 0 15px rgba(0,242,254,.2)}
.tile video{width:100%;height:100%;object-fit:contain;background:#000}
.tile-label{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.85));padding:6px 10px 5px;display:flex;align-items:center;gap:6px;pointer-events:none}
.tile-label .num{background:#4facfe;color:#000;font-size:.63em;font-weight:700;padding:1px 5px;border-radius:3px}
.tile-label .name{font-size:.73em;font-weight:600;text-shadow:0 1px 3px rgba(0,0,0,.8)}
.tile-label .proxy-badge{font-size:.55em;padding:1px 4px;border-radius:3px;font-weight:700}
.tile-label .proxy-badge.proxied{background:#2a5c2a;color:#4f4}
.tile-label .proxy-badge.direct{background:#2a2a4a;color:#888}
.tile-status{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.7em;color:#5a5a7a;text-align:center;pointer-events:none}
.tile-controls{position:absolute;top:5px;left:5px;right:40px;display:flex;gap:3px;opacity:0;transition:opacity .2s}
.tile:hover .tile-controls{opacity:1}
.tile-ctrl-btn{background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:.6em;padding:2px 6px;border-radius:4px;cursor:pointer;white-space:nowrap}
.tile-ctrl-btn:hover{background:rgba(79,172,254,.3);border-color:#4facfe}
.tile-ctrl-btn.live-btn{color:#f44;font-weight:700}
.tile-ctrl-btn.live-btn.is-live{color:#4f4}
.tile-mute{position:absolute;top:5px;right:5px;background:rgba(0,0,0,.6);border:none;color:#fff;font-size:.7em;padding:3px 7px;border-radius:4px;cursor:pointer;opacity:0;transition:opacity .2s}
.tile:hover .tile-mute{opacity:1}
#fs-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:300;align-items:center;justify-content:center;flex-direction:column}
#fs-overlay.show{display:flex}
#fs-overlay video{max-width:95vw;max-height:80vh;border-radius:8px}
#fs-overlay .fs-bar{padding:12px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
#fs-overlay .fs-bar .name{font-size:1.1em;font-weight:700}
#fs-overlay .fs-bar button{background:#1e1e3a;color:#fff;border:1px solid #3a3a5c;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:.85em}
#fs-overlay .fs-bar button:hover{border-color:#4facfe}
#fs-overlay .fs-bar button.live-active{color:#4f4;border-color:#2a5c2a}
#fs-overlay .fs-bar .time-info{font-size:.8em;color:#8888aa;min-width:80px;text-align:center}
#sidebar::-webkit-scrollbar{width:6px}
#sidebar::-webkit-scrollbar-track{background:#12122a}
#sidebar::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:3px}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1a3a1a;color:#4f4;border:1px solid #2a5c2a;padding:10px 25px;border-radius:8px;font-size:.85em;z-index:400;animation:fadeInOut 2.5s forwards;max-width:90vw;text-align:center}
@keyframes fadeInOut{0%{opacity:0;transform:translateX(-50%) translateY(10px)}15%{opacity:1;transform:translateX(-50%) translateY(0)}85%{opacity:1}100%{opacity:0}}
</style>
</head>
<body>

<div id="topbar">
  <h1>📺 Mosaïque TNT 2025</h1>
  <div class="controls">
    <label>Profil:</label>
    <select id="profileQuick" class="ctrl-sel"></select>
    <button class="ctrl-btn" id="toggleSidebar">☰ Chaînes</button>
  </div>
</div>

<div id="sidebar-overlay"></div>
<div id="sidebar">
  <div class="sidebar-header">
    <h2>📺 Configuration</h2>
    <button class="sidebar-close" id="closeSidebar">✕</button>
  </div>

  <div id="proxy-section">
    <h3>🔧 Proxy PHP (CORS)</h3>
    <div class="proxy-row">
      <label style="font-size:.75em;color:#8888aa;display:flex;align-items:center;gap:5px;cursor:pointer">
        <input type="checkbox" id="proxyEnabled" checked style="accent-color:#4facfe"> Activer le proxy PHP (proxy.php)
      </label>
    </div>
    <div class="proxy-row">
      <label style="font-size:.75em;color:#8888aa;display:flex;align-items:center;gap:5px;cursor:pointer">
        <input type="checkbox" id="proxyAll" style="accent-color:#4facfe"> Proxifier toutes les chaînes (pas seulement netplus)
      </label>
    </div>
    <div class="proxy-row">
      <button class="pbtn" id="btnTestProxy">🧪 Tester le proxy</button>
      <span id="proxyStatus"></span>
    </div>
    <div style="font-size:.68em;color:#6a6a8a;padding:4px 0;line-height:1.4">
      Le proxy PHP récupère les flux côté serveur pour contourner les blocages CORS du navigateur.
      Nécessite cURL activé dans PHP.
    </div>
  </div>

  <div id="profile-section">
    <h3>Profils de mosaïque</h3>
    <div class="profile-row">
      <select id="profileSelect"></select>
      <button class="pbtn" id="btnLoadProfile">📂</button>
    </div>
    <div class="profile-row">
      <input type="text" id="profileName" placeholder="Nom du profil...">
      <button class="pbtn save" id="btnSaveProfile">💾 Sauver</button>
    </div>
    <div class="profile-row">
      <button class="pbtn del" id="btnDelProfile" style="flex:1">🗑️ Supprimer le profil sélectionné</button>
    </div>
    <div class="profile-row">
      <label style="font-size:.8em;color:#8888aa;white-space:nowrap">Grille :</label>
      <select id="gridSelect" style="flex:1;background:#1e1e3a;color:#fff;border:1px solid #3a3a5c;border-radius:5px;padding:5px;font-size:.8em">
        <option value="2">2×2 (4 chaînes)</option>
        <option value="3" selected>3×3 (9 chaînes)</option>
        <option value="4">4×4 (16 chaînes)</option>
        <option value="5">5×5 (25 chaînes)</option>
      </select>
    </div>
  </div>

  <h3>Sélection des chaînes</h3>
  <div class="select-actions">
    <button onclick="window.selAll()">✔ Tout</button>
    <button onclick="window.selNone()">✖ Aucun</button>
    <button onclick="window.selInfo()">📰 Info</button>
    <button onclick="window.selGen()">📺 Général.</button>
  </div>
  <div id="channelList"></div>
</div>

<div id="main">
  <div id="mosaic"></div>
</div>

<div id="fs-overlay">
  <video id="fsVideo" controls autoplay></video>
  <div class="fs-bar">
    <span class="name" id="fsName"></span>
    <button onclick="fSeek(-300)">⏪ -5min</button>
    <button onclick="fSeek(-60)">⏪ -1min</button>
    <button onclick="fSeek(-15)">⏪ -15s</button>
    <button onclick="fSeek(15)">+15s ⏩</button>
    <button onclick="fSeek(60)">+1min ⏩</button>
    <span class="time-info" id="fsTimeInfo">● LIVE</span>
    <button id="fsLiveBtn" onclick="fGoLive()" class="live-active">● LIVE</button>
    <button onclick="window.closeFs()">✕ Fermer</button>
  </div>
</div>

<script>
// ============================================================
// CONFIGURATION DES CHAÎNES
// ============================================================
const PROXY_SCRIPT = 'proxy.php';

const CH = [
  {n:1,  name:"TF1",              url:"https://poland.assistancefrancaise.com/hls/transcoder02/1/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:2,  name:"France 2",         url:"https://raw.githubusercontent.com/schumijo/iptv/main/playlists/francetv/france2.m3u8", cat:"gen", needsProxy:false},
  {n:3,  name:"France 3",         url:"https://raw.githubusercontent.com/schumijo/iptv/main/playlists/francetv/france3.m3u8", cat:"gen", needsProxy:false},
  {n:4,  name:"France 4",         url:"https://raw.githubusercontent.com/schumijo/iptv/main/playlists/francetv/france4.m3u8", cat:"gen", needsProxy:false},
  {n:5,  name:"France 5",         url:"https://raw.githubusercontent.com/schumijo/iptv/main/playlists/francetv/france5.m3u8", cat:"gen", needsProxy:false},
  {n:6,  name:"M6",               url:"https://poland.assistancefrancaise.com/hls/transcoder03/19/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:7,  name:"Arte",             url:"https://artesimulcast.akamaized.net/hls/live/2031003/artelive_fr/index.m3u8", cat:"gen", needsProxy:false},
  {n:8,  name:"LCP",              url:"https://raw.githubusercontent.com/schumijo/iptv/main/playlists/francetv/lcpps.m3u8", cat:"info", needsProxy:false},
  {n:9,  name:"W9",               url:"https://poland.assistancefrancaise.com/hls/transcoder02/20/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:10, name:"TMC",              url:"https://poland.assistancefrancaise.com/hls/transcoder03/9/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:11, name:"TFX",              url:"https://poland.assistancefrancaise.com/hls/transcoder03/10/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:12, name:"Gulli",            url:"https://poland.assistancefrancaise.com/hls/transcoder03/23/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:13, name:"BFM TV",           url:"https://live-cdn-bfmtv-euw1.bfmtv.bct.nextradiotv.com/m1/media.m3u8", cat:"info", needsProxy:false},
  {n:14, name:"CNews",            url:"https://hls-m015-live-aka-canalplus.akamaized.net/live/disk/cnews-clair-hd/hls-v3-hd-clair/cnews-clair-hd.m3u8", cat:"info", needsProxy:false},
  {n:15, name:"LCI",              url:"https://tvradiozap.eu/tools/tf-m3u8.php/LCI.m3u8", cat:"info", needsProxy:false},
  {n:16, name:"Franceinfo",       url:"https://tvradiozap.eu/tools/ft-m3u8.php/franceinfo.m3u8", cat:"info", needsProxy:true},
  {n:17, name:"CStar",            url:"https://live.eu-north-1a.cf.dmcdn.net/sec2(E_8Z94IfvyxR9gxAtjNJZrSnzRD4IEyfx_kmXb4d1pcn46dn_CWzuV3vssj6RM3BZ15TTWGqsTC-VqDSHRZSCLRdjnEnBXMOeQPSkqwKv-YB2QfTmz2uhPgwZ9s2Xljn)/dm/3/x5gv5v0/d/live-720@60.m3u8#cell=lcf-eu-north-1a", cat:"gen", needsProxy:false},
  {n:18, name:"T18 (CMI TV)",     url:"https://poland.assistancefrancaise.com/hls/transcoder02/21/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:19, name:"NOVO 19 (OFTV)",   url:"https://poland.assistancefrancaise.com/hls/transcoder03/8/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:20, name:"TF1 Séries Films", url:"https://poland.assistancefrancaise.com/hls/transcoder03/26/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:21, name:"L'Équipe",         url:"https://tvradiozap.eu/tools/dm-m3u8.php/1/x2lefik.m3u8", cat:"gen", needsProxy:false},
  {n:22, name:"6ter",             url:"https://poland.assistancefrancaise.com/hls/transcoder02/28/tracks-v1a1/mono.ts.m3u8", cat:"gen", needsProxy:false},
  {n:23, name:"RMC Story",        url:"https://d15aro46bnpfm8.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-fqkqiax1078up/RMC_Story_FR.m3u8", cat:"gen", needsProxy:false},
  {n:24, name:"RMC Découverte",   url:"https://d16zzycxcd0m0r.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-hixvx5kymecr9/RMC_Decouverte_FR.m3u8", cat:"gen", needsProxy:false},
  {n:25, name:"RMC Live",         url:"https://d3dcdjv6dx07iz.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-eaaww2dyp3iih/RMC_Life_FR.m3u8", cat:"gen", needsProxy:false}
];

// ============================================================
// PROXY PHP
// ============================================================
let proxyEnabled = true;
let proxyAll = false;

function getStreamUrl(ch) {
  if (!proxyEnabled) return ch.url;
  if (ch.needsProxy || proxyAll) {
    return PROXY_SCRIPT + '?url=' + encodeURIComponent(ch.url);
  }
  return ch.url;
}

function loadProxyConfig() {
  try {
    const saved = localStorage.getItem('tnt-proxy-php');
    if (saved) {
      const c = JSON.parse(saved);
      proxyEnabled = c.enabled !== false;
      proxyAll = c.all || false;
      document.getElementById('proxyEnabled').checked = proxyEnabled;
      document.getElementById('proxyAll').checked = proxyAll;
    }
  } catch(e) {}
}

function saveProxyConfig() {
  proxyEnabled = document.getElementById('proxyEnabled').checked;
  proxyAll = document.getElementById('proxyAll').checked;
  try { localStorage.setItem('tnt-proxy-php', JSON.stringify({ enabled: proxyEnabled, all: proxyAll })); } catch(e) {}
}

document.getElementById('proxyEnabled').addEventListener('change', () => {
  saveProxyConfig();
  buildMosaic();
  toast(proxyEnabled ? 'Proxy activé ✅' : 'Proxy désactivé — accès direct');
});

document.getElementById('proxyAll').addEventListener('change', () => {
  saveProxyConfig();
  if (proxyEnabled) buildMosaic();
});

document.getElementById('btnTestProxy').addEventListener('click', async () => {
  const status = document.getElementById('proxyStatus');
  status.className = 'proxy-status warn';
  status.textContent = '⏳ Test...';
  try {
    const resp = await fetch(PROXY_SCRIPT + '?test=1', { cache: 'no-store' });
    if (resp.ok) {
      const data = await resp.json();
      if (data.ok && data.curl) {
        status.className = 'proxy-status ok';
        status.textContent = '✅ Proxy OK (PHP ' + data.php + ', cURL ✓)';
      } else {
        status.className = 'proxy-status err';
        status.textContent = '❌ cURL non disponible';
      }
    } else {
      status.className = 'proxy-status err';
      status.textContent = '❌ HTTP ' + resp.status;
    }
  } catch (e) {
    status.className = 'proxy-status err';
    status.textContent = '❌ proxy.php introuvable — vérifiez qu\'il est dans le même dossier';
  }
});

// ============================================================
// VARIABLES GLOBALES
// ============================================================
let selected = new Set(CH.map(c => c.n));
let hlsMap = {};
let currentAudio = null;
const gridSel = document.getElementById('gridSelect');
const mosaic = document.getElementById('mosaic');
const profileSel = document.getElementById('profileSelect');
const profileQuick = document.getElementById('profileQuick');
const profileNameInput = document.getElementById('profileName');

// ============================================================
// PROFILS
// ============================================================
function getProfiles() {
  try { return JSON.parse(localStorage.getItem('tnt-profiles') || '{}'); } catch(e) { return {}; }
}
function saveProfiles(p) { localStorage.setItem('tnt-profiles', JSON.stringify(p)); }
function getLastProfile() { return localStorage.getItem('tnt-last-profile') || ''; }
function setLastProfile(n) { localStorage.setItem('tnt-last-profile', n); }

function refreshProfileDropdowns() {
  const p = getProfiles(), names = Object.keys(p).sort(), last = getLastProfile();
  [profileSel, profileQuick].forEach(sel => {
    sel.innerHTML = '<option value="">— Choisir un profil —</option>';
    names.forEach(n => {
      const o = document.createElement('option');
      o.value = n; o.textContent = n;
      if (n === last) o.selected = true;
      sel.appendChild(o);
    });
  });
}

function applyProfile(name) {
  const p = getProfiles();
  if (!p[name]) return;
  const data = p[name];
  selected.clear();
  (data.selected || []).forEach(n => selected.add(n));
  CH.forEach(c => updateCheckbox(c.n, selected.has(c.n)));
  if (data.grid) gridSel.value = data.grid;
  setLastProfile(name);
  profileSel.value = name;
  profileQuick.value = name;
  profileNameInput.value = name;
  buildMosaic();
  toast('Profil "' + name + '" chargé');
}

function saveProfile() {
  let name = profileNameInput.value.trim();
  if (!name) name = profileSel.value;
  if (!name) { toast('Entrez un nom de profil', 'warn'); return; }
  const p = getProfiles();
  p[name] = {
    selected: Array.from(selected),
    grid: gridSel.value
  };
  saveProfiles(p);
  setLastProfile(name);
  refreshProfileDropdowns();
  profileSel.value = name;
  profileQuick.value = name;
  buildMosaic();
  closeSidebar();
  toast('Profil "' + name + '" sauvegardé ✅');
}

function deleteProfile() {
  let name = profileSel.value || profileNameInput.value.trim();
  if (!name) { toast('Sélectionnez un profil à supprimer', 'warn'); return; }
  const p = getProfiles();
  if (!p[name]) { toast('Profil "' + name + '" introuvable', 'warn'); return; }
  if (!confirm('Supprimer le profil "' + name + '" ?')) return;
  delete p[name];
  saveProfiles(p);
  if (getLastProfile() === name) setLastProfile('');
  refreshProfileDropdowns();
  profileNameInput.value = '';
  toast('Profil "' + name + '" supprimé 🗑️');
}

function toast(msg, type) {
  const t = document.createElement('div');
  t.className = 'toast';
  if (type === 'warn') { t.style.background = '#3a3a1a'; t.style.color = '#ff4'; t.style.borderColor = '#5c5c2a'; }
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

document.getElementById('btnSaveProfile').addEventListener('click', saveProfile);
document.getElementById('btnDelProfile').addEventListener('click', deleteProfile);
document.getElementById('btnLoadProfile').addEventListener('click', () => {
  if (profileSel.value) applyProfile(profileSel.value);
});
profileQuick.addEventListener('change', () => {
  if (profileQuick.value) applyProfile(profileQuick.value);
});

// ============================================================
// SIDEBAR
// ============================================================
const sidebar = document.getElementById('sidebar');
const overlayEl = document.getElementById('sidebar-overlay');
function openSidebar() { sidebar.classList.add('open'); overlayEl.classList.add('open'); }
function closeSidebar() { sidebar.classList.remove('open'); overlayEl.classList.remove('open'); }
document.getElementById('toggleSidebar').addEventListener('click', openSidebar);
document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
overlayEl.addEventListener('click', closeSidebar);

// ============================================================
// LISTE DES CHAÎNES
// ============================================================
const chList = document.getElementById('channelList');
CH.forEach(ch => {
  const d = document.createElement('div');
  d.className = 'ch-item selected'; d.dataset.n = ch.n;
  const proxyTag = ch.needsProxy ? ' <span style="font-size:.6em;color:#ff8;opacity:.6">[P]</span>' : '';
  d.innerHTML = `<input type="checkbox" checked data-n="${ch.n}"><span class="ch-num">${ch.n}</span><span class="ch-name">${ch.name}${proxyTag}</span>`;
  d.querySelector('input').addEventListener('change', e => {
    if (e.target.checked) selected.add(ch.n); else selected.delete(ch.n);
    d.classList.toggle('selected', e.target.checked);
  });
  d.addEventListener('click', e => {
    if (e.target.tagName !== 'INPUT') { const cb = d.querySelector('input'); cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); }
  });
  chList.appendChild(d);
});

function updateCheckbox(n, v) {
  const cb = chList.querySelector(`input[data-n="${n}"]`);
  if (cb) { cb.checked = v; cb.closest('.ch-item').classList.toggle('selected', v); }
}
window.selAll = () => { CH.forEach(c => { selected.add(c.n); updateCheckbox(c.n, true); }); };
window.selNone = () => { selected.clear(); CH.forEach(c => updateCheckbox(c.n, false)); };
window.selInfo = () => { window.selNone(); CH.filter(c => c.cat === 'info').forEach(c => { selected.add(c.n); updateCheckbox(c.n, true); }); };
window.selGen = () => { window.selNone(); CH.filter(c => c.cat === 'gen').forEach(c => { selected.add(c.n); updateCheckbox(c.n, true); }); };

// ============================================================
// MOSAÏQUE
// ============================================================
function destroyAll() {
  Object.values(hlsMap).forEach(h => { try { h.destroy(); } catch(e) {} });
  hlsMap = {}; mosaic.innerHTML = ''; currentAudio = null;
}

function buildMosaic() {
  destroyAll();
  const cols = parseInt(gridSel.value);
  const sel = CH.filter(c => selected.has(c.n));
  const show = sel.slice(0, cols * cols);
  mosaic.style.gridTemplateColumns = `repeat(${cols},1fr)`;
  mosaic.style.gridTemplateRows = `repeat(${cols},1fr)`;

  show.forEach((ch, i) => {
    const tile = document.createElement('div');
    tile.className = 'tile'; tile.dataset.idx = i;
    const isProxied = proxyEnabled && (ch.needsProxy || proxyAll);
    const badgeClass = isProxied ? 'proxied' : 'direct';
    const badgeText = isProxied ? 'PROXY' : '';
    tile.innerHTML = `
      <video muted playsinline></video>
      <div class="tile-status">Chargement...</div>
      <div class="tile-controls">
        <button class="tile-ctrl-btn" data-seek="-300">-5m</button>
        <button class="tile-ctrl-btn" data-seek="-60">-1m</button>
        <button class="tile-ctrl-btn" data-seek="-15">-15s</button>
        <button class="tile-ctrl-btn" data-seek="15">+15s</button>
        <button class="tile-ctrl-btn" data-seek="60">+1m</button>
        <button class="tile-ctrl-btn live-btn is-live" data-seek="live">● LIVE</button>
      </div>
      <div class="tile-label">
        <span class="num">${ch.n}</span>
        <span class="name">${ch.name}</span>
        ${badgeText ? `<span class="proxy-badge ${badgeClass}">${badgeText}</span>` : ''}
      </div>
      <button class="tile-mute">🔇</button>`;
    mosaic.appendChild(tile);

    const vid = tile.querySelector('video');
    const status = tile.querySelector('.tile-status');
    const muteBtn = tile.querySelector('.tile-mute');

    const streamUrl = getStreamUrl(ch);
    loadStream(ch, vid, status, i, streamUrl);

    tile.querySelectorAll('.tile-ctrl-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const action = btn.dataset.seek;
        const liveBtn = tile.querySelector('.live-btn');
        if (action === 'live') { seekToLive(vid); liveBtn.classList.add('is-live'); }
        else { seekRelative(vid, parseInt(action)); liveBtn.classList.remove('is-live'); }
      });
    });
    tile.addEventListener('dblclick', () => openFs(ch));
    muteBtn.addEventListener('click', e => { e.stopPropagation(); toggleAudio(i, vid, tile, muteBtn); });
    tile.addEventListener('click', e => { if (!e.target.classList.contains('tile-mute')) toggleAudio(i, vid, tile, muteBtn); });
  });

  if (show.length < sel.length) {
    const info = document.createElement('div');
    info.style.cssText = 'grid-column:1/-1;text-align:center;padding:8px;color:#6a6a8a;font-size:.78em';
    info.textContent = `${sel.length - show.length} chaîne(s) masquée(s) — augmentez la grille`;
    mosaic.appendChild(info);
  }
}

function toggleAudio(i, vid, tile, btn) {
  if (currentAudio === i) {
    vid.muted = true; tile.classList.remove('playing'); btn.textContent = '🔇'; currentAudio = null;
  } else {
    mosaic.querySelectorAll('video').forEach(v => v.muted = true);
    mosaic.querySelectorAll('.tile').forEach(t => t.classList.remove('playing'));
    mosaic.querySelectorAll('.tile-mute').forEach(b => b.textContent = '🔇');
    vid.muted = false; tile.classList.add('playing'); btn.textContent = '🔊'; currentAudio = i;
  }
}

// ============================================================
// CHARGEMENT HLS — via proxy PHP, le proxy réécrit les m3u8
// ============================================================
function loadStream(ch, vid, status, idx, streamUrl) {
  if (!Hls.isSupported()) {
    if (vid.canPlayType('application/vnd.apple.mpegurl')) {
      vid.src = streamUrl;
      vid.addEventListener('loadedmetadata', () => { vid.play().catch(() => {}); status.style.display = 'none'; });
      vid.addEventListener('error', () => { status.textContent = '❌ Indisponible'; status.style.color = '#f44'; });
    } else { status.textContent = '❌ HLS non supporté'; status.style.color = '#f44'; }
    return;
  }

  function createHls(url, isRetry) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: false,
      maxBufferLength: 10,
      maxMaxBufferLength: 20,
      startLevel: 0,
      capLevelToPlayerSize: true
    });
    hlsMap[idx] = hls;
    hls.loadSource(url);
    hls.attachMedia(vid);
    hls.on(Hls.Events.MANIFEST_PARSED, () => { vid.play().catch(() => {}); status.style.display = 'none'; });
    hls.on(Hls.Events.ERROR, (e, d) => {
      if (d.fatal) {
        if (!isRetry && d.type === Hls.ErrorTypes.NETWORK_ERROR) {
          // Retry une fois après 2.5s
          status.textContent = '⏳ Reconnexion...';
          status.style.color = '#ff8';
          hls.destroy();
          setTimeout(() => createHls(url, true), 2500);
        } else if (!isRetry && proxyEnabled && (ch.needsProxy || proxyAll)) {
          // Fallback : essayer en direct si le proxy échoue
          status.textContent = '⏳ Essai direct...';
          status.style.color = '#ff8';
          hls.destroy();
          setTimeout(() => createHls(ch.url, true), 2000);
        } else {
          status.textContent = '❌ Indisponible';
          status.style.color = '#f44';
        }
      }
    });
    return hls;
  }

  createHls(streamUrl, false);
}

// ============================================================
// CONTRÔLES TEMPS
// ============================================================
function seekRelative(vid, s) {
  if (!vid.duration || !isFinite(vid.duration)) return;
  vid.currentTime = Math.max(0, Math.min(vid.currentTime + s, vid.duration));
}
function seekToLive(vid) {
  if (!vid.duration || !isFinite(vid.duration)) return;
  vid.currentTime = vid.duration - 0.5;
}
function getLiveOffset(vid) {
  if (!vid.duration || !isFinite(vid.duration)) return 0;
  return Math.round(vid.duration - vid.currentTime);
}

// ============================================================
// PLEIN ÉCRAN
// ============================================================
const fsOv = document.getElementById('fs-overlay'), fsVid = document.getElementById('fsVideo'), fsNm = document.getElementById('fsName');
let fsHls = null;
function openFs(ch) {
  const url = getStreamUrl(ch);
  fsNm.textContent = ch.n + '. ' + ch.name;
  fsOv.classList.add('show');
  if (fsHls) { try { fsHls.destroy(); } catch(e) {} }
  if (Hls.isSupported()) {
    fsHls = new Hls({
      startLevel: -1,
      liveDurationInfinity: true,
      liveBackBufferLength: 1800
    });
    fsHls.loadSource(url);
    fsHls.attachMedia(fsVid);
    fsHls.on(Hls.Events.MANIFEST_PARSED, () => { fsVid.play().catch(() => {}); startFsTimer(); });
  } else {
    fsVid.src = url; fsVid.play().catch(() => {}); startFsTimer();
  }
}
window.closeFs = () => {
  fsOv.classList.remove('show');
  if (fsHls) { try { fsHls.destroy(); } catch(e) {} }
  fsVid.pause(); fsVid.src = ''; clearInterval(fsTimer);
};

let fsTimer = null;
window.fSeek = function(s) { seekRelative(fsVid, s); updateFsTime(); };
window.fGoLive = function() { seekToLive(fsVid); updateFsTime(); };
function updateFsTime() {
  const off = getLiveOffset(fsVid);
  const info = document.getElementById('fsTimeInfo'), btn = document.getElementById('fsLiveBtn');
  if (off < 3) { info.textContent = '● LIVE'; info.style.color = '#4f4'; btn.classList.add('live-active'); }
  else { const m = Math.floor(off / 60), s = off % 60; info.textContent = `-${m}m${s < 10 ? '0' : ''}${s}s`; info.style.color = '#ff8'; btn.classList.remove('live-active'); }
}
function startFsTimer() { clearInterval(fsTimer); fsTimer = setInterval(updateFsTime, 1000); }
fsOv.addEventListener('click', e => { if (e.target === fsOv) window.closeFs(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeFs(); });

// ============================================================
// INIT
// ============================================================
loadProxyConfig();
refreshProfileDropdowns();
const lastP = getLastProfile();
if (lastP && getProfiles()[lastP]) {
  applyProfile(lastP);
} else {
  buildMosaic();
}
</script>
</body>
</html>


};
