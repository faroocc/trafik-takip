
const $ = (s) => document.querySelector(s);
const store = {
  get teams(){ return JSON.parse(localStorage.getItem("tts_teams") || "null") || [
    {id:crypto.randomUUID(), code:"5442", area:"Nilüfer"},
    {id:crypto.randomUUID(), code:"5461", area:"Osmangazi"},
    {id:crypto.randomUUID(), code:"5481", area:"Yıldırım"}
  ]},
  set teams(v){ localStorage.setItem("tts_teams", JSON.stringify(v)); },
  get records(){ return JSON.parse(localStorage.getItem("tts_records") || "[]") },
  set records(v){ localStorage.setItem("tts_records", JSON.stringify(v)); }
};
if(!localStorage.getItem("tts_teams")) store.teams = store.teams;

const today = new Date();
const isoToday = new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Istanbul"}).format(today);
$("#todayLabel").textContent = new Intl.DateTimeFormat("tr-TR",{dateStyle:"full",timeZone:"Europe/Istanbul"}).format(today);
$("#date").value = isoToday;
$("#filterDate").value = isoToday;
$("#time").value = new Intl.DateTimeFormat("tr-TR",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:"Europe/Istanbul"}).format(today);

function toast(msg){
  const el=$("#toast"); el.textContent=msg; el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),1800);
}
function esc(v=""){ return v.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }

function refreshTeams(){
  const teams=store.teams;
  $("#teamSelect").innerHTML=teams.map(t=>`<option value="${t.id}">${esc(t.code)} — ${esc(t.area||"Bölge yok")}</option>`).join("");
  $("#filterTeam").innerHTML=`<option value="">Tüm ekipler</option>`+teams.map(t=>`<option value="${t.id}">${esc(t.code)}</option>`).join("");
  $("#teamList").innerHTML=teams.map(t=>`
    <article class="list-item">
      <div class="row">
        <div><strong>${esc(t.code)}</strong><div class="item-meta">${esc(t.area||"Bölge belirtilmedi")}</div></div>
        <button class="delete" data-del-team="${t.id}">Sil</button>
      </div>
    </article>`).join("") || `<p class="muted">Henüz ekip eklenmedi.</p>`;
}
function typeCount(records,type){return records.filter(r=>r.type===type).length}
function refresh(){
  refreshTeams();
  const todays=store.records.filter(r=>r.date===isoToday);
  $("#statTotal").textContent=todays.length;
  $("#statMaterial").textContent=typeCount(todays,"Maddi Hasarlı Kaza");
  $("#statInjury").textContent=typeCount(todays,"Yaralamalı Kaza");
  $("#statWanted").textContent=typeCount(todays,"Yakalamalı Araç");
  renderReports();
}
function renderReports(){
  const date=$("#filterDate").value;
  const team=$("#filterTeam").value;
  let rows=store.records.filter(r=>(!date||r.date===date)&&(!team||r.teamId===team));
  rows.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
  const summary=[
    ["Toplam",rows.length],["Konu",typeCount(rows,"Konu")],
    ["Maddi",typeCount(rows,"Maddi Hasarlı Kaza")],["Yaralamalı",typeCount(rows,"Yaralamalı Kaza")],
    ["Yakalamalı",typeCount(rows,"Yakalamalı Araç")]
  ];
  $("#reportSummary").innerHTML=summary.map(([n,v])=>`<div class="summary-box"><strong>${v}</strong><span>${n}</span></div>`).join("");
  const teams=store.teams;
  $("#recordList").innerHTML=rows.map(r=>{
    const t=teams.find(x=>x.id===r.teamId);
    return `<article class="list-item">
      <div class="row"><strong>${esc(r.type)}</strong><span class="badge">${esc(t?.code||"Silinmiş ekip")}</span></div>
      <div class="item-meta">${r.date} • ${r.time} • ${esc(r.district)}${r.neighborhood?` / ${esc(r.neighborhood)}`:""}<br>${esc(r.note||"Açıklama yok")}</div>
      <div class="row" style="margin-top:8px"><span></span><button class="delete" data-del-record="${r.id}">Kaydı sil</button></div>
    </article>`;
  }).join("") || `<p class="muted">Seçilen filtrede kayıt bulunamadı.</p>`;
}

document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tab,.panel").forEach(el=>el.classList.remove("active"));
  btn.classList.add("active"); $("#"+btn.dataset.tab).classList.add("active");
  if(btn.dataset.tab==="reports") renderReports();
}));

$("#recordForm").addEventListener("submit",e=>{
  e.preventDefault();
  const record={
    id:crypto.randomUUID(), teamId:$("#teamSelect").value, type:$("#type").value,
    date:$("#date").value,time:$("#time").value,district:$("#district").value,
    neighborhood:$("#neighborhood").value.trim(),note:$("#note").value.trim(),
    createdAt:new Date().toISOString()
  };
  store.records=[...store.records,record];
  $("#neighborhood").value=""; $("#note").value="";
  refresh(); toast("Kayıt eklendi");
});

$("#addTeamBtn").addEventListener("click",()=>$("#teamDialog").showModal());
$("#teamForm").addEventListener("submit",e=>{
  e.preventDefault();
  const code=$("#teamCode").value.trim(), area=$("#teamArea").value.trim();
  if(!code) return;
  store.teams=[...store.teams,{id:crypto.randomUUID(),code,area}];
  $("#teamCode").value=""; $("#teamArea").value="";
  $("#teamDialog").close(); refresh(); toast("Ekip eklendi");
});
document.addEventListener("click",e=>{
  const teamId=e.target.dataset.delTeam;
  const recordId=e.target.dataset.delRecord;
  if(teamId){
    if(store.records.some(r=>r.teamId===teamId)){toast("Bu ekibin kayıtları olduğu için silinmedi");return}
    store.teams=store.teams.filter(t=>t.id!==teamId);refresh();
  }
  if(recordId){store.records=store.records.filter(r=>r.id!==recordId);refresh();toast("Kayıt silindi")}
});
$("#filterDate").addEventListener("change",renderReports);
$("#filterTeam").addEventListener("change",renderReports);

$("#exportBtn").addEventListener("click",()=>{
  const teams=store.teams;
  const rows=[["Tarih","Saat","Ekip","Tür","İlçe","Mahalle","Açıklama"]];
  store.records.forEach(r=>rows.push([r.date,r.time,teams.find(t=>t.id===r.teamId)?.code||"",r.type,r.district,r.neighborhood,r.note]));
  const csv="\uFEFF"+rows.map(row=>row.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(";")).join("\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8"}); const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);a.download=`trafik-raporu-${isoToday}.csv`;a.click();URL.revokeObjectURL(a.href);
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").classList.remove("hidden")});
$("#installBtn").addEventListener("click",async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}});
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
refresh();
