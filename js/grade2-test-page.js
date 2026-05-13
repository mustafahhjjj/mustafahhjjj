(function(){
  'use strict';
  var base='/siniflar/2-sinif';
  var subjects={turkce:'Türkçe',matematik:'Matematik','hayat-bilgisi':'Hayat Bilgisi',ingilizce:'İngilizce','gorsel-sanatlar':'Görsel Sanatlar',muzik:'Müzik','beden-egitimi-ve-oyun':'Beden Eğitimi ve Oyun'};
  var titles={'dogal-sayilar':'Doğal Sayılar','okudugunu-anlama':'Okuduğunu Anlama','okul-kurallari':'Okul Kuralları',numbers:'Numbers','toplama-islemi':'Toplama İşlemi','basamak-degeri':'Basamak Değeri','cikarma-islemi':'Çıkarma İşlemi','geometrik-sekiller':'Geometrik Şekiller','zaman-olcme':'Zaman Ölçme'};
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function titleFrom(slug){return titles[slug]||slug.split('-').map(function(w){return w.charAt(0).toUpperCase()+w.slice(1);}).join(' ');}
  function params(){var qs=new URLSearchParams(location.search);var path=location.pathname.split('/').filter(Boolean);var subject=document.body.dataset.subject||qs.get('ders')||path[2]||'matematik';var raw=document.body.dataset.topic||qs.get('konu')||path[3]||'dogal-sayilar';raw=raw.replace(/\.html$/,'').replace(/-test$/,'');return {subject:subject,topic:raw};}
  function nav(){return '<header class="g1-header"><nav class="g1-nav g1-container"><a class="g1-logo" href="/index.html"><span class="g1-logo-mark">e</span><span>e-kurs.com</span></a><div class="g1-links"><a href="/index.html">Ana Sayfa</a><a href="/siniflar/index.html">Sınıflar</a><a href="/dersler/index.html">Dersler</a><a href="/testler/index.html">Testler</a><a class="g1-btn soft" href="/giris.html">Giriş Yap</a></div></nav></header>';}
  function footer(){return '<footer class="g1-footer"><div class="g1-container"><strong>e-kurs.com</strong><p>2. sınıf test ekranı: seç, cevabı kontrol et, sonraki soruya geç.</p></div></footer>';}
  function questions(subject,topic){
    if(subject==='matematik'&&topic==='dogal-sayilar')return [
      ['47 sayısında 4 rakamı hangi basamaktadır?',['Birler','Onlar','Yüzler'],1,'47 sayısında 4, onlar basamağındadır. 7 ise birler basamağındadır.'],
      ['Aşağıdaki sayılardan hangisi en büyüktür?',['36','63','46'],1,'Onlar basamağı en büyük olan sayı 63’tür.'],
      ['25 sayısından sonra hangi sayı gelir?',['24','26','35'],1,'Sayarken 25’ten sonra 26 gelir.'],
      ['10 + 5 kaç eder?',['12','15','20'],1,'10’un üzerine 5 eklersek 15 olur.'],
      ['60 sayısında kaç onluk vardır?',['6','0','60'],0,'60 sayısı 6 onluktan oluşur.'],
      ['38 sayısında kaç birlik vardır?',['3','8','38'],1,'38 sayısında 8 birlik vardır.'],
      ['40, 45, 50, __ sırada hangi sayı gelir?',['55','60','65'],0,'Beşer ritmik saymada 50’den sonra 55 gelir.'],
      ['72 sayısı nasıl okunur?',['Yetmiş iki','Yedi iki','Yirmi yedi'],0,'72 sayısı yetmiş iki diye okunur.'],
      ['En küçük sayı hangisidir?',['29','19','91'],1,'19 diğerlerinden küçüktür.'],
      ['5 onluk ve 4 birlik hangi sayıdır?',['45','54','9'],1,'5 onluk 50, 4 birlik 4 eder; sayı 54’tür.']
    ];
    if(subject==='turkce'&&topic==='okudugunu-anlama')return [
      ['Ali sabah erkenden uyandı. Çantasını hazırladı ve okuluna gitti. Ali nereye gitti?',['Parka','Okula','Pazara'],1,'Metinde Ali’nin okuluna gittiği söyleniyor.'],
      ['Öğretmeni Ali’ye ne verdi?',['Kitap','Top','Kalem'],0,'Metinde öğretmenin Ali’ye yeni bir kitap verdiği yazıyor.'],
      ['Ali kitabı nasıl buldu?',['Sevdi','Kaybetti','Yırttı'],0,'Metinde Ali kitabı çok sevdi deniyor.'],
      ['Ali ne zaman uyandı?',['Sabah','Akşam','Gece'],0,'Metinde Ali sabah erkenden uyandı.'],
      ['Ali okuldan önce ne hazırladı?',['Çantasını','Topunu','Oyuncağını'],0,'Ali çantasını hazırladı.'],
      ['Metinde kimden söz ediliyor?',['Ali','Ayşe','Mehmet'],0,'Metnin kahramanı Ali’dir.'],
      ['Ali nereye gitmek için hazırlandı?',['Okul','Park','Market'],0,'Ali okuluna gitti.'],
      ['Metnin konusu nedir?',['Ali’nin okul günü','Bir top oyunu','Pazar alışverişi'],0,'Metin Ali’nin okul günüyle ilgilidir.'],
      ['Kitabı kim verdi?',['Öğretmeni','Arkadaşı','Babası'],0,'Kitabı öğretmeni verdi.'],
      ['Ali çantasını ne yaptı?',['Hazırladı','Sakladı','Unuttu'],0,'Metinde çantasını hazırladığı yazıyor.']
    ];
    if(subject==='hayat-bilgisi'&&topic==='okul-kurallari')return [
      ['Sınıfta konuşmak istediğimizde ne yapmalıyız?',['Bağırmalıyız','Parmak kaldırmalıyız','Arkadaşımızın sözünü kesmeliyiz'],1,'Sınıfta konuşmak için parmak kaldırmak doğru davranıştır.'],
      ['Koridorda nasıl yürümeliyiz?',['Koşarak','Sakin ve dikkatli','İterek'],1,'Koridorda güvenli yürümek gerekir.'],
      ['Derste arkadaşımız konuşurken ne yapmalıyız?',['Dinlemeliyiz','Bağırmalıyız','Sözünü kesmeliyiz'],0,'Söz hakkına saygı göstermek gerekir.'],
      ['Okul eşyalarını nasıl kullanmalıyız?',['Özenli','Dikkatsiz','Kırarak'],0,'Okul eşyalarını özenle kullanmalıyız.'],
      ['Çöpümüzü nereye atmalıyız?',['Çöp kutusuna','Yere','Sıraya'],0,'Çöpler çöp kutusuna atılır.'],
      ['Zil çalınca ne yapmalıyız?',['Sıraya geçmeliyiz','Koşup bağırmalıyız','Sınıftan kaçmalıyız'],0,'Zil sonrası düzenli davranmak gerekir.'],
      ['Sınıf kuralları neden vardır?',['Güvenli ve düzenli olmak için','Oyun bozmak için','Kavga etmek için'],0,'Kurallar güvenli ve düzenli ortam sağlar.'],
      ['Arkadaşımız yardıma ihtiyaç duyarsa ne yaparız?',['Yardım ederiz','Güleriz','Görmezden geliriz'],0,'Yardımlaşmak doğru davranıştır.'],
      ['Öğretmenimizi nasıl dinlemeliyiz?',['Dikkatle','Konuşarak','Oynayarak'],0,'Dikkatle dinlemek öğrenmeyi kolaylaştırır.'],
      ['Okula gelirken hangi davranış doğrudur?',['Zamanında gelmek','Geç kalmak','Hazırlıksız gelmek'],0,'Okula zamanında gelmek doğru davranıştır.']
    ];
    if(subject==='ingilizce'&&topic==='numbers')return [
      ['“Three” hangi sayıdır?',['2','3','4'],1,'Three İngilizcede 3 demektir.'],
      ['“Five” hangi sayıdır?',['5','6','7'],0,'Five, 5 demektir.'],
      ['“One” hangi sayıdır?',['1','10','11'],0,'One, 1 demektir.'],
      ['“Ten” hangi sayıdır?',['8','9','10'],2,'Ten, 10 demektir.'],
      ['“Seven” hangi sayıdır?',['6','7','8'],1,'Seven, 7 demektir.'],
      ['4 İngilizcede nasıl söylenir?',['Four','Five','Three'],0,'4, four demektir.'],
      ['2 İngilizcede nasıl söylenir?',['Two','Ten','One'],0,'2, two demektir.'],
      ['“Eight” hangi sayıdır?',['8','18','80'],0,'Eight, 8 demektir.'],
      ['6 İngilizcede nasıl söylenir?',['Six','Seven','Five'],0,'6, six demektir.'],
      ['“Twenty” hangi sayıdır?',['12','20','2'],1,'Twenty, 20 demektir.']
    ];
    var title=titleFrom(topic);return [
      ['Bu test hangi konuya aittir?',[title,'Boş sayfa','Yanlış ders'],0,'Bu test '+title+' konusuna bağlıdır.'],['Cevabı kontrol etmek için hangi butona basılır?',['Cevabı Kontrol Et','Sayfadan Çık','Boş bırak'],0,'Cevabı Kontrol Et butonu seçimini kontrol eder.'],['Doğru cevap hangi renkle gösterilir?',['Yeşil','Siyah','Gri'],0,'Doğru cevap yeşil renkle görünür.'],['Yanlış cevapta ne açılır?',['Açıklama','Boş ekran','Reklam'],0,'Yanlışta açıklama paneli açılır.'],['Sonraki soruya nasıl geçilir?',['Sonraki Soru','Kapat','Geri dön'],0,'Sonraki Soru butonu seni bir sonraki soruya taşır.'],['2. sınıf butonları nasıl olmalı?',['Büyük','Çok küçük','Gizli'],0,'Büyük butonlar çocukların kolay tıklamasını sağlar.'],['Test sonunda hangi bilgi görünür?',['Doğru ve yanlış sayısı','Boş sayfa','Sadece logo'],0,'Sonuç ekranında doğru, yanlış, başarı ve öğrenme puanı görünür.'],['Konuya dönmek için hangi bağlantı kullanılır?',['Konuya Dön','Boş link','Yanlış link'],0,'Konuya Dön bağlantısı gerçek konu sayfasına gider.'],['Derse dönmek için hangi bağlantı kullanılır?',['Derse Dön','Yenile','Kapat'],0,'Derse Dön bağlantısı gerçek ders sayfasına gider.'],['Çalışırken önce ne yapmalısın?',['Soruyu oku','Rastgele seç','Hemen çık'],0,'Önce soruyu dikkatlice okumak gerekir.']
    ];
  }
  function render(){var p=params();var subjectName=subjects[p.subject]||'Matematik';var topicTitle=titleFrom(p.topic);var q=questions(p.subject,p.topic);var app=document.getElementById('app');if(!app)return;app.innerHTML=nav()+'<main><section class="g1-hero"><div class="g1-container"><p class="g1-breadcrumb"><a href="/index.html">Ana Sayfa</a> / <a href="/siniflar/2-sinif/index.html">2. Sınıf</a> / <a href="'+base+'/'+p.subject+'.html">'+esc(subjectName)+'</a> / '+esc(topicTitle)+' Testi</p><div class="g1-hero-card"><span class="g1-kicker">10 Soruluk Test</span><h1>2. Sınıf '+esc(subjectName)+' - '+esc(topicTitle)+' Testi</h1><p class="g1-lead">Önce seçeneğe dokun, sonra <strong>Cevabı Kontrol Et</strong> butonuna bas. Her sorudan sonra açıklama görünür.</p></div></div></section><section class="g1-section"><div class="g1-container" id="questions"></div></section></main>'+footer();var area=document.getElementById('questions');var correct=0,checked=0;area.innerHTML=q.map(function(item,i){return '<article class="g1-question" data-q="'+i+'" data-correct="'+item[2]+'"><h3>Soru '+(i+1)+': '+esc(item[0])+'</h3><div class="g1-options">'+item[1].map(function(opt,j){return '<button class="g1-option" type="button" data-answer="'+j+'">'+String.fromCharCode(65+j)+') '+esc(opt)+'</button>';}).join('')+'</div><p class="g1-empty" hidden>Önce bir seçenek seç.</p><div class="g1-explanation">'+esc(item[3])+'</div><div class="g1-actions"><button class="g1-btn green check-answer" type="button">Cevabı Kontrol Et</button><button class="g1-btn soft next-question" type="button">Sonraki Soru</button></div></article>';}).join('')+'<div id="testResult" class="g1-result"></div><div class="g1-actions"><button id="retryWrong" class="g1-btn yellow" type="button">Yanlışları Tekrar Çöz</button><a class="g1-btn white" href="'+base+'/'+p.subject+'/'+p.topic+'.html">Konuya Dön</a><a class="g1-btn soft" href="'+base+'/'+p.subject+'.html">Derse Dön</a><a class="g1-btn soft" href="/siniflar/2-sinif/index.html">Sınıfa Dön</a></div>';
    area.addEventListener('click',function(e){var opt=e.target.closest('.g1-option');if(opt){var card=opt.closest('.g1-question');if(card.dataset.done==='1')return;card.querySelectorAll('.g1-option').forEach(function(b){b.classList.remove('selected');});opt.classList.add('selected');card.dataset.selected=opt.dataset.answer;return;}var check=e.target.closest('.check-answer');if(check){var card=check.closest('.g1-question');if(card.dataset.done==='1')return;var warn=card.querySelector('.g1-empty');if(card.dataset.selected===undefined){warn.hidden=false;return;}warn.hidden=true;var chosen=parseInt(card.dataset.selected,10);var right=parseInt(card.dataset.correct,10);var buttons=card.querySelectorAll('.g1-option');buttons.forEach(function(b){b.disabled=true;});if(chosen===right){correct++;buttons[chosen].classList.add('correct');}else{buttons[chosen].classList.add('wrong');buttons[right].classList.add('correct');}checked++;card.dataset.done='1';card.querySelector('.g1-explanation').classList.add('show');if(checked===q.length)showResult();return;}var next=e.target.closest('.next-question');if(next){var current=next.closest('.g1-question');var target=current.nextElementSibling;if(target&&target.classList.contains('g1-question'))target.scrollIntoView({behavior:'smooth',block:'start'});else document.getElementById('testResult').scrollIntoView({behavior:'smooth',block:'start'});}});
    document.getElementById('retryWrong').addEventListener('click',function(){location.href=base+'/'+p.subject+'/'+p.topic+'-test.html';});
    function showResult(){var wrong=q.length-correct;var percent=Math.round(correct/q.length*100);var point=Math.max(0,Math.min(100,correct*10-wrong*4+(correct>=8?6:0)));var box=document.getElementById('testResult');box.classList.add('show');box.innerHTML='<h2>Test Sonucu</h2><p>Doğru: <strong>'+correct+'</strong> · Yanlış: <strong>'+wrong+'</strong> · Başarı: <strong>%'+percent+'</strong></p><p>Öğrenme Puanı: <strong>'+point+' / 100</strong></p>';}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
