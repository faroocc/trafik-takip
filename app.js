
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
  ]
};

const store = {
  get teams(){ return JSON.parse(localStorage.getItem("tts_teams") || "[]") },
  set teams(v){ localStorage.setItem("tts_teams", JSON.stringify(v)); },
  get records(){ return JSON.parse(localStorage.getItem("tts_records") || "[]") },
  set records(v){ localStorage.setItem("tts_records", JSON.stringify(v)); },
  get wanted(){ return JSON.parse(localStorage.getItem("tts_wanted") || "[]") },
  set wanted(v){ localStorage.setItem("tts_wanted", JSON.stringify(v)); }
};

const now = new Date();
const isoToday = new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Istanbul"}).format(now);
$("#todayLabel").textContent = new Intl.DateTimeFormat("tr-TR",{dateStyle:"full",timeZone:"Europe/Istanbul"}).format(now);
$("#date").value = isoToday;
$("#historyDate").addEventListener("change",renderHistory);
$("#historyTeam").addEventListener("change",renderHistory);
$("#wantedDistrict").addEventListener("change",populateWantedNeighborhoods);

$("#wantedForm").addEventListener("submit",e=>{
  e.preventDefault();
  const item={
    id:crypto.randomUUID(),
    plate:$("#wantedPlate").value.trim().toUpperCase(),
    district:$("#wantedDistrict").value,
    neighborhood:$("#wantedNeighborhood").value,
    time:$("#wantedTime").value,
    address:$("#wantedAddress").value.trim(),
    createdAt:new Date().toISOString()
  };
  store.wanted=[...store.wanted,item];
  $("#wantedPlate").value="";
  $("#wantedAddress").value="";
  renderWanted();
  toast("Aranan araç kaydedildi");
});

$("#exportBtnHistory").addEventListener("click",()=>{
  const teams=store.teams.map(normalizeTeam);
  const rows=[["Tarih","Saat","Ekip","Tür","İlçe","Mahalle","Açıklama"]];
  store.records.forEach(r=>rows.push([r.date,r.time,teams.find(t=>t.id===r.teamId)?.code||"",r.type,r.district,r.neighborhood,r.note]));
  const csv="\uFEFF"+rows.map(row=>row.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(";")).join("\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8"}), a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=`trafik-raporu-${isoToday}.csv`; a.click(); URL.revokeObjectURL(a.href);
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").classList.remove("hidden")});
$("#installBtn").addEventListener("click",async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}});
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
populateNeighborhoods();
populateWantedNeighborhoods();
refresh();

document.addEventListener("click",e=>{
  if(!e.target.closest(".address-search-wrap")){
    $("#addressSearchResults")?.classList.add("hidden");
  }
});
