
const $ = (s) => document.querySelector(s);

const NEIGHBORHOODS = {
  "Osmangazi": [
    "Adalet","Ahmetbey","Ahmetpaşa","Akpınar","Aksungur","Aktarhüssam","Alaaddin",
    "Alacahırka","Alacamescit","Alaşarköy","Alemdar","Alipaşa","Altınova","Altıparmak",
    "Armutköy","Atıcılar","Avdancık","Bağlarbaşı","Bağlı","Bahar","Başaran","Büyükdeliller",
    "Çağlayan","Çaybaşı","Çekirge","Çeltikköy","Çiftehavuzlar","Çirişhane","Çırpan",
    "Çukurcaköy","Dağakça","Demirkapı","Demirtaş Barbaros","Demirtaş Cumhuriyet",
    "Demirtaş Dumlupınar","Demirtaş Sakarya","Demirtaşpaşa","Dereçavuşköy","Dikkaldırım",
    "Doburca","Doğanbey","Doğancı","Doğanevler","Ebu İshak","Elmaçukur","Elmasbahçeler",
    "Emek Adnan Menderes","Emek Fatih Sultan Mehmet","Emek Zekai Gümüşdiş","Fatih",
    "Gaziakdemir","Geçit","Gökçeören","Gülbahçe","Gündoğdu","Güneştepe","Hamitler",
    "Hamzabey","Hocaalizade","Hocahasan","Hüdavendigar","Hürriyet","İbrahimpaşa",
    "İnkaya","İntizam","İsmetiye","İstiklal","İvazpaşa","Kavaklı","Kayhan","Kemerçeşme",
    "Kirazlı","Kiremitçi","Kırcaali","Kocanaip","Koğukçınar","Kükürtlü","Küplüpınar",
    "Küçükbalıklı","Maksem","Mehmet Akif","Mollafenari","Mollagürani","Muradiye",
    "Murat Hüdavendigar","Nalıncılar","Namik Kemal","Orhanbey","Osmangazi","Ovaakça Çeşmebaşı",
    "Ovaakça Eğitim","Ovaakça Merkez","Ovaakça Santral","Panayır","Pınarbaşı","Reyhan",
    "Sakarya","Santral Garaj","Seçköy","Selamet","Selçukgazi","Soğanlı","Soğukkuyu",
    "Sırameşeler","Tahtakale","Tayakadın","Tuzpazarı","Ulu","Veysel Karani","Yahşibey",
    "Yenibağlar","Yeniceabat","Yenikaraman","Yunuseli","Zafer"
  ],
  "Nilüfer": [
    "19 Mayıs","23 Nisan","29 Ekim","30 Ağustos Zafer","Ahmet Yesevi","Akçalar",
    "Alaaddinbey","Altınşehir","Atlas","Ayvaköy","Badırga","Balat","Balkan","Barış",
    "Başköy","Beşevler","Büyükbalıklı","Çalı","Çamlıca","Çatalağıl","Çaylı","Dağyenice",
    "Demirci","Dumlupınar","Ertuğrul","Esentepe","Fadıllı","Fethiye","Gökçe","Gölyazı",
    "Görükle","Gümüştepe","Hasanağa","Işıktepe","İhsaniye","İnegazi","İrfaniye",
    "Kadriye","Karacaoba","Karaman","Kayapa","Kızılcıklı","Konak","Konaklı","Koru",
    "Kültür","Kurtuluş","Makşempınar","Minareliçavuş","Odunluk","Özlüce","Tahtalı",
    "Unçukuru","Üçevler","Ürünlü","Yaylacık","Yolçatı","Yüzüncüyıl"
  ],
  "Yıldırım": [
    "75. Yıl","152 Evler","Akçağlayan","Anadolu","Arabayatağı","Bağlaraltı","Balaban",
    "Baruthane","Beyazıt","Cumalıkızık","Çelebi Mehmet","Çınarönü","Davutdede",
    "Davutkadı","Değirmenlikızık","Değirmenönü","Demetevler","Duaçınarı","Eğitim",
    "Emirsultan","Erikli","Ertuğrulgazi","Esenevler","Fidyekızık","Güllük","Hacıseyfettin",
    "Hacivat","Hamamlıkızık","Hocataşkın","İsabey","Kaplıkaya","Karaağaç","Karamazak",
    "Karapınar","Kazım Karabekir","Kurtoğlu","Maltepe","Mehmet Akif Ersoy","Mevlana",
    "Meydancık","Millet","Mimar Sinan","Mollaarap","Musababa","Namazgah","Ortabağlar",
    "Piremir","Sakarya","Samanlı","Selçukbey","Selimzade","Sinandede","Sıracevizler",
    "Siteler","Şirinevler","Şükraniye","Teferrüç","Ulus","Umurbey","Vakıf","Vatan",
    "Yavuzselim","Yediselviler","Yeni Mahalle","Yeşil","Yeşilyayla","Yiğitler",
    "Yıldırım","Yunus Emre","Zeyniler","Zümrütevler"
  ],
  "Diğer": ["Diğer / Elle Açıklamaya Yaz"]
};

