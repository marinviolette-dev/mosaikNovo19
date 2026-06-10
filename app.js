const channels = {

bfmtv: {
name: "BFMTV",
url: "https://www.bfmtv.com/en-direct/"
},

lci: {
name: "LCI",
url: "https://www.tf1info.fr/direct/"
},

cnews: {
name: "CNEWS",
url: "https://live.eu-north-1a.cf.dmcdn.net/sec2(TQIS_gYpez2e12xW_iZamgZA4GE8rxQGjIBl569w7GJhyTixlIhwGLgpHn3kumf9K-w44Ry1WMJk2I5-s1KTVidhISikWWqye1MHY58_kV3FT5CAu_HstiOhTr_AGdM_)/dm/3/x3b68jn/d/stream-720@60-1780039523.ts"
},

franceinfo: {
name: "France Info",
url: "https://www.franceinfo.fr/en-direct/tv.html"
},

novo19: {
name: "NOVO19",
url: "https://novo19.ouest-france.fr/player/novo19"
},

tf1: {
name: "TF1",
url: "https://www.tf1.fr/tf1/direct"
},

france2: {
name: "France 2",
url: "https://www.france.tv/france-2/direct.html"
}

};

const groups = {

g1: [
channels.bfmtv,
channels.lci,
channels.cnews,
channels.franceinfo
],

g2: [
channels.bfmtv,
channels.lci,
channels.franceinfo,
channels.novo19
],

g3: [
channels.bfmtv,
channels.tf1,
channels.france2,
channels.cnews
]

};

const params = new URLSearchParams(window.location.search);
const groupId = params.get("group");

const selected = groups[groupId];

const grid = document.getElementById("grid");

selected.forEach(channel => {

const tile = document.createElement("div");
tile.className = "tile";

tile.innerHTML = `
<div class="label">${channel.name}</div>
<iframe
src="${channel.url}"
allowfullscreen>
</iframe>
`;

grid.appendChild(tile);

});
