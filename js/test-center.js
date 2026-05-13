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

  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();}
  function el(tag,cls,text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
  function norm(v){return String(v||'').toLocaleLowerCase('tr-TR');}
  function label(v){return v==='all'?'Tümü':v;}

  function load(){
    fetch('/api/k12-test-center.php?grade='+encodeURIComponent(state.grade)+'&subject='+encodeURIComponent(state.subject),{credentials:'same-origin'})
      .then(function(r){if(!r.ok)throw new Error('api');return r.json();})
      .then(function(json){data=json;render();})
      .catch(render);
  }

  function render(){
    var old=document.querySelector('.ekurs-test-center');
    if(old)old.remove();
    var main=document.querySelector('main')||document.querySelector('.main')||document.querySelector('.container')||document.querySelector('.content');
    if(main)main.classList.add('ekurs-test-legacy-muted');

    var app=el('section','ekurs-test-center');
    app.setAttribute('aria-label','Akıllı test merkezi');
    app.appendChild(hero());
    var layout=el('div','ekurs-test-layout');
    layout.appendChild(filters());
    var content=el('div','ekurs-test-main');
    content.appendChild(recommendations());
    content.appendChild(cardsSection());
    layout.appendChild(content);
    app.appendChild(layout);
    (document.body).insertBefore(app,document.body.firstChild);
  }

  function hero(){
    var h=el('div','ekurs-test-hero');
    var copy=el('div','ekurs-test-hero-copy');
    copy.appendChild(el('p','ekurs-test-eyebrow','K-12 Test Merkezi'));
    copy.appendChild(el('h1','', 'Test çöz, eksiklerini anında gör'));
    copy.appendChild(el('p','ekurs-test-lead','Sınıf, ders, ünite, kazanım ve zorluk seviyesine göre testleri filtrele. Pratik modunda öğren, deneme modunda süre yönetimini güçlendir.'));
    var actions=el('div','ekurs-test-hero-actions');
    var ai=button('Sana özel testi başlat','ekurs-test-primary',function(){openRunner((data.recommendations||[])[0]||data.tests[0],'practice');});
    var daily=button('Günün testini aç','ekurs-test-secondary',function(){openRunner({title:data.dailyChallenge.title,skill:data.dailyChallenge.description,outcome:'AI-DAILY',questionCount:data.dailyChallenge.questionCount,xp:data.dailyChallenge.xp},'exam');});
    actions.appendChild(ai);actions.appendChild(daily);copy.appendChild(actions);
    var stats=el('div','ekurs-test-stats');
    [['Seri',(data.student.streakDays||0)+' gün'],['Bu hafta',(data.student.weeklySolved||0)+' test'],['Bugün',(data.student.xpToday||0)+' XP']].forEach(function(x){var i=el('div','ekurs-test-stat');i.appendChild(el('span','',x[0]));i.appendChild(el('strong','',x[1]));stats.appendChild(i);});
    h.appendChild(copy);h.appendChild(stats);return h;
  }

  function filters(){
    var side=el('aside','ekurs-test-filters');
    side.appendChild(el('h2','', 'Akıllı filtreler'));
    side.appendChild(select('Sınıf','grade',data.filters.grades));
    side.appendChild(select('Ders','subject',data.filters.subjects));
    side.appendChild(select('Zorluk','difficulty',data.filters.difficulties));
    side.appendChild(select('Durum','status',data.filters.statuses));
    var search=el('label','ekurs-test-search');search.appendChild(el('span','', 'Kazanım veya konu ara'));
    var input=document.createElement('input');input.type='search';input.placeholder='Örn: kesirler, üslü sayılar';input.value=state.search;input.addEventListener('input',function(){state.search=input.value;refreshCards();});search.appendChild(input);side.appendChild(search);
    var note=el('div','ekurs-test-filter-note');note.appendChild(el('strong','', 'İki mod'));note.appendChild(el('p','', 'Pratik modunda anında ipucu alırsın. Deneme modunda sonuçlar sınav sonunda açılır.'));side.appendChild(note);
    return side;
  }

  function select(title,key,items){
    var wrap=el('label','ekurs-test-select');wrap.appendChild(el('span','',title));
    var s=document.createElement('select');(items||[]).forEach(function(v){var o=document.createElement('option');o.value=v;o.textContent=label(v);o.selected=state[key]===v;s.appendChild(o);});
    s.addEventListener('change',function(){state[key]=s.value;(key==='grade'||key==='subject')?load():refreshCards();});wrap.appendChild(s);return wrap;
  }

  function recommendations(){
    var wrap=el('section','ekurs-test-recommendations');wrap.appendChild(sectionTitle('Sana özel öneriler','AI Diagnostic'));
    var grid=el('div','ekurs-test-reco-grid');
    (data.recommendations||[]).forEach(function(r){var c=el('article','ekurs-test-reco-card');c.appendChild(el('span','ekurs-test-chip',r.label));c.appendChild(el('h3','',r.title));c.appendChild(el('p','',r.reason));var m=el('div','ekurs-test-reco-meta');m.appendChild(el('span','',r.target));m.appendChild(button(r.action,'',function(){openRunner(r,'practice');}));c.appendChild(m);grid.appendChild(c);});
    var d=el('article','ekurs-test-daily');d.appendChild(el('span','ekurs-test-chip','Günün meydan okuması'));d.appendChild(el('h3','',data.dailyChallenge.title));d.appendChild(el('p','',data.dailyChallenge.description));var dm=el('div','ekurs-test-daily-meta');[data.dailyChallenge.questionCount+' soru',data.dailyChallenge.xp+' XP',data.dailyChallenge.difficulty].forEach(function(t){dm.appendChild(el('span','',t));});d.appendChild(dm);d.addEventListener('click',function(){openRunner({title:data.dailyChallenge.title,skill:data.dailyChallenge.description,outcome:'AI-DAILY',questionCount:data.dailyChallenge.questionCount,xp:data.dailyChallenge.xp},'exam');});grid.appendChild(d);
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
  function button(text,cls,fn){var b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}

  function openRunner(test,mode){
    var o=el('div','ekurs-test-modal'),d=el('div','ekurs-test-dialog');d.appendChild(button('Kapat','ekurs-test-close',function(){o.remove();}));d.appendChild(el('span','ekurs-test-chip',mode==='practice'?'Pratik modu':'Deneme modu'));d.appendChild(el('h2','',test.title||'Kişisel test'));d.appendChild(el('p','',test.skill||test.reason||'Bu test, önceki çalışma verilerine göre önerildi.'));
    var sum=el('div','ekurs-test-runner-summary');[['Kazanım',test.outcome||test.target||'AI'],['Soru',test.questionCount||5],['Ödül',(test.xp||75)+' XP'],['Geri bildirim',mode==='practice'?'Anında':'Sınav sonunda']].forEach(function(x){sum.appendChild(fact(x[0],x[1]));});d.appendChild(sum);d.appendChild(question(mode));o.appendChild(d);document.body.appendChild(o);
  }
  function question(mode){var q=el('div','ekurs-test-question');q.appendChild(el('h3','', 'Örnek soru'));q.appendChild(el('p','', '2^3 + 4 işleminin sonucu kaçtır?'));var choices=el('div','ekurs-test-choices');['10','12','16','24'].forEach(function(x){choices.appendChild(button(x,'',function(){feedback(q,x==='12',mode);}));});q.appendChild(choices);return q;}
  function feedback(q,ok,mode){var old=q.querySelector('.ekurs-test-feedback');if(old)old.remove();var f=el('div','ekurs-test-feedback '+(ok?'is-correct':'is-wrong'));if(mode==='exam'){f.appendChild(el('strong','', 'Deneme modu'));f.appendChild(el('p','', 'Cevabın kaydedildi. Doğru/yanlış bilgisi sınav sonunda kazanım karnesinde gösterilir.'));}else if(ok){f.appendChild(el('strong','', 'Doğru.'));f.appendChild(el('p','', '2^3 ifadesi 8 eder. 8 + 4 = 12. Bu kazanımda ustalık puanın artar.'));}else{f.appendChild(el('strong','', 'Bir adımı birlikte düzeltelim.'));f.appendChild(el('p','', 'Önce kuvvet hesaplanır: 2^3 = 8. Sonra toplama yapılır: 8 + 4 = 12. İşlem önceliğini atlamış olabilirsin.'));f.appendChild(button('İlgili konu videosuna git','',function(){location.href='/dersler/matematik?konu=uslu-sayilar';}));}q.appendChild(f);}

  ready(load);
})();