const store = {
  get teams(){ return JSON.parse(localStorage.getItem("tts_teams") || "null") || [
    {id:crypto.randomUUID(), code:"5442", district:"Nilüfer", neighborhoods:[]},
    {id:crypto.randomUUID(), code:"5461", district:"Osmangazi", neighborhoods:[]},
    {id:crypto.randomUUID(), code:"5481", district:"Yıldırım", neighborhoods:[]}
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
function esc(v=""){ return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }
function normalizeTeam(t){
  return {
    ...t,
    district: t.district || t.area || "Osmangazi",
    neighborhoods: Array.isArray(t.neighborhoods) ? t.neighborhoods : []
  };
}
function selectedTeam(){ return store.teams.map(normalizeTeam).find(t=>t.id===$("#teamSelect").value); }

function populateRecordNeighborhoods(){
  const district=$("#district").value;
  const team=selectedTeam();
  const all=NEIGHBORHOODS[district] || [];
  const assigned = team && team.district===district && team.neighborhoods.length ? team.neighborhoods : [];
  const ordered = [...assigned, ...all.filter(n=>!assigned.includes(n))];
  $("#neighborhood").innerHTML =
    `<option value="">Mahalle seçiniz</option>`+
    ordered.map(n=>`<option value="${esc(n)}">${assigned.includes(n)?"★ ":""}${esc(n)}</option>`).join("");
}

function refreshTeams(){
  const teams=store.teams.map(normalizeTeam);
  $("#teamSelect").innerHTML=teams.map(t=>`<option value="${t.id}">${esc(t.code)} — ${esc(t.district)}</option>`).join("");
  $("#filterTeam").innerHTML=`<option value="">Tüm ekipler</option>`+teams.map(t=>`<option value="${t.id}">${esc(t.code)}</option>`).join("");
  $("#teamList").innerHTML=teams.map(t=>{
    const shown=t.neighborhoods.slice(0,5);
    const more=t.neighborhoods.length-shown.length;
    return `<article class="list-item">
      <div class="row">
        <div>
          <strong>${esc(t.code)}</strong>
          <div class="item-meta">${esc(t.district)} • ${t.neighborhoods.length} mahalle</div>
          <div class="team-neighborhoods">
            ${shown.map(n=>`<span class="mini-chip">${esc(n)}</span>`).join("")}
            ${more>0?`<span class="mini-chip more-chip">+${more}</span>`:""}
          </div>
        </div>
        <button class="delete" data-del-team="${t.id}">Sil</button>
      </div>
    </article>`;
  }).join("") || `<p class="muted">Henüz ekip eklenmedi.</p>`;
  const team=selectedTeam();
  if(team && ["Osmangazi","Nilüfer","Yıldırım"].includes(team.district)) $("#district").value=team.district;
  populateRecordNeighborhoods();
}

function renderNeighborhoodPicker(){
  const district=$("#teamDistrict").value;
  const search=$("#teamNeighborhoodSearch").value.trim().toLocaleLowerCase("tr-TR");
  const currentChecked = new Set(
    [...document.querySelectorAll('#teamNeighborhoodPicker input:checked')].map(x=>x.value)
  );
  const items=(NEIGHBORHOODS[district]||[]).filter(n=>n.toLocaleLowerCase("tr-TR").includes(search));
  $("#teamNeighborhoodPicker").innerHTML=items.map(n=>`
    <label class="neighborhood-option">
      <input type="checkbox" value="${esc(n)}" ${currentChecked.has(n)?"checked":""}>
      <span>${esc(n)}</span>
    </label>`).join("");
  updateNeighborhoodCount();
}
function updateNeighborhoodCount(){
  const count=document.querySelectorAll('#teamNeighborhoodPicker input:checked').length;
  $("#selectedNeighborhoodCount").textContent=`${count} mahalle seçildi`;
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
  const teams=store.teams.map(normalizeTeam);
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

$("#teamSelect").addEventListener("change",()=>{
  const team=selectedTeam();
  if(team && ["Osmangazi","Nilüfer","Yıldırım"].includes(team.district)) $("#district").value=team.district;
  populateRecordNeighborhoods();
});
$("#district").addEventListener("change",populateRecordNeighborhoods);

$("#recordForm").addEventListener("submit",e=>{
  e.preventDefault();
  const record={
    id:crypto.randomUUID(), teamId:$("#teamSelect").value, type:$("#type").value,
    date:$("#date").value,time:$("#time").value,district:$("#district").value,
    neighborhood:$("#neighborhood").value,note:$("#note").value.trim(),
    createdAt:new Date().toISOString()
  };
  store.records=[...store.records,record];
  $("#note").value="";
  refresh(); toast("Kayıt eklendi");
});

$("#addTeamBtn").addEventListener("click",()=>{
  $("#teamCode").value="";
  $("#teamDistrict").value="Osmangazi";
  $("#teamNeighborhoodSearch").value="";
  renderNeighborhoodPicker();
  $("#teamDialog").showModal();
});
$("#teamDistrict").addEventListener("change",()=>{ $("#teamNeighborhoodSearch").value=""; renderNeighborhoodPicker(); });
$("#teamNeighborhoodSearch").addEventListener("input",renderNeighborhoodPicker);
$("#teamNeighborhoodPicker").addEventListener("change",updateNeighborhoodCount);
$("#selectAllNeighborhoods").addEventListener("click",()=>{
  document.querySelectorAll('#teamNeighborhoodPicker input').forEach(x=>x.checked=true); updateNeighborhoodCount();
});
$("#clearNeighborhoods").addEventListener("click",()=>{
  document.querySelectorAll('#teamNeighborhoodPicker input').forEach(x=>x.checked=false); updateNeighborhoodCount();
});

$("#teamForm").addEventListener("submit",e=>{
  e.preventDefault();
  const code=$("#teamCode").value.trim();
  const district=$("#teamDistrict").value;
  const neighborhoods=[...document.querySelectorAll('#teamNeighborhoodPicker input:checked')].map(x=>x.value);
  if(!code) return;
  store.teams=[...store.teams,{id:crypto.randomUUID(),code,district,neighborhoods}];
  $("#teamDialog").close(); refresh(); toast(`${code} ekibi eklendi`);
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
  const teams=store.teams.map(normalizeTeam);
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
