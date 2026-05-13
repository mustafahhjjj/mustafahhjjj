(function(){
  if(window.__ekursWorldClassMathLoaded)return;
  window.__ekursWorldClassMathLoaded=true;

  var outcomes=[
    {code:'M.2.1.1',name:"10'un katlarını toplama",score:96,unit:'Toplama İşlemi'},
    {code:'M.2.1.2',name:'İki basamaklı eldesiz toplama',score:82,unit:'Toplama İşlemi'},
    {code:'M.2.1.3',name:'İki basamaklı eldeli toplama',score:67,unit:'Toplama İşlemi'},
    {code:'M.2.1.4',name:'Üç terimli toplama',score:48,unit:'Toplama İşlemi'},
    {code:'M.2.1.5',name:'Toplama problemleri',score:58,unit:'Toplama İşlemi'}
  ];

  function isMath(){
    return /\/dersler\/matematik/.test(location.pathname.toLowerCase())||/matematik/i.test((document.querySelector('h1')||{}).textContent||'');
  }

  function medal(score){
    if(score>=100)return '🥇';
    if(score>=90)return '🏅';
    return '';
  }

  function buildOutcomeMap(){
    if(document.querySelector('.outcome-map'))return;
    var host=document.querySelector('.math-curriculum-main')||document.querySelector('main .section .container');
    if(!host)return;
    var map=document.createElement('section');
    map.className='outcome-map';
    map.innerHTML=[
      '<header><span>Ünite > Alt Başlık > Mikro-Kazanım</span><h2>Atomik kazanım haritası</h2><p>Kodun üzerine gel, örnek soru ve zorluk/popülerlik skorunu gör.</p></header>',
      '<div class="outcome-tree">',
        '<article class="outcome-unit"><b>M.2.1</b><strong>Sayılar ve İşlemler</strong></article>',
        '<article class="outcome-subtopic"><b>M.2.1.A</b><strong>Toplama İşlemi</strong></article>',
        outcomes.map(function(item){
          return '<button class="outcome-node" type="button" data-code="'+item.code+'" data-score="'+item.score+'">'+
            '<b>'+item.code+'</b><span>'+item.name+'</span><i>'+item.score+'</i><em>'+medal(item.score)+'</em>'+
          '</button>';
        }).join(''),
      '</div>',
      '<div class="outcome-tooltip" role="status" aria-live="polite"></div>'
    ].join('');
    host.insertBefore(map,host.firstChild);
    bindTooltip(map);
  }

  function bindTooltip(map){
    var tip=map.querySelector('.outcome-tooltip');
    map.querySelectorAll('.outcome-node').forEach(function(node){
      node.addEventListener('mouseenter',function(){
        var code=node.getAttribute('data-code');
        loadTooltip(code).then(function(data){
          tip.innerHTML='<strong>'+code+' · '+data.name+'</strong><span>Örnek: '+data.sample_question+'</span><small>Zorluk '+data.difficulty_score+' / Popülerlik '+data.popularity_score+'</small>';
          positionTip(tip,node,map);
        });
      });
      node.addEventListener('mouseleave',function(){tip.classList.remove('show');});
      node.addEventListener('focus',function(){node.dispatchEvent(new Event('mouseenter'));});
      node.addEventListener('blur',function(){tip.classList.remove('show');});
    });
  }

  function loadTooltip(code){
    if(!window.fetch)return Promise.resolve(localTooltip(code));
    return fetch('/api/math-skill-tooltip.php?code='+encodeURIComponent(code))
      .then(function(res){return res.ok?res.json():localTooltip(code);})
      .then(function(data){return data&&data.ok?data:localTooltip(code);})
      .catch(function(){return localTooltip(code);});
  }

  function localTooltip(code){
    var item=outcomes.filter(function(outcome){return outcome.code===code;})[0]||outcomes[2];
    return {ok:true,name:item.name,sample_question:'36 + 27 işleminin sonucu kaçtır?',difficulty_score:2.4,popularity_score:88};
  }

  function positionTip(tip,node,map){
    var n=node.getBoundingClientRect();
    var m=map.getBoundingClientRect();
    tip.style.left=Math.min(m.width-310,Math.max(0,n.left-m.left+8))+'px';
    tip.style.top=(n.bottom-m.top+8)+'px';
    tip.classList.add('show');
  }

  function buildRadar(){
    if(document.querySelector('.growth-radar'))return;
    var host=document.querySelector('.math-action-center')||document.querySelector('main .section .container');
    if(!host)return;
    var avg=Math.round(outcomes.reduce(function(total,item){return total+item.score;},0)/outcomes.length);
    var radar=document.createElement('aside');
    radar.className='growth-radar';
    radar.innerHTML=[
      '<span>Gelişim Radarı</span>',
      '<strong class="radar-percent">'+avg+'%</strong>',
      '<div class="radar-bar"><i style="width:'+avg+'%"></i></div>',
      '<h3>Tekrar Etmen Gerekenler</h3>',
      '<a href="/testler/index.html">M.2.1.3 · Eldeli toplama</a>',
      '<a href="/testler/index.html">M.2.1.4 · Üç terimli toplama</a>',
      '<a href="/testler/index.html">M.2.1.5 · Toplama problemleri</a>'
    ].join('');
    host.insertBefore(radar,host.firstChild);
    window.addEventListener('scroll',function(){
      var total=document.documentElement.scrollHeight-window.innerHeight;
      var seen=total>0?Math.min(100,Math.round((window.scrollY/total)*100)):0;
      var live=Math.round((avg*0.75)+(seen*0.25));
      radar.querySelector('.radar-percent').textContent=live+'%';
      radar.querySelector('.radar-bar i').style.width=live+'%';
    },{passive:true});
  }

  function enhanceSmartScoreLabels(){
    document.querySelectorAll('.practice-meta b,.skill-meta').forEach(function(item){
      if(/SmartScore/.test(item.textContent)&&!/Challenge/.test(item.textContent)){
        item.setAttribute('title','90+ puanda Challenge Zone açılır; yanlışta puan daha sert düşer.');
      }
    });
  }

  function run(){
    if(!isMath())return;
    document.documentElement.classList.add('world-class-math-ready');
    buildOutcomeMap();
    buildRadar();
    enhanceSmartScoreLabels();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();
