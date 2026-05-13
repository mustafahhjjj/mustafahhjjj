(function(){
  if(window.__ekursTestCenterLoaded)return;
  window.__ekursTestCenterLoaded=true;
  var path=(location.pathname||'').toLowerCase();
  if(path.indexOf('/testler')===-1 && !/test/i.test(document.title||''))return;

  var state={grade:'8',subject:'matematik',difficulty:'all',status:'all',search:''};
  var data={
    student:{streakDays:5,weeklySolved:34,xpToday:180},
    filters:{grades:['all','1','2','3','4','5','6','7','8','9','10','11','12'],subjects:['all','matematik','türkçe','fen bilimleri'],difficulties:['all','Kolay','Orta','Zorlayıcı'],statuses:['all','Yeni','Yarım Kalan','Tamamlanan']},
    recommendations:[
      {label:'Zayıf nokta giderici',title:'Üslü sayılar tekrar seti',reason:'Kuvvet alma ve işlem önceliği adımlarında tekrar öneriliyor.',target:'M.8.1.1.1',action:'5 soruluk tekrar testi',xp:75,questionCount:5},
      {label:'Ön koşul önerisi',title:'EBOB-EKOK temel bağlantıları',reason:'Problem çözmeden önce çarpan ilişkilerini güçlendirmek iyi olur.',target:'M.8.1.2.1',action:'Kısa pratik başlat',xp:65,questionCount:5}
    ],
    dailyChallenge:{title:'Günün Matematik Meydan Okuması',description:'5 dakikalık, seviyene göre kalibre edilmiş kısa test.',questionCount:5,xp:75,difficulty:'Uyarlanabilir'},
    tests:[
      {id:'t1',title:'Üslü Sayılar Hızlı Teşhis',grade:'8',subject:'matematik',unit:'Sayılar ve İşlemler',outcome:'M.8.1.1.1',skill:'Tam sayıların tam sayı kuvvetlerini hesaplama',difficulty:'Orta',questionCount:12,duration:15,xp:90,status:'Yeni',accuracy:null,modeHint:'Pratik modu önerilir'},
      {id:'t2',title:'Kareköklü İfadeler Kaldığın Yerden',grade:'8',subject:'matematik',unit:'Kareköklü İfadeler',outcome:'M.8.1.3.2',skill:'Kareköklü ifadeleri yaklaşık değerleriyle yorumlama',difficulty:'Zorlayıcı',questionCount:10,duration:14,xp:120,status:'Yarım Kalan',accuracy:54,modeHint:'Pratik modu önerilir'},
      {id:'t3',title:'Çarpanlar ve Katlar Mini Deneme',grade:'8',subject:'matematik',unit:'Çarpanlar ve Katlar',outcome:'M.8.1.2.1',skill:'EBOB ve EKOK problemleri çözme',difficulty:'Orta',questionCount:20,duration:25,xp:150,status:'Tamamlanan',accuracy:82,modeHint:'Deneme modu ile tekrar et'},
      {id:'t4',title:'Paragrafta Ana Düşünce Pratiği',grade:'7',subject:'türkçe',unit:'Anlama',outcome:'T.7.3.17',skill:'Metnin ana fikrini belirleme',difficulty:'Kolay',questionCount:8,duration:10,xp:70,status:'Yeni',accuracy:null,modeHint:'Pratik modu önerilir'},
      {id:'t5',title:'Kuvvet ve Hareket Kazanım Testi',grade:'6',subject:'fen bilimleri',unit:'Kuvvet ve Hareket',outcome:'F.6.3.1.2',skill:'Bileşke kuvveti yorumlama',difficulty:'Orta',questionCount:15,duration:18,xp:110,status:'Yeni',accuracy:null,modeHint:'Deneme modu uygun'}
    ],
    leaderboard:[{name:'8A-042',solved:48},{name:'8B-117',solved:42},{name:'8C-089',solved:39}]
  };
  var katexLoading=false;

  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();}
  function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
  function norm(v){return String(v||'').toLocaleLowerCase('tr-TR');}
  function label(v){return v==='all'?'Tümü':v;}
  function button(text,cls,fn){var b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}

  function loadKaTeX(){
    if(window.katex||katexLoading)return;
    katexLoading=true;
    if(!document.querySelector('link[href*="katex.min.css"]')){
      var link=document.createElement('link');link.rel='stylesheet';link.href='https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css';document.head.appendChild(link);
    }
    var script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js';script.defer=true;script.onload=function(){renderMath(document);};document.head.appendChild(script);
  }
  function renderMath(root){
    if(!window.katex)return;
    (root||document).querySelectorAll('[data-ekurs-math]').forEach(function(node){
      if(node.dataset.rendered==='1')return;
      var source=node.getAttribute('data-ekurs-math')||node.textContent;
      try{window.katex.render(source,node,{throwOnError:false,displayMode:false});node.dataset.rendered='1';}catch(e){}
    });
  }

  function load(){
    loadKaTeX();
    fetch('/api/k12-test-center.php?grade='+encodeURIComponent(state.grade)+'&subject='+encodeURIComponent(state.subject),{credentials:'same-origin'})
      .then(function(r){if(!r.ok)throw new Error('api');return r.json();})
      .then(function(json){data=json;render();})
      .catch(render);
  }

  function render(){
    var old=document.querySelector('.ekurs-test-center');if(old)old.remove();
    var main=document.querySelector('main')||document.querySelector('.main')||document.querySelector('.container')||document.querySelector('.content');
    if(main)main.classList.add('ekurs-test-legacy-muted');
    var app=el('section','ekurs-test-center');app.setAttribute('aria-label','Akıllı test merkezi');
    app.appendChild(hero());
    var layout=el('div','ekurs-test-layout');layout.appendChild(filters());
    var content=el('div','ekurs-test-main');content.appendChild(recommendations());content.appendChild(cardsSection());
    layout.appendChild(content);app.appendChild(layout);document.body.insertBefore(app,document.body.firstChild);
  }

  function hero(){
    var h=el('div','ekurs-test-hero'),copy=el('div','ekurs-test-hero-copy');
    copy.appendChild(el('p','ekurs-test-eyebrow','K-12 Test Merkezi'));
    copy.appendChild(el('h1','', 'Test çöz, eksiklerini anında gör'));
    copy.appendChild(el('p','ekurs-test-lead','Sınıf, ders, ünite, kazanım ve zorluk seviyesine göre testleri filtrele. Pratik modunda öğren, deneme modunda süre yönetimini güçlendir.'));
    var actions=el('div','ekurs-test-hero-actions');
    actions.appendChild(button('Sana özel testi başlat','ekurs-test-primary',function(){openRunner((data.recommendations||[])[0]||data.tests[0],'practice');}));
    actions.appendChild(button('Günün testini aç','ekurs-test-secondary',function(){openRunner({title:data.dailyChallenge.title,skill:data.dailyChallenge.description,outcome:'AI-DAILY',questionCount:data.dailyChallenge.questionCount,xp:data.dailyChallenge.xp},'practice');}));
    copy.appendChild(actions);
    var stats=el('div','ekurs-test-stats');
    [['Seri',(data.student.streakDays||0)+' gün'],['Bu hafta',(data.student.weeklySolved||0)+' test'],['Bugün',(data.student.xpToday||0)+' XP']].forEach(function(x){var i=el('div','ekurs-test-stat');i.appendChild(el('span','',x[0]));i.appendChild(el('strong','',x[1]));stats.appendChild(i);});
    h.appendChild(copy);h.appendChild(stats);return h;
  }

  function filters(){
    var side=el('aside','ekurs-test-filters');side.appendChild(el('h2','', 'Akıllı filtreler'));
    side.appendChild(select('Sınıf','grade',data.filters.grades));side.appendChild(select('Ders','subject',data.filters.subjects));side.appendChild(select('Zorluk','difficulty',data.filters.difficulties));side.appendChild(select('Durum','status',data.filters.statuses));
    var search=el('label','ekurs-test-search');search.appendChild(el('span','', 'Kazanım veya konu ara'));
    var input=document.createElement('input');input.type='search';input.placeholder='Örn: kesirler, üslü sayılar';input.value=state.search;input.addEventListener('input',function(){state.search=input.value;refreshCards();});search.appendChild(input);side.appendChild(search);
    var note=el('div','ekurs-test-filter-note');note.appendChild(el('strong','', 'İki mod'));note.appendChild(el('p','', 'Pratik modunda anında ipucu alırsın. Deneme modunda süre ve odak yönetimi öne çıkar.'));side.appendChild(note);
    return side;
  }
  function select(title,key,items){
    var wrap=el('label','ekurs-test-select');wrap.appendChild(el('span','',title));var s=document.createElement('select');
    (items||[]).forEach(function(v){var o=document.createElement('option');o.value=v;o.textContent=label(v);o.selected=state[key]===v;s.appendChild(o);});
    s.addEventListener('change',function(){state[key]=s.value;(key==='grade'||key==='subject')?load():refreshCards();});wrap.appendChild(s);return wrap;
  }

  function recommendations(){
    var wrap=el('section','ekurs-test-recommendations');wrap.appendChild(sectionTitle('Sana özel öneriler','AI Diagnostic'));
    var grid=el('div','ekurs-test-reco-grid');
    (data.recommendations||[]).forEach(function(r){var c=el('article','ekurs-test-reco-card');c.appendChild(el('span','ekurs-test-chip',r.label));c.appendChild(el('h3','',r.title));c.appendChild(el('p','',r.reason));var m=el('div','ekurs-test-reco-meta');m.appendChild(el('span','',r.target));m.appendChild(button(r.action,'',function(){openRunner(r,'practice');}));c.appendChild(m);grid.appendChild(c);});
    var d=el('article','ekurs-test-daily');d.appendChild(el('span','ekurs-test-chip','Günün meydan okuması'));d.appendChild(el('h3','',data.dailyChallenge.title));d.appendChild(el('p','',data.dailyChallenge.description));var dm=el('div','ekurs-test-daily-meta');[data.dailyChallenge.questionCount+' soru',data.dailyChallenge.xp+' XP',data.dailyChallenge.difficulty].forEach(function(t){dm.appendChild(el('span','',t));});d.appendChild(dm);d.addEventListener('click',function(){openRunner({title:data.dailyChallenge.title,skill:data.dailyChallenge.description,outcome:'AI-DAILY',questionCount:data.dailyChallenge.questionCount,xp:data.dailyChallenge.xp},'practice');});grid.appendChild(d);
    wrap.appendChild(grid);return wrap;
  }
  function visibleTests(){return (data.tests||[]).filter(function(t){var text=norm([t.title,t.subject,t.unit,t.skill,t.outcome].join(' '));return (state.difficulty==='all'||t.difficulty===state.difficulty)&&(state.status==='all'||t.status===state.status)&&(!state.search||text.indexOf(norm(state.search))>-1);});}
  function cardsSection(){var s=el('section','ekurs-test-cards-section');s.appendChild(sectionTitle('Testler',visibleTests().length+' uygun test'));var grid=el('div','ekurs-test-card-grid');visibleTests().forEach(function(t){grid.appendChild(testCard(t));});if(!grid.children.length)grid.appendChild(el('div','ekurs-test-empty','Bu filtrelerde test bulunamadı. Filtreleri genişletmeyi deneyin.'));s.appendChild(grid);s.appendChild(leaderboard());return s;}
  function refreshCards(){var old=document.querySelector('.ekurs-test-cards-section');if(old)old.replaceWith(cardsSection());}
  function testCard(t){
    var c=el('article','ekurs-test-card');c.dataset.status=t.status;c.appendChild(el('span','ekurs-test-status',t.status));c.appendChild(el('h3','',t.title));c.appendChild(el('p','ekurs-test-skill',t.skill));
    var meta=el('div','ekurs-test-meta');[t.grade+'. sınıf',t.subject,t.unit,t.outcome].forEach(function(x){meta.appendChild(el('span','',x));});c.appendChild(meta);
    var facts=el('div','ekurs-test-facts');[['Süre',t.duration+' dk'],['Soru',t.questionCount],['XP',t.xp],['Zorluk',t.difficulty]].forEach(function(x){facts.appendChild(fact(x[0],x[1]));});c.appendChild(facts);
    if(t.accuracy!==null&&t.accuracy!==undefined){var p=el('div','ekurs-test-progress');p.appendChild(el('span','', 'Son başarı: %'+t.accuracy));var i=el('i','');i.style.width=Math.max(5,Math.min(100,t.accuracy))+'%';p.appendChild(i);c.appendChild(p);}
    var a=el('div','ekurs-test-card-actions');a.appendChild(button('Pratik modu','ekurs-test-card-primary',function(){openRunner(t,'practice');}));a.appendChild(button('Deneme modu','ekurs-test-card-secondary',function(){openRunner(t,'exam');}));c.appendChild(a);c.appendChild(el('small','',t.modeHint||''));return c;
  }
  function leaderboard(){var b=el('aside','ekurs-test-leaderboard');b.appendChild(sectionTitle('Haftalık mini pano','Anonim'));(data.leaderboard||[]).forEach(function(r,i){var item=el('div','ekurs-test-rank');item.appendChild(el('span','', '#'+(i+1)));item.appendChild(el('strong','',r.name));item.appendChild(el('em','',r.solved+' test'));b.appendChild(item);});return b;}
  function sectionTitle(a,b){var t=el('div','ekurs-test-section-title');t.appendChild(el('div','',a));t.appendChild(el('span','',b));return t;}
  function fact(k,v){var f=el('div','ekurs-test-fact');f.appendChild(el('span','',k));f.appendChild(el('strong','',String(v)));return f;}

  function buildQuestions(test){
    var base=[
      {type:'choice',outcome:'M.8.1.1.1',topic:'Üslü Sayılar',prompt:'2^3 + 4',text:'işleminin sonucu kaçtır?',choices:['10','12','16','24'],answer:'12',rule:'Önce üs hesaplanır, sonra toplama yapılır.',steps:['2^3 = 8','8 + 4 = 12'],visual:'Üslü ifade, aynı sayının tekrarlı çarpımıdır.',video:'/dersler/matematik?konu=uslu-sayilar'},
      {type:'fill',outcome:'M.8.1.3.2',topic:'Kareköklü İfadeler',prompt:'\u221a49 + 3',text:'işleminin sonucunu yaz.',answer:'10',rule:'Karekök, hangi sayının karesinin verilen sayıyı oluşturduğunu bulur.',steps:['\u221a49 = 7','7 + 3 = 10'],visual:'Tam kare sayıları önce tanı, sonra işlemi tamamla.',video:'/dersler/matematik?konu=karekoklu-ifadeler'},
      {type:'match',outcome:'M.8.1.2.1',topic:'Çarpanlar ve Katlar',prompt:'Terimleri eşleştir',text:'Her kavramı doğru açıklamayla eşleştir.',pairs:[['EBOB','Ortak bölenlerin en büyüğü'],['EKOK','Ortak katların en küçüğü'],['Asal sayı','Sadece 1 ve kendisine bölünen sayı']],rule:'EBOB ortak bölenlere, EKOK ortak katlara bakar.',steps:['Kavramı oku','Bölen mi kat mı aradığını belirle','En büyük/en küçük ifadesini kontrol et'],visual:'EBOB ve EKOK ters yönlü iki merdiven gibidir.',video:'/dersler/matematik?konu=carpanlar-katlar'},
      {type:'order',outcome:'M.8.1.1.2',topic:'İşlem Önceliği',prompt:'Çözüm adımlarını sırala',text:'Doğru sırayı oluştur.',items:['Üslü ifadeyi hesapla','Parantez varsa önce onu çöz','Çarpma/bölme işlemlerini yap','Toplama/çıkarma ile bitir'],answer:['Parantez varsa önce onu çöz','Üslü ifadeyi hesapla','Çarpma/bölme işlemlerini yap','Toplama/çıkarma ile bitir'],rule:'İşlem önceliği parantez, üs, çarpma-bölme, toplama-çıkarma şeklindedir.',steps:['Parantez','Üs','Çarpma/Bölme','Toplama/Çıkarma'],visual:'Sıra hatası sonucu tamamen değiştirebilir.',video:'/dersler/matematik?konu=islem-onceligi'},
      {type:'mark',outcome:'M.8.3.1.1',topic:'Geometri',prompt:'Görsel üzerinde işaretle',text:'Dik açıyı temsil eden bölgeyi seç.',choices:['A: 45 derece','B: 90 derece','C: 120 derece'],answer:'B: 90 derece',rule:'Dik açı 90 derecedir.',steps:['Açı kollarını kontrol et','Köşe kare işaretliyse 90 derecedir'],visual:'Dik açı günlük hayatta masa köşesi gibi görünür.',video:'/dersler/matematik?konu=acilar'}
    ];
    var count=Math.max(5,Math.min(Number(test.questionCount)||5,8));
    var out=[];
    for(var i=0;i<count;i++)out.push(base[i%base.length]);
    return out;
  }

  function openRunner(test,mode){
    loadKaTeX();
    var session={test:test,mode:mode,questions:buildQuestions(test),index:0,score:20,solved:0,correct:0,start:Date.now(),locked:false,misses:[],hits:[],done:false};
    var overlay=el('div','ekurs-test-modal ekurs-test-runner-theme is-blue');
    var dialog=el('div','ekurs-test-dialog ekurs-test-runner-dialog');
    overlay.appendChild(dialog);document.body.appendChild(overlay);
    function tick(){var timer=dialog.querySelector('[data-ekurs-timer]');if(timer)timer.textContent=formatTime(Date.now()-session.start);}
    var interval=setInterval(tick,1000);
    function close(){clearInterval(interval);overlay.remove();}
    function rerender(){renderRunner(dialog,session,close);updateRunnerTheme(overlay,session.score);tick();renderMath(dialog);}
    dialog.__nextQuestion=function(){if(session.index<session.questions.length-1){session.index++;session.locked=false;session.feedback=null;rerender();}else{finish();}};
    function finish(){session.done=true;session.score=Math.max(session.score,session.correct===session.solved?100:session.score);rerender();if(session.score>=100){saveMastery(session.test);celebrate(overlay,session.test);}}
    dialog.__answer=function(choice){handleAnswer(dialog,overlay,session,choice,rerender);};
    rerender();
  }

  function renderRunner(root,session,close){
    root.innerHTML='';
    root.appendChild(button('Kapat','ekurs-test-close',close));
    if(session.done){root.appendChild(resultsPanel(session));return;}
    var header=el('div','ekurs-test-runner-head');
    header.appendChild(el('span','ekurs-test-chip',session.mode==='practice'?'Anlık geri bildirim':'Odak modu'));
    header.appendChild(el('h2','',session.test.title||'Kişisel test'));
    header.appendChild(el('p','',session.test.skill||session.test.reason||'Bu test, önceki çalışma verilerine göre önerildi.'));
    root.appendChild(header);
    var layout=el('div','ekurs-test-runner-grid');
    layout.appendChild(questionPanel(session));
    layout.appendChild(scorePanel(session));
    root.appendChild(layout);
  }
  function questionPanel(session){
    var q=session.questions[session.index];
    var panel=el('section','ekurs-test-question ekurs-test-live-question');
    panel.appendChild(el('span','ekurs-test-question-count','Soru '+(session.index+1)+' / '+session.questions.length+' · '+typeLabel(q.type)));
    var prompt=el('div','ekurs-test-math-prompt');
    var math=el('span','ekurs-test-math');math.setAttribute('data-ekurs-math',q.prompt);math.textContent=q.prompt;prompt.appendChild(math);prompt.appendChild(el('span','', ' '+q.text));panel.appendChild(prompt);
    panel.appendChild(renderInteraction(q));
    if(session.feedback)panel.appendChild(feedbackPanel(session));
    return panel;
  }
  function renderInteraction(q){
    if(q.type==='fill')return fillInteraction(q);
    if(q.type==='match')return matchInteraction(q);
    if(q.type==='order')return orderInteraction(q);
    if(q.type==='mark')return markInteraction(q);
    var choices=el('div','ekurs-test-choices');
    q.choices.forEach(function(choice){choices.appendChild(button(choice,'',function(){answerFrom(choices,choice);}));});
    return choices;
  }
  function fillInteraction(q){
    var wrap=el('div','ekurs-test-fill');
    var input=document.createElement('input');input.type='text';input.inputMode='numeric';input.placeholder='Cevabını yaz';
    wrap.appendChild(input);wrap.appendChild(button('Kontrol et','ekurs-test-next',function(){answerFrom(wrap,input.value.trim());}));return wrap;
  }
  function matchInteraction(q){
    var wrap=el('div','ekurs-test-match');
    var options=q.pairs.map(function(p){return p[1];}).sort();
    q.pairs.forEach(function(pair){var row=el('label','ekurs-test-match-row');row.appendChild(el('strong','',pair[0]));var s=document.createElement('select');s.appendChild(new Option('Açıklama seç',''));options.forEach(function(o){s.appendChild(new Option(o,o));});row.appendChild(s);wrap.appendChild(row);});
    wrap.appendChild(button('Eşleştirmeyi kontrol et','ekurs-test-next',function(){var values=[].slice.call(wrap.querySelectorAll('select')).map(function(s){return s.value;});answerFrom(wrap,values);}));return wrap;
  }
  function orderInteraction(q){
    var wrap=el('div','ekurs-test-order');
    q.items.forEach(function(item){var chip=el('button','ekurs-test-order-chip',item);chip.type='button';chip.draggable=true;chip.addEventListener('click',function(){wrap.insertBefore(chip,wrap.firstChild);});chip.addEventListener('dragstart',function(e){e.dataTransfer.setData('text/plain',item);chip.classList.add('is-dragging');});chip.addEventListener('dragend',function(){chip.classList.remove('is-dragging');});chip.addEventListener('dragover',function(e){e.preventDefault();});chip.addEventListener('drop',function(e){e.preventDefault();var dragging=wrap.querySelector('.is-dragging');if(dragging&&dragging!==chip)wrap.insertBefore(dragging,chip);});wrap.appendChild(chip);});
    wrap.appendChild(button('Sıralamayı kontrol et','ekurs-test-next',function(){var values=[].slice.call(wrap.querySelectorAll('.ekurs-test-order-chip')).map(function(x){return x.textContent;});answerFrom(wrap,values);}));return wrap;
  }
  function markInteraction(q){
    var wrap=el('div','ekurs-test-mark');var canvas=el('div','ekurs-angle-board');canvas.appendChild(el('span','angle-a','A'));canvas.appendChild(el('span','angle-b','B'));canvas.appendChild(el('span','angle-c','C'));wrap.appendChild(canvas);
    var choices=el('div','ekurs-test-choices');q.choices.forEach(function(choice){choices.appendChild(button(choice,'',function(){answerFrom(wrap,choice);}));});wrap.appendChild(choices);return wrap;
  }
  function answerFrom(node,payload){var dialog=node.closest('.ekurs-test-dialog');if(dialog&&dialog.__answer)dialog.__answer(payload);}
  function typeLabel(type){return {choice:'Çoktan seçmeli',fill:'Boşluk doldurma',match:'Eşleştirme',order:'Sıralama',mark:'Görsel işaretleme'}[type]||'Soru';}
  function isCorrect(q,payload){
    if(q.type==='match')return q.pairs.every(function(pair,i){return payload[i]===pair[1];});
    if(q.type==='order')return q.answer.every(function(item,i){return payload[i]===item;});
    return norm(payload).replace(',','.')===norm(q.answer).replace(',','.');
  }
  function scorePanel(session){
    var p=el('aside','ekurs-test-smart-panel');
    p.appendChild(el('span','ekurs-test-chip',session.score>=90?'Challenge Zone':session.score>=70?'Güçleniyor':'Sakin başlangıç'));
    var ring=el('div','ekurs-test-score-ring');ring.style.setProperty('--score',session.score);ring.appendChild(el('strong','',String(session.score)));ring.appendChild(el('span','', 'SmartScore'));p.appendChild(ring);
    p.appendChild(fact('Çözülen',session.solved+' soru'));p.appendChild(fact('Doğru',session.correct+' cevap'));p.appendChild(fact('Süre',''));p.lastChild.querySelector('strong').setAttribute('data-ekurs-timer','1');
    p.appendChild(el('p','ekurs-test-zone-copy',session.score>=90?'Final bölgesindesin. Sorular biraz daha dikkat istiyor.':session.score>=70?'Ritmi yakaladın. Birkaç doğru cevap seni final bölgesine taşır.':'Rahat başla. Her soru sana yol gösterecek.'));
    return p;
  }
  function feedbackPanel(session){
    var q=session.questions[session.index],f=session.feedback,box=el('div','ekurs-test-feedback '+(f.correct?'is-correct':'is-wrong'));
    if(f.correct){box.appendChild(el('strong','', 'Doğru. SmartScore yükseldi.'));box.appendChild(el('p','', q.steps.join(' → ')));}
    else{box.appendChild(el('strong','', 'Burada küçük bir adımı güçlendirelim.'));box.appendChild(el('p','', q.rule));var steps=el('ol','ekurs-test-steps');q.steps.forEach(function(s){steps.appendChild(el('li','',s));});box.appendChild(steps);box.appendChild(el('div','ekurs-test-visual-hint',q.visual));}
    box.appendChild(button(f.correct?'Sonraki soru':'Anladım, sıradaki soruya geç','ekurs-test-next',function(){var d=box.closest('.ekurs-test-dialog');if(d&&d.__nextQuestion)d.__nextQuestion();}));
    return box;
  }
  function handleAnswer(dialog,overlay,session,payload,rerender){
    if(session.locked)return;
    var q=session.questions[session.index],correct=isCorrect(q,payload);session.locked=true;session.solved++;
    if(correct){session.correct++;session.hits.push(q);session.score=Math.min(100,session.score+(session.score>=90?4:session.score>=70?7:10));miniConfetti(overlay);}else{session.misses.push(q);session.score=Math.max(0,session.score-(session.score>=90?12:7));}
    session.feedback={correct:correct,payload:payload};rerender();
    if(correct&&session.score>=100){saveMastery(session.test);celebrate(overlay,session.test);}
  }
  function resultsPanel(session){
    var wrap=el('section','ekurs-test-results');
    wrap.appendChild(el('span','ekurs-test-chip',session.score>=90?'Ustalık bölgesi':'Kazanım karnesi'));
    wrap.appendChild(el('h2','', 'Test tamamlandı'));
    wrap.appendChild(el('p','', 'Puan yerine hangi kazanımların güçlendiğini ve nerede tekrar gerektiğini gösteriyoruz.'));
    var summary=el('div','ekurs-test-result-summary');summary.appendChild(fact('SmartScore',session.score));summary.appendChild(fact('Doğru',session.correct+' / '+session.solved));summary.appendChild(fact('Süre',formatTime(Date.now()-session.start)));wrap.appendChild(summary);
    var chart=el('div','ekurs-test-report-chart');
    aggregate(session).forEach(function(row){var line=el('div','ekurs-report-row');line.appendChild(el('span','',row.topic));var bar=el('i','');bar.style.width=Math.max(12,row.rate)+'%';line.appendChild(bar);line.appendChild(el('strong','',row.rate+'%'));chart.appendChild(line);});wrap.appendChild(chart);
    var actions=el('div','ekurs-test-remediation-list');
    var misses=uniqueQuestions(session.misses);
    if(!misses.length){actions.appendChild(el('div','ekurs-test-visual-hint','Harika. Bu sette tekrar gerektiren kazanım görünmüyor.'));}
    misses.forEach(function(q){var card=el('article','ekurs-remediation-card');card.appendChild(el('strong','',q.topic));card.appendChild(el('p','',q.rule));card.appendChild(button('Konu eksiğin olabilir, şimdi izle','ekurs-test-next',function(){location.href=q.video||'/dersler/matematik';}));actions.appendChild(card);});
    wrap.appendChild(actions);
    return wrap;
  }
  function aggregate(session){var map={};session.questions.forEach(function(q){map[q.topic]=map[q.topic]||{topic:q.topic,total:0,hit:0};map[q.topic].total++;});session.hits.forEach(function(q){if(map[q.topic])map[q.topic].hit++;});return Object.keys(map).map(function(k){var row=map[k];row.rate=Math.round(row.hit/row.total*100);return row;});}
  function uniqueQuestions(list){var seen={};return list.filter(function(q){if(seen[q.topic])return false;seen[q.topic]=true;return true;});}
  function updateRunnerTheme(overlay,score){overlay.classList.remove('is-blue','is-green','is-gold');overlay.classList.add(score>=90?'is-gold':score>=70?'is-green':'is-blue');}
  function formatTime(ms){var s=Math.floor(ms/1000),m=Math.floor(s/60);return String(m).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function miniConfetti(root){for(var i=0;i<10;i++){var c=el('i','ekurs-mini-confetti');c.style.left=(20+Math.random()*60)+'%';c.style.setProperty('--x',(Math.random()*120-60)+'px');c.style.background=['#22c55e','#3b82f6','#facc15','#fb7185'][i%4];root.appendChild(c);setTimeout(function(node){node.remove();},900,c);}}
  function celebrate(root,test){var done=el('div','ekurs-mastery-celebration');done.appendChild(el('strong','', 'Ustalık kazanıldı'));done.appendChild(el('p','', (test.title||'Bu kazanım')+' için altın madalya açıldı.'));root.appendChild(done);setTimeout(function(){done.remove();},3200);}
  function saveMastery(test){
    try{localStorage.setItem('ekurs-mastery-'+(test.outcome||test.target||test.id),'1');}catch(e){}
    fetch('/api/k12-test-center.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'mastery',outcome:test.outcome||test.target||test.id,score:100})}).catch(function(){});
  }

  ready(load);
})();
