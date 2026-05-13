(function(){
  'use strict';
  var base='/siniflar/2-sinif';
  var subjects={turkce:'Türkçe',matematik:'Matematik','hayat-bilgisi':'Hayat Bilgisi',ingilizce:'İngilizce','gorsel-sanatlar':'Görsel Sanatlar',muzik:'Müzik','beden-egitimi-ve-oyun':'Beden Eğitimi ve Oyun'};
  var titles={'dogal-sayilar':'Doğal Sayılar','okudugunu-anlama':'Okuduğunu Anlama','okul-kurallari':'Okul Kuralları',numbers:'Numbers','toplama-islemi':'Toplama İşlemi','basamak-degeri':'Basamak Değeri','cikarma-islemi':'Çıkarma İşlemi','geometrik-sekiller':'Geometrik Şekiller','zaman-olcme':'Zaman Ölçme'};
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function titleFrom(slug){return titles[slug]||slug.split('-').map(function(w){return w.charAt(0).toUpperCase()+w.slice(1);}).join(' ');}
  function params(){var qs=new URLSearchParams(location.search);var path=location.pathname.split('/').filter(Boolean);var subject=document.body.dataset.subject||qs.get('ders')||path[2]||'matematik';var raw=document.body.dataset.topic||qs.get('konu')||path[3]||'dogal-sayilar';raw=raw.replace(/\.html$/,'').replace(/-test$/,'');return {subject:subject,topic:raw};}
  function nav(){return '<header class="g1-header"><nav class="g1-nav g1-container"><a class="g1-logo" href="/index.html"><span class="g1-logo-mark">e</span><span>e-kurs.com</span></a><div class="g1-links"><a href="/index.html">Ana Sayfa</a><a href="/siniflar/index.html">Sınıflar</a><a href="/dersler/index.html">Dersler</a><a href="/testler/index.html">Testler</a><a class="g1-btn soft" href="/giris.html">Giriş Yap</a></div></nav></header>';}
  function footer(){return '<footer class="g1-footer"><div class="g1-container"><strong>e-kurs.com</strong><p>2. sınıf test ekranı: seç, cevabı kontrol et, bilemediğin soruda videolu anlatımı aç.</p></div></footer>';}
  function videoUrl(subjectName,topicTitle,question){return 'https://www.youtube-nocookie.com/embed?listType=search&list='+encodeURIComponent('2. sınıf '+subjectName+' '+topicTitle+' '+question+' konu anlatımı');}
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
      ['Ali kitabı nasıl buldu?',['Sevdi','Kaybetti','Yırttı'],0,'Metinde Ali kitabı çok sevdi deniyor.']
    ];
    if(subject==='hayat-bilgisi'&&topic==='okul-kurallari')return [
      ['Sınıfta konuşmak istediğimizde ne yapmalıyız?',['Bağırmalıyız','Parmak kaldırmalıyız','Arkadaşımızın sözünü kesmeliyiz'],1,'Sınıfta konuşmak için parmak kaldırmak doğru davranıştır.'],
      ['Koridorda nasıl yürümeliyiz?',['Koşarak','Sakin ve dikkatli','İterek'],1,'Koridorda güvenli yürümek gerekir.'],
      ['Çöpümüzü nereye atmalıyız?',['Çöp kutusuna','Yere','Sıraya'],0,'Çöpler çöp kutusuna atılır.']
    ];
    if(subject==='ingilizce'&&topic==='numbers')return [
      ['“Three” hangi sayıdır?',['2','3','4'],1,'Three İngilizcede 3 demektir.'],
      ['“Five” hangi sayıdır?',['5','6','7'],0,'Five, 5 demektir.'],
      ['4 İngilizcede nasıl söylenir?',['Four','Five','Three'],0,'4, four demektir.']
    ];
    var title=titleFrom(topic);return [
      ['Bu test hangi konuya aittir?',[title,'Boş sayfa','Yanlış ders'],0,'Bu test '+title+' konusuna bağlıdır.'],
      ['Doğru cevap hangi renkle gösterilir?',['Yeşil','Siyah','Gri'],0,'Doğru cevap yeşil renkle görünür.'],
      ['Yanlış cevapta ne açılır?',['Açıklama ve videolu anlatım','Boş ekran','Reklam'],0,'Yanlışta açıklama paneli ve videolu anlatım butonu açılır.']
    ];
  }
  function render(){var p=params();var subjectName=subjects[p.subject]||'Matematik';var topicTitle=titleFrom(p.topic);var q=questions(p.subject,p.topic);var app=document.getElementById('app');if(!app)return;app.innerHTML=nav()+'<main><section class="g1-hero"><div class="g1-container"><p class="g1-breadcrumb"><a href="/index.html">Ana Sayfa</a> / <a href="/siniflar/2-sinif/index.html">2. Sınıf</a> / <a href="'+base+'/'+p.subject+'.html">'+esc(subjectName)+'</a> / '+esc(topicTitle)+' Testi</p><div class="g1-hero-card"><span class="g1-kicker">Videolu Yardımlı Test</span><h1>2. Sınıf '+esc(subjectName)+' - '+esc(topicTitle)+' Testi</h1><p class="g1-lead">Soruyu bilemezsen açıklama açılır. İstersen <strong>Videolu Anlatımı Aç</strong> butonuyla aynı soruyu video desteğiyle tekrar dinleyebilirsin.</p></div></div></section><section class="g1-section"><div class="g1-container" id="questions"></div></section></main>'+footer();var area=document.getElementById('questions');var correct=0,checked=0;area.innerHTML=q.map(function(item,i){return '<article class="g1-question" data-q="'+i+'" data-correct="'+item[2]+'"><h3>Soru '+(i+1)+': '+esc(item[0])+'</h3><div class="g1-options">'+item[1].map(function(opt,j){return '<button class="g1-option" type="button" data-answer="'+j+'">'+String.fromCharCode(65+j)+') '+esc(opt)+'</button>';}).join('')+'</div><p class="g1-empty" hidden>Önce bir seçenek seç.</p><div class="g1-explanation">'+esc(item[3])+'</div><div class="g1-video-help" hidden><strong>Bu soruyu bilemedin mi?</strong><p>Kısa açıklamayı okuduktan sonra aynı konu için videolu anlatımı açabilirsin.</p><button class="g1-btn primary g1-video-btn" type="button" data-video="'+videoUrl(subjectName,topicTitle,item[0])+'">Videolu anlatımı aç</button><div class="g1-video-frame" hidden></div></div><div class="g1-actions"><button class="g1-btn green check-answer" type="button">Cevabı Kontrol Et</button><button class="g1-btn soft next-question" type="button">Sonraki Soru</button></div></article>';}).join('')+'<div id="testResult" class="g1-result"></div><div class="g1-actions"><button id="retryWrong" class="g1-btn yellow" type="button">Yanlışları Tekrar Çöz</button><a class="g1-btn white" href="'+base+'/'+p.subject+'/'+p.topic+'.html">Konuya Dön</a><a class="g1-btn soft" href="'+base+'/'+p.subject+'.html">Derse Dön</a><a class="g1-btn soft" href="/siniflar/2-sinif/index.html">Sınıfa Dön</a></div>';
    area.addEventListener('click',function(e){var opt=e.target.closest('.g1-option');if(opt){var card=opt.closest('.g1-question');if(card.dataset.done==='1')return;card.querySelectorAll('.g1-option').forEach(function(b){b.classList.remove('selected');});opt.classList.add('selected');card.dataset.selected=opt.dataset.answer;return;}var check=e.target.closest('.check-answer');if(check){var card=check.closest('.g1-question');if(card.dataset.done==='1')return;var warn=card.querySelector('.g1-empty');if(card.dataset.selected===undefined){warn.hidden=false;return;}warn.hidden=true;var chosen=parseInt(card.dataset.selected,10);var right=parseInt(card.dataset.correct,10);var buttons=card.querySelectorAll('.g1-option');buttons.forEach(function(b){b.disabled=true;});if(chosen===right){correct++;buttons[chosen].classList.add('correct');}else{buttons[chosen].classList.add('wrong');buttons[right].classList.add('correct');card.querySelector('.g1-video-help').hidden=false;}checked++;card.dataset.done='1';card.querySelector('.g1-explanation').classList.add('show');if(checked===q.length)showResult();return;}var video=e.target.closest('.g1-video-btn');if(video){var frame=video.nextElementSibling;if(frame&&!frame.dataset.loaded){frame.innerHTML='<iframe src="'+video.dataset.video+'" title="Soruyu videolu anlat" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';frame.dataset.loaded='1';}if(frame)frame.hidden=false;video.textContent='Videolu anlatım açık';return;}var next=e.target.closest('.next-question');if(next){var current=next.closest('.g1-question');var target=current.nextElementSibling;if(target&&target.classList.contains('g1-question'))target.scrollIntoView({behavior:'smooth',block:'start'});else document.getElementById('testResult').scrollIntoView({behavior:'smooth',block:'start'});}});
    document.getElementById('retryWrong').addEventListener('click',function(){location.href=base+'/'+p.subject+'/'+p.topic+'-test.html';});
    function showResult(){var wrong=q.length-correct;var percent=Math.round(correct/q.length*100);var point=Math.max(0,Math.min(100,correct*10-wrong*4+(correct>=8?6:0)));var box=document.getElementById('testResult');box.classList.add('show');box.innerHTML='<h2>Test Sonucu</h2><p>Doğru: <strong>'+correct+'</strong> · Yanlış: <strong>'+wrong+'</strong> · Başarı: <strong>%'+percent+'</strong></p><p>Öğrenme Puanı: <strong>'+point+' / 100</strong></p>';}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
