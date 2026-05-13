(function(){
  if(window.__ekursSubjectIntelligenceLoaded)return;
  window.__ekursSubjectIntelligenceLoaded=true;

  var subjectData={
    matematik:{
      title:'Matematik AI çalışma rotası',
      focus:'Sayılar, işlemler, geometri ve problem çözme',
      diagnostic:'Son denemelerde işlem sırası ve kesir karşılaştırma hataları izlenir.',
      next:'5 dakikalık seviye ölçümüyle bugün çözeceğin ilk mikro beceriyi belirle.',
      skills:['Temel kavramları ölç','Kesirleri karşılaştır','Yeni nesil problem çöz','Geometri mini tekrar'],
      rewards:['+35 XP konu tamamla','+60 XP test geç','500 XP Hızlı Çözücü rozeti']
    },
    turkce:{
      title:'Türkçe AI çalışma rotası',
      focus:'Okuma anlama, dil bilgisi ve paragraf',
      diagnostic:'Paragraf çıkarımı ve sözcükte anlam hataları izlenir.',
      next:'Kısa okuma pratiğiyle güçlü ve tekrar gereken alanları ayır.',
      skills:['Paragraf ana fikri','Sözcükte anlam','Cümlede anlam','Dil bilgisi tekrar'],
      rewards:['+35 XP konu tamamla','+60 XP test geç','500 XP Okuma Kurdu rozeti']
    },
    fen:{
      title:'Fen Bilimleri AI çalışma rotası',
      focus:'Deney, kavram ve günlük yaşam bağlantısı',
      diagnostic:'Formül seçimi, kavram yanılgısı ve deney yorumu izlenir.',
      next:'Önce kavram kontrolü, sonra kısa uygulama testi önerilir.',
      skills:['Kavram kontrolü','Deney yorumu','Grafik okuma','Sınav provası'],
      rewards:['+35 XP konu tamamla','+60 XP test geç','500 XP Fen Kaşifi rozeti']
    }
  };

  function slug(){
    var match=location.pathname.toLowerCase().match(/\/dersler\/([^\/?#]+)/);
    return match?decodeURIComponent(match[1]).replace('.html',''):'';
  }

  function currentData(){
    var key=slug();
    if(subjectData[key])return subjectData[key];
    var title=(document.querySelector('h1')||{}).textContent||'';
    if(/matematik/i.test(title))return subjectData.matematik;
    if(/türkçe|turkce/i.test(title))return subjectData.turkce;
    if(/fen/i.test(title))return subjectData.fen;
    return null;
  }

  function enhanceUnitCards(data){
    Array.prototype.slice.call(document.querySelectorAll('.grid-3 .card')).forEach(function(card,index){
      if(card.querySelector('.micro-skill-row'))return;
      var skill=data.skills[index%data.skills.length];
      var reward=data.rewards[index%data.rewards.length];
      var row=document.createElement('div');
      row.className='micro-skill-row';
      row.innerHTML='<span>'+skill+'</span><b>'+reward+'</b>';
      var button=card.querySelector('.btn');
      if(button)card.insertBefore(row,button);
      else card.appendChild(row);
      card.classList.add('subject-smart-card');
    });
  }

  function insertAiRoute(data){
    if(document.querySelector('.subject-ai-route'))return;
    var hero=document.querySelector('.page-hero .container');
    var section=document.querySelector('main .section .container');
    if(!hero||!section)return;
    var panel=document.createElement('section');
    panel.className='subject-ai-route';
    panel.innerHTML=[
      '<div class="subject-ai-copy">',
        '<span>AI Diagnostic</span>',
        '<h2>'+data.title+'</h2>',
        '<p><strong>'+data.focus+'</strong> için adaptif rota: doğru cevaplarda zorluk artar, tekrar eden hatalarda temel anlatıma döner.</p>',
        '<div class="subject-ai-actions">',
          '<a class="btn btn-primary" href="/seviye-belirle.html">Seviyeni Ölç</a>',
          '<a class="btn btn-light" href="/testler/index.html">Mikro Test Çöz</a>',
        '</div>',
      '</div>',
      '<div class="subject-ai-panel">',
        '<article><b>Eksik analizi</b><span>'+data.diagnostic+'</span></article>',
        '<article><b>Sıradaki adım</b><span>'+data.next+'</span></article>',
        '<article><b>Ödül</b><span>'+data.rewards[0]+' ile ilerlemeni başlat.</span></article>',
      '</div>'
    ].join('');
    section.insertBefore(panel,section.firstChild);
  }

  function improveRecommendation(data){
    var card=document.querySelector('.progress-card');
    if(!card||card.querySelector('.subject-rec-list'))return;
    var list=document.createElement('div');
    list.className='subject-rec-list';
    list.innerHTML=data.skills.slice(0,3).map(function(skill){
      return '<a href="/testler/index.html">'+skill+'</a>';
    }).join('');
    card.appendChild(list);
  }

  function run(){
    var data=currentData();
    if(!data)return;
    document.documentElement.classList.add('subject-intelligence-ready');
    insertAiRoute(data);
    enhanceUnitCards(data);
    improveRecommendation(data);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();
