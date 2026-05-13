(function(){
  if(window.__ekursTestCenterLoaded)return;
  window.__ekursTestCenterLoaded=true;

  var path=(location.pathname||'').toLowerCase();
  var isTestPage=path.indexOf('/testler')!==-1 || /test/i.test(document.title||'');
  if(!isTestPage)return;

  var fallback={
    student:{name:'Öğrenci',grade:'8',streakDays:5,weeklySolved:34,xpToday:180},
    filters:{
      grades:['all','1','2','3','4','5','6','7','8','9','10','11','12'],
      subjects:['all','matematik','türkçe','fen bilimleri'],
      difficulties:['all','Kolay','Orta','Zorlayıcı'],
      statuses:['all','Yeni','Yarım Kalan','Tamamlanan']
    },
    recommendations:[
      {label:'Zayıf nokta giderici',title:'Üslü sayılar tekrar seti',reason:'Kuvvet alma ve işlem önceliği adımlarında tekrar öneriliyor.',target:'M.8.1.1.1',action:'5 soruluk tekrar testi'},
      {label:'Ön koşul önerisi',title:'EBOB-EKOK temel bağlantıları',reason:'Problem çözmeden önce çarpan ilişkilerini güçlendirmek iyi olur.',target:'M.8.1.2.1',action:'Kısa pratik başlat'}
    ],
    dailyChallenge:{title:'Günün Matematik Meydan Okuması',description:'5 dakikalık, seviyene göre kalibre edilmiş kısa test.',questionCount:5,xp:75,difficulty:'Uyarlanabilir'},
    tests:[
      {id:'math-8-uslu-sayilar-teshis',title:'Üslü Sayılar Hızlı Teşhis',grade:'8',subject:'matematik',unit:'Sayılar ve İşlemler',outcome:'M.8.1.1.1',skill:'Tam sayıların tam sayı kuvvetlerini hesaplama',difficulty:'Orta',questionCount:12,duration:15,xp:90,status:'Yeni',accuracy:null,modeHint:'Pratik modu önerilir'},
      {id:'math-8-karekok-devam',title:'Kareköklü İfadeler Kaldığın Yerden',grade:'8',subject:'matematik',unit:'Kareköklü İfadeler',outcome:'M.8.1.3.2',skill:'Kareköklü ifadeleri yaklaşık değerleriyle yorumlama',difficulty:'Zorlayıcı',questionCount:10,duration:14,xp:120,status:'Yarım Kalan',accuracy:54,modeHint:'Pratik modu önerilir'},
      {id:'math-8-carpanlar-deneme',title:'Çarpanlar ve Katlar Mini Deneme',grade:'8',subject:'matematik',unit:'Çarpanlar ve Katlar',outcome:'M.8.1.2.1',skill:'EBOB ve EKOK problemleri çözme',difficulty:'Orta',questionCount:20,duration:25,xp:150,status:'Tamamlanan',accuracy:82,modeHint:'Deneme modu ile tekrar et'}
    ],
    leaderboard:[{name:'8A-042',solved:48},{name:'8B-117',solved:42},{name:'8C-089',solved:39}]
  };

  var state={grade:'8',subject:'matematik',difficulty:'all',status:'all',search:'',data:fallback};

  function ready(fn){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn();
  }
  function el(tag, className, text){
    var node=document.createElement(tag);
    if(className)node.className=className;
    if(text!==undefined)node.textContent=text;
    return node;
  }
  function label(value){return value==='all'?'Tümü':value;}
  function norm(value){return String(value||'').toLocaleLowerCase('tr-TR');}
  function unique(list){return list.filter(function(item,index){return list.indexOf(item)===index;});}

  function hideLegacy(){
    var main=document.querySelector('main')||document.querySelector('.main')||document.querySelector('.container')||document.querySelector('.content')||document.body;
    if(main!==document.body){
      main.classList.add('ekurs-test-legacy-muted');
      return main.parentNode||document.body;
    }
    return document.body;
  }

  function fetchData(){
    var url='/api/k12-test-center.php?grade='+encodeURIComponent(state.grade)+'&subject='+encodeURIComponent(state.subject);
    return fetch(url,{credentials:'same-origin'}).then(function(resp){
      if(!resp.ok)throw new Error('API unavailable');
      return resp.json();
    }).catch(function(){return fallback;});
  }

  function buildShell(root){
    var existing=document.querySelector('.ekurs-test-center');
    if(existing)existing.remove();

    var app=el('section','ekurs-test-center');
    app.setAttribute('aria-label','Akıllı test merkezi');

    var hero=el('div','ekurs-test-hero');
    var heroCopy=el('div','ekurs-test-hero-copy');
    heroCopy.appendChild(el('p','ekurs-test-eyebrow','K-12 Test Merkezi'));
    heroCopy.appendChild(el('h1','', 'Test çöz, eksiklerini anında gör'));
    heroCopy.appendChild(el('p','ekurs-test-lead','Sınıf, ders, ünite, kazanım ve zorluk seviyesine göre testleri filtrele. Pratik modunda öğren, deneme modunda süre yönetimini güçlendir.'));
    var heroActions=el('div','ekurs-test-hero-actions');
    var aiBtn=el('button','ekurs-test-primary','Sana özel testi başlat');
    aiBtn.type='button';
    aiBtn.addEventListener('click',function(){openRunner(state.data.recommendations[0], 'practice');});
    var challengeBtn=el('button','ekurs-test-secondary','Günün testini aç');
    challengeBtn.type='button';
    challengeBtn.addEventListener('click',function(){openRunner({title:state.data.dailyChallenge.title,skill:state.data.dailyChallenge.description,xp:state.data.dailyChallenge.xp,questionCount:state.data.dailyChallenge.questionCount,outcome:'AI-DAILY'}, 'exam');});
    heroActions.appendChild(aiBtn);
    heroActions.appendChild(challengeBtn);
    heroCopy.appendChild(heroActions);

    var stats=el('div','ekurs-test-stats');
    [
      ['Seri', (state.data.student.streakDays||0)+' gün'],
      ['Bu hafta', (state.data.student.weeklySolved||0)+' test'],
      ['Bugün', (state.data.student.xpToday||0)+' XP']
    ].forEach(function(pair){
      var item=el('div','ekurs-test-stat');
      item.appendChild(el('span','',pair[0]));
      item.appendChild(el('strong','',pair[1]));
      stats.appendChild(item);
    });
    hero.appendChild(heroCopy);
    hero.appendChild(stats);
    app.appendChild(hero);

    var layout=el('div','ekurs-test-layout');
    var side=buildFilters();
    var main=el('div','ekurs-test-main');
    main.appendChild(buildRecommendations());
    main.appendChild(buildCards());
    layout.appendChild(side);
    layout.appendChild(main);
    app.appendChild(layout);

    root.insertBefore(app, root.firstChild);
  }

  function buildFilters(){
    var side=el('aside','ekurs-test-filters');
    side.appendChild(el('h2','', 'Akıllı filtreler'));
    side.appendChild(filterSelect('Sınıf', 'grade', state.data.filters.grades || fallback.filters.grades));
    side.appendChild(filterSelect('Ders', 'subject', state.data.filters.subjects || fallback.filters.subjects));
    side.appendChild(filterSelect('Zorluk', 'difficulty', state.data.filters.difficulties || fallback.filters.difficulties));
    side.appendChild(filterSelect('Durum', 'status', state.data.filters.statuses || fallback.filters.statuses));

    var searchWrap=el('label','ekurs-test-search');
    searchWrap.appendChild(el('span','', 'Kazanım veya konu ara'));
    var search=document.createElement('input');
    search.type='search';
    search.placeholder='Örn: kesirler, üslü sayılar';
    search.value=state.search;
    search.addEventListener('input',function(){state.search=search.value;renderCardsOnly();});
    searchWrap.appendChild(search);
    side.appendChild(searchWrap);

    var note=el('div','ekurs-test-filter-note');
    note.appendChild(el('strong','', 'İki mod'));
    note.appendChild(el('p','', 'Pratik modunda anında ipucu alırsın. Deneme modunda sonuçlar sınav sonunda açılır.'));
    side.appendChild(note);
    return side;
  }

  function filterSelect(title,key,options){
    var wrap=el('label','ekurs-test-select');
    wrap.appendChild(el('span','',title));
    var select=document.createElement('select');
    options.forEach(function(option){
      var item=document.createElement('option');
      item.value=option;
      item.textContent=label(option);
      if(state[key]===option)item.selected=true;
      select.appendChild(item);
    });
    select.addEventListener('change',function(){
      state[key]=select.value;
      if(key==='grade'||key==='subject'){
        fetchData().then(function(data){state.data=data;buildShell(document.body);});
      }else{
        renderCardsOnly();
      }
    });
    wrap.appendChild(select);
    return wrap;
  }

  function buildRecommendations(){
    var wrap=el('section','ekurs-test-recommendations');
    var top=el('div','ekurs-test-section-title');
    top.appendChild(el('div','', 'Sana özel öneriler'));
    top.appendChild(el('span','', 'AI Diagnostic'));
    wrap.appendChild(top);

    var grid=el('div','ekurs-test-reco-grid');
    (state.data.recommendations||fallback.recommendations).forEach(function(item){
      var card=el('article','ekurs-test-reco-card');
      card.appendChild(el('span','ekurs-test-chip',item.label));
      card.appendChild(el('h3','',item.title));
      card.appendChild(el('p','',item.reason));
      var meta=el('div','ekurs-test-reco-meta');
      meta.appendChild(el('span','',item.target));
      var btn=el('button','',item.action));
      btn.type='button';
      btn.addEventListener('click',function(){openRunner(item,'practice');});
      meta.appendChild(btn);
      card.appendChild(meta);
      grid.appendChild(card);
    });

    var daily=el('article','ekurs-test-daily');
    daily.appendChild(el('span','ekurs-test-chip','Günün meydan okuması'));
    daily.appendChild(el('h3','',state.data.dailyChallenge.title));
    daily.appendChild(el('p','',state.data.dailyChallenge.description));
    var dmeta=el('div','ekurs-test-daily-meta');
    dmeta.appendChild(el('span','',state.data.dailyChallenge.questionCount+' soru'));
    dmeta.appendChild(el('span','',state.data.dailyChallenge.xp+' XP'));
    dmeta.appendChild(el('span','',state.data.dailyChallenge.difficulty));
    daily.appendChild(dmeta);
    daily.addEventListener('click',function(){openRunner({title:state.data.dailyChallenge.title,skill:state.data.dailyChallenge.description,xp:state.data.dailyChallenge.xp,questionCount:state.data.dailyChallenge.questionCount,outcome:'AI-DAILY'},'exam');});
    grid.appendChild(daily);
    wrap.appendChild(grid);
    return wrap;
  }

  function getVisibleTests(){
    var tests=(state.data.tests||fallback.tests).slice();
    return tests.filter(function(test){
      var haystack=norm([test.title,test.unit,test.skill,test.outcome,test.subject].join(' '));
      if(state.difficulty!=='all'&&test.difficulty!==state.difficulty)return false;
      if(state.status!=='all'&&test.status!==state.status)return false;
      if(state.search&&haystack.indexOf(norm(state.search))===-1)return false;
      return true;
    });
  }

  function buildCards(){
    var section=el('section','ekurs-test-cards-section');
    var heading=el('div','ekurs-test-section-title');
    heading.appendChild(el('div','', 'Testler'));
    heading.appendChild(el('span','', getVisibleTests().length+' uygun test'));
    section.appendChild(heading);
    var grid=el('div','ekurs-test-card-grid');
    getVisibleTests().forEach(function(test){grid.appendChild(testCard(test));});
    if(!grid.children.length){
      var empty=el('div','ekurs-test-empty','Bu filtrelerde test bulunamadı. Filtreleri genişletmeyi deneyin.');
      grid.appendChild(empty);
    }
    section.appendChild(grid);
    var board=buildLeaderboard();
    section.appendChild(board);
    return section;
  }

  function renderCardsOnly(){
    var old=document.querySelector('.ekurs-test-cards-section');
    if(!old)return;
    old.replaceWith(buildCards());
  }

  function testCard(test){
    var card=el('article','ekurs-test-card');
    card.dataset.status=test.status;
    var status=el('span','ekurs-test-status',test.status);
    card.appendChild(status);
    card.appendChild(el('h3','',test.title));
    card.appendChild(el('p','ekurs-test-skill',test.skill));
    var meta=el('div','ekurs-test-meta');
    [test.grade+'. sınıf', test.subject, test.unit, test.outcome].forEach(function(text){meta.appendChild(el('span','',text));});
    card.appendChild(meta);
    var facts=el('div','ekurs-test-facts');
    facts.appendChild(fact('Süre',test.duration+' dk'));
    facts.appendChild(fact('Soru',test.questionCount));
    facts.appendChild(fact('XP',test.xp));
    facts.appendChild(fact('Zorluk',test.difficulty));
    card.appendChild(facts);
    if(test.accuracy!==null&&test.accuracy!==undefined){
      var progress=el('div','ekurs-test-progress');
      progress.appendChild(el('span','', 'Son başarı: %'+test.accuracy));
      var bar=el('i','');
      bar.style.width=Math.max(5,Math.min(100,test.accuracy))+'%';
      progress.appendChild(bar);
      card.appendChild(progress);
    }
    var actions=el('div','ekurs-test-card-actions');
    var practice=el('button','ekurs-test-card-primary','Pratik modu');
    practice.type='button';
    practice.addEventListener('click',function(){openRunner(test,'practice');});
    var exam=el('button','ekurs-test-card-secondary','Deneme modu');
    exam.type='button';
    exam.addEventListener('click',function(){openRunner(test,'exam');});
    actions.appendChild(practice);
    actions.appendChild(exam);
    card.appendChild(actions);
    card.appendChild(el('small','',test.modeHint||''));
    return card;
  }

  function fact(label,value){
    var box=el('div','ekurs-test-fact');
    box.appendChild(el('span','',label));
    box.appendChild(el('strong','',String(value)));
    return box;
  }

  function buildLeaderboard(){
    var board=el('aside','ekurs-test-leaderboard');
    var head=el('div','ekurs-test-section-title');
    head.appendChild(el('div','', 'Haftalık mini pano'));
    head.appendChild(el('span','', 'Anonim'));
    board.appendChild(head);
    (state.data.leaderboard||fallback.leaderboard).forEach(function(row,index){
      var item=el('div','ekurs-test-rank');
      item.appendChild(el('span','', '#'+(index+1)));
      item.appendChild(el('strong','', row.name));
      item.appendChild(el('em','', row.solved+' test'));
      board.appendChild(item);
    });
    return board;
  }

  function openRunner(test,mode){
    var overlay=el('div','ekurs-test-modal');
    var dialog=el('div','ekurs-test-dialog');
    var close=el('button','ekurs-test-close','Kapat');
    close.type='button';
    close.addEventListener('click',function(){overlay.remove();});
    dialog.appendChild(close);
    dialog.appendChild(el('span','ekurs-test-chip',mode==='practice'?'Pratik modu':'Deneme modu'));
    dialog.appendChild(el('h2','',test.title||'Kişisel test'));
    dialog.appendChild(el('p','',test.skill||test.reason||'Bu test, önceki çalışma verilerine göre önerildi.'));
    var summary=el('div','ekurs-test-runner-summary');
    summary.appendChild(fact('Kazanım',test.outcome||test.target||'AI'));
    summary.appendChild(fact('Soru',test.questionCount||5));
    summary.appendChild(fact('Ödül',test.xp||75+' XP'));
    summary.appendChild(fact('Geri bildirim',mode==='practice'?'Anında':'Sınav sonunda'));
    dialog.appendChild(summary);
    dialog.appendChild(sampleQuestion(mode));
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
  }

  function sampleQuestion(mode){
    var box=el('div','ekurs-test-question');
    box.appendChild(el('h3','', 'Örnek soru'));
    box.appendChild(el('p','', '2^3 + 4 işleminin sonucu kaçtır?'));
    var choices=el('div','ekurs-test-choices');
    ['10','12','16','24'].forEach(function(choice){
      var btn=el('button','',choice);
      btn.type='button';
      btn.addEventListener('click',function(){showFeedback(box,choice==='12',mode);});
      choices.appendChild(btn);
    });
    box.appendChild(choices);
    return box;
  }

  function showFeedback(box,correct,mode){
    var old=box.querySelector('.ekurs-test-feedback');
    if(old)old.remove();
    var feedback=el('div','ekurs-test-feedback '+(correct?'is-correct':'is-wrong'));
    if(mode==='exam'){
      feedback.appendChild(el('strong','', 'Deneme modu'));
      feedback.appendChild(el('p','', 'Cevabın kaydedildi. Doğru/yanlış bilgisi sınav sonunda kazanım karnesinde gösterilir.'));
    }else if(correct){
      feedback.appendChild(el('strong','', 'Doğru.'));
      feedback.appendChild(el('p','', '2^3 ifadesi 8 eder. 8 + 4 = 12. Bu kazanımda ustalık puanın artar.'));
    }else{
      feedback.appendChild(el('strong','', 'Bir adımı birlikte düzeltelim.'));
      feedback.appendChild(el('p','', 'Önce kuvvet hesaplanır: 2^3 = 8. Sonra toplama yapılır: 8 + 4 = 12. İşlem önceliğini atlamış olabilirsin.'));
      var action=el('button','', 'İlgili konu videosuna git');
      action.type='button';
      action.addEventListener('click',function(){location.href='/dersler/matematik?konu=uslu-sayilar';});
      feedback.appendChild(action);
    }
    box.appendChild(feedback);
  }

  ready(function(){
    fetchData().then(function(data){
      state.data=data;
      var root=hideLegacy();
      buildShell(root);
    });
  });
})();
