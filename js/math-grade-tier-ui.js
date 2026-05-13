(function(){
  var MEB_MATH_THEMES={
    1:{source:'MEB TYMM İlkokul Matematik Dersi Öğretim Programı (1-4), 2024',themes:['Nesnelerin Geometrisi (1)','Sayılar ve Nicelikler (1)','Sayılar ve Nicelikler (2)','İşlemlerden Cebirsel Düşünmeye','Sayılar ve Nicelikler (3)','Nesnelerin Geometrisi (2)','Veriye Dayalı Araştırma']},
    2:{source:'MEB TYMM İlkokul Matematik Dersi Öğretim Programı (1-4), 2024',themes:['Nesnelerin Geometrisi (1)','Sayılar ve Nicelikler (1)','İşlemlerden Cebirsel Düşünmeye','Sayılar ve Nicelikler (2)','Nesnelerin Geometrisi (2)','Veriye Dayalı Araştırma']},
    3:{source:'MEB TYMM İlkokul Matematik Dersi Öğretim Programı (1-4), 2024',themes:['Sayılar ve Nicelikler (1)','Sayılar ve Nicelikler (2)','İşlemlerden Cebirsel Düşünmeye','Nesnelerin Geometrisi (1)','Nesnelerin Geometrisi (2)','Veriye Dayalı Araştırma']},
    4:{source:'MEB TYMM İlkokul Matematik Dersi Öğretim Programı (1-4), 2024',themes:['Sayılar ve Nicelikler (1)','Sayılar ve Nicelikler (2)','İşlemlerden Cebirsel Düşünmeye','Nesnelerin Geometrisi (1)','Nesnelerin Geometrisi (2)','Nesnelerin Geometrisi (3)','Olayların Olasılığı ve Veriye Dayalı Araştırma']},
    5:{source:'MEB TYMM Ortaokul Matematik Dersi Öğretim Programı (5-8), 2024',themes:['MAT.5.3 Geometrik Şekiller','MAT.5.1 Sayılar ve Nicelikler (1)','MAT.5.4 Geometrik Nicelikler','MAT.5.1 Sayılar ve Nicelikler (2)','MAT.5.5 İstatistiksel Araştırma Süreci','MAT.5.2 İşlemlerle Cebirsel Düşünme','MAT.5.6 Veriden Olasılığa']},
    6:{source:'MEB TYMM Ortaokul Matematik Dersi Öğretim Programı (5-8), 2024',themes:['MAT.6.1 Sayılar ve Nicelikler (1)','MAT.6.5 İstatistiksel Araştırma Süreci','MAT.6.1 Sayılar ve Nicelikler (2)','MAT.6.6 Veriden Olasılığa','MAT.6.3 Geometrik Şekiller','MAT.6.2 İşlemlerle Cebirsel Düşünme ve Değişimler','MAT.6.4 Geometrik Nicelikler']},
    7:{source:'MEB TYMM Ortaokul Matematik Dersi Öğretim Programı (5-8), 2024',themes:['MAT.7.1 Sayılar ve Nicelikler (1)','MAT.7.4 Geometrik Nicelikler (1)','MAT.7.6 İstatistiksel Araştırma Süreci','MAT.7.3 Dönüşüm','MAT.7.5 Geometrik Şekiller','MAT.7.1 Sayılar ve Nicelikler (2)','MAT.7.7 Veriden Olasılığa','MAT.7.2 İşlemlerle Cebirsel Düşünme ve Değişimler','MAT.7.4 Geometrik Nicelikler (2)']},
    8:{source:'MEB TYMM Ortaokul Matematik Dersi Öğretim Programı (5-8), 2024',themes:['MAT.8.1 Sayılar ve Nicelikler','MAT.8.3 Geometrik Şekiller','MAT.8.7 Veriden Olasılığa','MAT.8.2 Cebirsel Düşünme ve Değişimler','MAT.8.4 Geometrik Nicelikler','MAT.8.6 İstatistiksel Araştırma Süreci','MAT.8.5 Dönüşüm']},
    9:{source:'MEB TYMM Ortaöğretim Matematik Dersi Öğretim Programı (Hazırlık, 9-12), 2024',themes:['MAT.9.1 Sayılar','MAT.9.2 Nicelikler ve Değişimler','MAT.9.4 Geometrik Şekiller','MAT.9.5 Eşlik ve Benzerlik','MAT.9.3 Algoritma ve Bilişim','MAT.9.6 İstatistiksel Araştırma Süreci','MAT.9.7 Veriden Olasılığa']},
    10:{source:'MEB TYMM Ortaöğretim Matematik Dersi Öğretim Programı (Hazırlık, 9-12), 2024',themes:['MAT.10.4 Geometrik Şekiller','MAT.10.6 İstatistiksel Araştırma Süreci','MAT.10.1 Sayılar','MAT.10.2 Nicelikler ve Değişimler','MAT.10.3 Sayma, Algoritma ve Bilişim','MAT.10.5 Analitik İnceleme','MAT.10.7 Veriden Olasılığa']},
    11:{source:'MEB TYMM Ortaöğretim Matematik Dersi Öğretim Programı (Hazırlık, 9-12), 2024',themes:['MAT.11.3 İstatistiksel Araştırma Süreci','MAT.11.2 Geometrik Şekiller','MAT.11.1 Nicelikler ve Değişimler (1)','MAT.11.1 Nicelikler ve Değişimler (2)','MAT.11.1 Nicelikler ve Değişimler (3)']},
    12:{source:'MEB TYMM Ortaöğretim Matematik Dersi Öğretim Programı (Hazırlık, 9-12), 2024',themes:['MAT.12.1 Nicelikler ve Değişimler (1)','MAT.12.1 Nicelikler ve Değişimler (2)','MAT.12.3 Geometrik Şekiller','MAT.12.4 Geometrik Cisimler','MAT.12.2 Değişimin Matematiği (1)','MAT.12.2 Değişimin Matematiği (2)','MAT.12.2 Değişimin Matematiği (3)','MAT.12.5 Hazır Veriler Üzerinde Çalışma']}
  };
  function getGradeFromPath(path){
    var match=(path||location.pathname).match(/\/(\d{1,2})-sinif\//);
    return match?Number(match[1]):null;
  }
  function getGradeTier(grade){
    if(grade>=1&&grade<=4)return 'PRIMARY';
    if(grade>=5&&grade<=8)return 'MIDDLE';
    if(grade>=9&&grade<=12)return 'HIGH';
    return 'UNKNOWN';
  }
  function tierText(tier){
    if(tier==='PRIMARY')return {
      badge:'İlkokul modu',
      title:'Bugün matematiği küçük adımlarla öğrenelim',
      lead:'Tema adları MEB programından alınır; arayüz büyük buton, sesli okuma ve görsel destekle uyarlanır.',
      action:'Sesli Oku',
      secondary:'Yıldız hedefim',
      cards:[['MEB tema sırası','Konu akışı ders kitabı/öğretim programı sırasına göre gösterilir.'],['Görsel destek','Konu kartlarında somut örnek ve kısa cümleler kullanılır.'],['Anında moral','Doğru cevapta yıldız, yanlışta çocuk dilinde ipucu gösterilir.']]
    };
    if(tier==='MIDDLE')return {
      badge:'Ortaokul / LGS modu',
      title:'MEB temasını gör, serini koru, alt becerini güçlendir',
      lead:'Tema adları MEB programından alınır; ilerleme halkaları, seri ve LGS farkındalığı katmanı eklenir.',
      action:'Hedefe Başla',
      secondary:'Seri: 5 gün',
      cards:[['Resmi tema akışı','5-8. sınıf temaları MEB ortaokul matematik programına göre listelenir.'],['Sağlıklı rekabet','Sınıf hedefi ve isteğe bağlı liderlik tablosu gösterilir.'],['LGS hazırlığı','8. sınıfta süre ve yeni nesil soru farkındalığı öne çıkar.']]
    };
    return {
      badge:'Lise / YKS modu',
      title:'MEB temasını izle, zamanı yönet, ustalık seviyesine çık',
      lead:'Tema adları MEB ortaöğretim programından alınır; koyu mod, analiz kartları, Pomodoro ve sınav odağı eklenir.',
      action:'Pomodoro Başlat',
      secondary:'Koyu Mod',
      cards:[['Resmi tema akışı','9-12. sınıf temaları MEB ortaöğretim matematik programına göre gösterilir.'],['Sınav zamanı','TYT/AYT geri sayımı ve çalışma süresi hedefi görünür.'],['Ustalık seviyesi','Rozet yerine mastery seviyesi ve yüzdelik başarı gösterilir.']]
    };
  }
  function buildPanel(grade,tier){
    var copy=tierText(tier);
    var wrap=document.createElement('section');
    wrap.className='grade-tier-panel grade-tier-'+tier.toLowerCase();
    wrap.setAttribute('aria-label','Yaş grubuna göre uyarlanmış çalışma paneli');
    wrap.innerHTML='<div class="grade-tier-copy"><span>'+copy.badge+'</span><h2>'+copy.title+'</h2><p>'+copy.lead+'</p><div class="grade-tier-actions"><button type="button" data-tier-action>'+copy.action+'</button><button type="button" data-tier-secondary>'+copy.secondary+'</button></div></div><div class="grade-tier-cards">'+copy.cards.map(function(card){return '<article><strong>'+card[0]+'</strong><small>'+card[1]+'</small></article>'}).join('')+'</div>';
    return wrap;
  }
  function buildMebThemes(grade){
    var data=MEB_MATH_THEMES[grade];
    if(!data)return null;
    var section=document.createElement('section');
    section.className='meb-theme-section';
    section.setAttribute('aria-label','MEB matematik tema listesi');
    section.innerHTML='<div class="meb-theme-head"><span>MEB tema planı</span><h2>'+grade+'. Sınıf Matematik Temaları</h2><p>'+data.source+' esas alınmıştır. Tema adları ürün diliyle değiştirilmez; oyunlaştırma sadece arayüz katmanında yapılır.</p></div><ol class="meb-theme-list">'+data.themes.map(function(theme,index){return '<li><span>'+(index+1)+'</span><strong>'+theme+'</strong></li>'}).join('')+'</ol>';
    return section;
  }
  function addToneAttributes(grade,tier){
    document.documentElement.setAttribute('data-grade',String(grade));
    document.documentElement.setAttribute('data-grade-tier',tier);
    document.body.classList.add('grade-tier-ready','tier-'+tier.toLowerCase());
  }
  function enhanceSkillCards(tier){
    document.querySelectorAll('.skill-card,.student-card,.exam-card').forEach(function(card){
      card.setAttribute('data-tier-card',tier.toLowerCase());
    });
    if(tier==='PRIMARY'){
      document.querySelectorAll('.skill-card strong').forEach(function(el){
        if(!el.querySelector('.tts-dot'))el.insertAdjacentHTML('beforeend',' <span class="tts-dot" aria-label="Sesli oku">🔊</span>');
      });
    }
  }
  function insertAfterHero(node){
    var main=document.querySelector('main');
    if(!main)return;
    var hero=document.querySelector('.math-hero');
    if(hero&&hero.parentNode)hero.insertAdjacentElement('afterend',node);else main.insertAdjacentElement('afterbegin',node);
  }
  function init(){
    var grade=getGradeFromPath(location.pathname);
    if(!grade)return;
    var tier=getGradeTier(grade);
    addToneAttributes(grade,tier);
    enhanceSkillCards(tier);
    var panel=document.querySelector('.grade-tier-panel');
    if(!panel){
      panel=buildPanel(grade,tier);
      insertAfterHero(panel);
    }
    if(!document.querySelector('.meb-theme-section')){
      var themeSection=buildMebThemes(grade);
      if(themeSection)panel.insertAdjacentElement('afterend',themeSection);
    }
    panel.addEventListener('click',function(event){
      var target=event.target;
      if(!target.matches('button'))return;
      if(tier==='PRIMARY'&&target.hasAttribute('data-tier-action')){
        var text=document.querySelector('h1')?.textContent||'Matematik çalışması';
        if('speechSynthesis' in window){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(text));}
        target.textContent='Okunuyor';
      }else if(tier==='HIGH'&&target.hasAttribute('data-tier-secondary')){
        document.body.classList.toggle('tier-high-dark');
      }else{
        target.textContent='Hazır';
      }
    });
  }
  window.EKursGradeTier={getGradeTier:getGradeTier,getGradeFromPath:getGradeFromPath,themes:MEB_MATH_THEMES};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
