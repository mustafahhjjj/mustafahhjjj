(function(){
  'use strict';
  var base='/siniflar/1-sinif';
  var subjects={turkce:'Türkçe',matematik:'Matematik','hayat-bilgisi':'Hayat Bilgisi','gorsel-sanatlar':'Görsel Sanatlar',muzik:'Müzik','beden-egitimi-ve-oyun':'Beden Eğitimi ve Oyun'};
  var titles={'rakamlari-tanima':'Rakamları Tanıma','cizgi-calismalari':'Çizgi Çalışmaları','okudugunu-anlama':'Okuduğunu Anlama','toplama-islemine-giris':'Toplama İşlemine Giriş','kendimi-taniyorum':'Kendimi Tanıyorum'};
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function titleFrom(slug){return titles[slug]||slug.split('-').map(function(w){return w.charAt(0).toUpperCase()+w.slice(1);}).join(' ');}
  function params(){var qs=new URLSearchParams(location.search);var path=location.pathname.split('/').filter(Boolean);var subject=document.body.dataset.subject||qs.get('ders')||path[2]||'matematik';var raw=document.body.dataset.topic||qs.get('konu')||path[3]||'rakamlari-tanima';raw=raw.replace(/\.html$/,'').replace(/-test$/,'');return {subject:subject,topic:raw};}
  function nav(){return '<header class="g1-header"><nav class="g1-nav g1-container"><a class="g1-logo" href="/index.html"><span class="g1-logo-mark">e</span><span>e-kurs.com</span></a><div class="g1-links"><a href="/index.html">Ana Sayfa</a><a href="/siniflar/index.html">Sınıflar</a><a href="/dersler/index.html">Dersler</a><a href="/testler/index.html">Testler</a><a class="g1-btn soft" href="/giris.html">Giriş Yap</a></div></nav></header>';}
  function footer(){return '<footer class="g1-footer"><div class="g1-container"><strong>e-kurs.com</strong><p>1. sınıf test ekranı: seç, cevabı kontrol et, sonraki soruya geç.</p></div></footer>';}
  function questions(subject,topic){if(subject==='matematik'&&topic==='rakamlari-tanima'){return [
    ['Aşağıdakilerden hangisi 3 rakamıdır?',['2','3','5'],1,'3 rakamı üç nesneyi gösterir.'],
    ['Kaç tane yıldız var? ★ ★ ★ ★',['3','4','5'],1,'Yıldızları sayalım: 1, 2, 3, 4.'],
    ['1, 2, 3, __ sırada hangi sayı gelir?',['4','5','6'],0,'3’ten sonra 4 gelir.'],
    ['Kaç parmak gösteriliyor? ✋',['4','5','6'],1,'Bir elde 5 parmak vardır.'],
    ['0 rakamı neyi gösterir?',['Hiç yok','Bir tane','İki tane'],0,'0, hiç nesne olmadığını gösterir.'],
    ['Hangisi 7 rakamıdır?',['1','7','9'],1,'7 rakamı yediyi gösterir.'],
    ['2 elma daha 1 elma kaç elma eder?',['2','3','4'],1,'2 elmadan sonra 1 elma daha gelirse 3 olur.'],
    ['5’ten önce hangi sayı gelir?',['4','6','7'],0,'Sayarken 4, 5 diye gideriz.'],
    ['Kaç tane daire var? ● ● ●',['2','3','4'],1,'Daireleri sayalım: 1, 2, 3.'],
    ['9 sayısından sonra hangi sayı gelir?',['8','10','11'],1,'9’dan sonra 10 gelir.']
  ];}
  var title=titleFrom(topic);return [
    ['Bu test hangi konuya aittir?',[title,'Boş sayfa','Yanlış ders'],0,'Bu test '+title+' konusuna bağlıdır.'],
    ['Cevabı kontrol etmek için hangi butona basılır?',['Cevabı Kontrol Et','Sayfadan Çık','Boş bırak'],0,'Cevabı Kontrol Et butonu seçimini kontrol eder.'],
    ['Doğru cevap hangi renkle gösterilir?',['Yeşil','Siyah','Gri'],0,'Doğru cevap yeşil renkle görünür.'],
    ['Yanlış cevapta ne açılır?',['Açıklama','Boş ekran','Reklam'],0,'Yanlışta açıklama paneli açılır.'],
    ['Sonraki soruya nasıl geçilir?',['Sonraki Soru','Kapat','Geri dön'],0,'Sonraki Soru butonu seni bir sonraki soruya taşır.'],
    ['1. sınıf butonları nasıl olmalı?',['Büyük','Çok küçük','Gizli'],0,'Büyük butonlar çocukların kolay tıklamasını sağlar.'],
    ['Test sonunda hangi bilgi görünür?',['Doğru ve yanlış sayısı','Boş sayfa','Sadece logo'],0,'Sonuç ekranında doğru, yanlış, başarı ve öğrenme puanı görünür.'],
    ['Konuya dönmek için hangi bağlantı kullanılır?',['Konuya Dön','Boş link','Yanlış link'],0,'Konuya Dön bağlantısı gerçek konu sayfasına gider.'],
    ['Derse dönmek için hangi bağlantı kullanılır?',['Derse Dön','Yenile','Kapat'],0,'Derse Dön bağlantısı gerçek ders sayfasına gider.'],
    ['Çalışırken önce ne yapmalısın?',['Soruyu oku','Rastgele seç','Hemen çık'],0,'Önce soruyu dikkatlice okumak gerekir.']
  ];}
  function render(){var p=params();var subjectName=subjects[p.subject]||'Matematik';var topicTitle=titleFrom(p.topic);var q=questions(p.subject,p.topic);var app=document.getElementById('app');if(!app)return;app.innerHTML=nav()+'<main><section class="g1-hero"><div class="g1-container"><p class="g1-breadcrumb"><a href="/index.html">Ana Sayfa</a> / <a href="/siniflar/1-sinif/index.html">1. Sınıf</a> / <a href="'+base+'/'+p.subject+'.html">'+esc(subjectName)+'</a> / '+esc(topicTitle)+' Testi</p><div class="g1-hero-card"><span class="g1-kicker">10 Soruluk Test</span><h1>1. Sınıf '+esc(subjectName)+' - '+esc(topicTitle)+' Testi</h1><p class="g1-lead">Önce seçeneğe dokun, sonra <strong>Cevabı Kontrol Et</strong> butonuna bas. Her sorudan sonra açıklama görünür.</p></div></div></section><section class="g1-section"><div class="g1-container" id="questions"></div></section></main>'+footer();var area=document.getElementById('questions');var correct=0,checked=0;area.innerHTML=q.map(function(item,i){return '<article class="g1-question" data-q="'+i+'" data-correct="'+item[2]+'"><h3>Soru '+(i+1)+': '+esc(item[0])+'</h3><div class="g1-options">'+item[1].map(function(opt,j){return '<button class="g1-option" type="button" data-answer="'+j+'">'+String.fromCharCode(65+j)+') '+esc(opt)+'</button>';}).join('')+'</div><p class="g1-empty" hidden>Önce bir seçenek seç.</p><div class="g1-explanation">'+esc(item[3])+'</div><div class="g1-actions"><button class="g1-btn green check-answer" type="button">Cevabı Kontrol Et</button><button class="g1-btn soft next-question" type="button">Sonraki Soru</button></div></article>';}).join('')+'<div id="testResult" class="g1-result"></div><div class="g1-actions"><button id="retryWrong" class="g1-btn yellow" type="button">Yanlışları Tekrar Çöz</button><a class="g1-btn white" href="'+base+'/'+p.subject+'/'+p.topic+'.html">Konuya Dön</a><a class="g1-btn soft" href="'+base+'/'+p.subject+'.html">Derse Dön</a></div>';
    area.addEventListener('click',function(e){var opt=e.target.closest('.g1-option');if(opt){var card=opt.closest('.g1-question');if(card.dataset.done==='1')return;card.querySelectorAll('.g1-option').forEach(function(b){b.classList.remove('selected');});opt.classList.add('selected');card.dataset.selected=opt.dataset.answer;return;}var check=e.target.closest('.check-answer');if(check){var card=check.closest('.g1-question');if(card.dataset.done==='1')return;var warn=card.querySelector('.g1-empty');if(card.dataset.selected===undefined){warn.hidden=false;return;}warn.hidden=true;var chosen=parseInt(card.dataset.selected,10);var right=parseInt(card.dataset.correct,10);var buttons=card.querySelectorAll('.g1-option');buttons.forEach(function(b){b.disabled=true;});if(chosen===right){correct++;buttons[chosen].classList.add('correct');}else{buttons[chosen].classList.add('wrong');buttons[right].classList.add('correct');}checked++;card.dataset.done='1';card.querySelector('.g1-explanation').classList.add('show');if(checked===q.length)showResult();return;}var next=e.target.closest('.next-question');if(next){var current=next.closest('.g1-question');var target=current.nextElementSibling;if(target&&target.classList.contains('g1-question'))target.scrollIntoView({behavior:'smooth',block:'start'});else document.getElementById('testResult').scrollIntoView({behavior:'smooth',block:'start'});}});
    document.getElementById('retryWrong').addEventListener('click',function(){location.href=base+'/'+p.subject+'/'+p.topic+'-test.html';});
    function showResult(){var wrong=q.length-correct;var percent=Math.round(correct/q.length*100);var point=Math.max(0,Math.min(100,correct*10-wrong*4+(correct>=8?6:0)));var box=document.getElementById('testResult');box.classList.add('show');box.innerHTML='<h2>Test Sonucu</h2><p>Doğru: <strong>'+correct+'</strong> · Yanlış: <strong>'+wrong+'</strong> · Başarı: <strong>%'+percent+'</strong></p><p>Öğrenme Puanı: <strong>'+point+' / 100</strong></p>';}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
