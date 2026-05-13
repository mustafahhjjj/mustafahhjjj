(function(){
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
      lead:'Büyük butonlar, sesli okuma, yıldız hedefi ve görsel destek açık.',
      action:'Sesli Oku',
      secondary:'Yıldız hedefim',
      cards:[['3 küçük hedef','Bir konu dinle, 5 soru çöz, 1 yıldız kazan.'],['Görsel destek','Konu kartlarında somut örnek ve kısa cümleler kullanılır.'],['Anında moral','Doğru cevapta yıldız, yanlışta çocuk dilinde ipucu gösterilir.']]
    };
    if(tier==='MIDDLE')return {
      badge:'Ortaokul / LGS modu',
      title:'Hedefini gör, serini koru, alt becerini güçlendir',
      lead:'İlerleme halkaları, günlük seri, sınıf hedefi ve LGS farkındalığı açık.',
      action:'Hedefe Başla',
      secondary:'Seri: 5 gün',
      cards:[['Alt beceri takibi','Her konu kazanım alt becerilerine ayrılır.'],['Sağlıklı rekabet','Sınıf hedefi ve isteğe bağlı liderlik tablosu gösterilir.'],['LGS hazırlığı','8. sınıfta süre ve yeni nesil soru farkındalığı öne çıkar.']]
    };
    return {
      badge:'Lise / YKS modu',
      title:'Zamanı yönet, zayıf noktayı gör, ustalık seviyesine çık',
      lead:'Minimal görünüm, koyu mod, analiz kartları, Pomodoro ve sınav geri sayımı açık.',
      action:'Pomodoro Başlat',
      secondary:'Koyu Mod',
      cards:[['Zayıf nokta analizi','Yanlışlar konu, süre ve hata türüne göre ayrılır.'],['Sınav zamanı','TYT/AYT geri sayımı ve çalışma süresi hedefi görünür.'],['Ustalık seviyesi','Rozet yerine mastery seviyesi ve yüzdelik başarı gösterilir.']]
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
  function init(){
    var grade=getGradeFromPath(location.pathname);
    if(!grade)return;
    var tier=getGradeTier(grade);
    addToneAttributes(grade,tier);
    enhanceSkillCards(tier);
    if(document.querySelector('.grade-tier-panel'))return;
    var main=document.querySelector('main');
    if(!main)return;
    var hero=document.querySelector('.math-hero');
    var panel=buildPanel(grade,tier);
    if(hero&&hero.parentNode)hero.insertAdjacentElement('afterend',panel);else main.insertAdjacentElement('afterbegin',panel);
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
  window.EKursGradeTier={getGradeTier:getGradeTier,getGradeFromPath:getGradeFromPath};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
