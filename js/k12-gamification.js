(function(){
  if(window.__ekursGamificationLoaded)return;
  window.__ekursGamificationLoaded=true;

  var fallbackState={
    studentName:'e-kurs öğrencisi',
    grade:'8. Sınıf',
    xp:420,
    nextBadge:{name:'Hızlı Çözücü',threshold:500,icon:'bolt'},
    badges:[
      {name:'Matematik Kaşifi',threshold:250,unlocked:true,icon:'compass'},
      {name:'Hızlı Çözücü',threshold:500,unlocked:false,icon:'bolt'},
      {name:'Konu Ustası',threshold:1000,unlocked:false,icon:'star'}
    ],
    recommendations:[
      {skill:'Üslü Sayılar',subject:'Matematik',reason:'Son 3 denemede aynı alt kazanımda hata görüldü.',cta:'5 soruluk tekrar testini çöz'},
      {skill:'Paragrafta Anlam',subject:'Türkçe',reason:'Çıkarım sorularında süre ortalaman yükseldi.',cta:'Kısa okuma pratiği yap'},
      {skill:'Basınç',subject:'Fen Bilimleri',reason:'Formül seçimi karışıyor; örnek çözüm önerildi.',cta:'Örnek çözümü aç'}
    ]
  };

  function readLocalState(){
    try{
      var saved=JSON.parse(localStorage.getItem('ekurs.gamificationState')||'null');
      if(saved&&typeof saved==='object')return Object.assign({},fallbackState,saved);
    }catch(error){}
    return fallbackState;
  }

  function badgeIcon(type){
    if(type==='bolt')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 10-13h-7l0-7z"/></svg>';
    if(type==='compass')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.7 6.3-2.1 5.3-5.3 2.1 2.1-5.3 5.3-2.1z"/></svg>';
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.9 6 6.6.9-4.8 4.7 1.1 6.6L12 17.1l-5.8 3.1 1.1-6.6-4.8-4.7 6.6-.9L12 2z"/></svg>';
  }

  function getDashboardHost(){
    var path=location.pathname.toLowerCase();
    var bodyText=(document.body.textContent||'').slice(0,2000);
    var dashboardLike=/panel|dashboard|basarilarim|ogrenci/.test(path)||/Öğrenci Paneli|Müfredat İlerlemesi|Başarı Analizi|Dashboard/i.test(bodyText);
    if(!dashboardLike)return null;
    return document.querySelector('#student-dashboard,.student-dashboard,[data-student-dashboard],main,.dashboard,.container')||document.body;
  }

  function renderDashboard(state){
    var host=getDashboardHost();
    if(!host||document.querySelector('.gamification-dashboard'))return;
    var next=state.nextBadge||fallbackState.nextBadge;
    var missing=Math.max(0,next.threshold-state.xp);
    var progress=Math.max(0,Math.min(100,Math.round((state.xp/next.threshold)*100)));
    var shell=document.createElement('section');
    shell.className='gamification-dashboard';
    shell.innerHTML=[
      '<div class="xp-card">',
        '<div class="xp-copy"><span>Oyunlaştırılmış ilerleme</span><h2>'+state.xp+' XP</h2><p>Bir sonraki rozet: <strong>'+next.name+'</strong>. '+missing+' XP kaldı.</p></div>',
        '<div class="xp-progress" aria-label="Rozet ilerlemesi" aria-valuemin="0" aria-valuemax="'+next.threshold+'" aria-valuenow="'+state.xp+'" role="progressbar">',
          '<i style="width:'+progress+'%"></i>',
        '</div>',
      '</div>',
      '<div class="badge-row">'+state.badges.map(function(badge){
        return '<article class="badge-chip '+(badge.unlocked?'is-unlocked':'is-locked')+'">'+badgeIcon(badge.icon)+'<div><strong>'+badge.name+'</strong><span>'+badge.threshold+' XP</span></div></article>';
      }).join('')+'</div>',
      '<div class="diagnostic-recommendations">',
        '<div class="diagnostic-title"><span>AI Diagnostic</span><h2>Sana Özel Öneriler</h2></div>',
        state.recommendations.map(function(item){
          return '<a class="diagnostic-card" href="/seviye-belirle.html?skill='+encodeURIComponent(item.skill)+'"><b>'+item.subject+'</b><strong>'+item.skill+'</strong><span>'+item.reason+'</span><em>'+item.cta+'</em></a>';
        }).join(''),
      '</div>'
    ].join('');
    host.insertAdjacentElement(host===document.body?'afterbegin':'afterbegin',shell);
  }

  function renderMiniPrompt(state){
    if(document.querySelector('.gamification-mini')||getDashboardHost())return;
    var target=document.querySelector('#ai-akis .container,.ai-diagnostic-hero,.hero .container,main');
    if(!target)return;
    var prompt=document.createElement('aside');
    prompt.className='gamification-mini';
    prompt.innerHTML='<strong>'+state.xp+' XP</strong><span>'+state.nextBadge.name+' rozetine '+Math.max(0,state.nextBadge.threshold-state.xp)+' XP kaldı</span>';
    target.appendChild(prompt);
  }

  function sendEvent(type,payload){
    var state=readLocalState();
    var xpMap={video_watched:10,topic_completed:35,test_passed:60,diagnostic_review:20};
    state.xp+=xpMap[type]||5;
    state.badges=state.badges.map(function(badge){
      badge.unlocked=badge.unlocked||state.xp>=badge.threshold;
      return badge;
    });
    localStorage.setItem('ekurs.gamificationState',JSON.stringify(state));
    if(window.fetch){
      fetch('/api/k12-gamification.php?action=event',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(Object.assign({event:type},payload||{}))
      }).catch(function(){});
    }
  }

  function run(){
    var state=readLocalState();
    window.ekursGamification={award:sendEvent,state:state};
    renderDashboard(state);
    renderMiniPrompt(state);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();
