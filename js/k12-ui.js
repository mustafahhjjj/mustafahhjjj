(function(){
  if(window.__ekursK12UiLoaded)return;
  window.__ekursK12UiLoaded=true;
  var groups=[
    ['Okul \u00d6ncesi',['Haz\u0131rl\u0131k'],['Temel Matematik','Dil Geli\u015fimi','Dikkat']],
    ['\u0130lkokul',['1. S\u0131n\u0131f','2. S\u0131n\u0131f','3. S\u0131n\u0131f','4. S\u0131n\u0131f'],['Matematik','T\u00fcrk\u00e7e','Hayat Bilgisi']],
    ['Ortaokul',['5. S\u0131n\u0131f','6. S\u0131n\u0131f','7. S\u0131n\u0131f','8. S\u0131n\u0131f'],['Matematik','Fen Bilimleri','T\u00fcrk\u00e7e','LGS']],
    ['Lise',['9. S\u0131n\u0131f','10. S\u0131n\u0131f','11. S\u0131n\u0131f','12. S\u0131n\u0131f','YKS'],['Matematik','Fizik','Kimya','Biyoloji','TYT/AYT']]
  ];
  var grades=groups.reduce(function(all,group){return all.concat(group[1]);},[]);
  function preferredGrade(){return localStorage.getItem('ekurs.gradeLevel')||'2. S\u0131n\u0131f';}
  function gradeSlug(grade){return grade==='Haz\u0131rl\u0131k'?'okul-oncesi':grade==='YKS'?'yks':((grade.match(/\d+/)||['2'])[0]+'-sinif');}
  function gradeUrl(grade){return grade==='YKS'?'/testler/index.html':'/siniflar/'+gradeSlug(grade)+'/matematik.html';}
  function selectHtml(selected){
    selected=selected||preferredGrade();
    return '<select class="k12-grade-select" aria-label="S\u0131n\u0131f seviyesi">'+grades.map(function(grade){return '<option value="'+grade+'" '+(grade===selected?'selected':'')+'>'+grade+'</option>';}).join('')+'</select>';
  }
  function enhanceNav(){
    if(document.querySelector('.k12-mega-panel'))return;
    var nav=document.querySelector('.nav');
    var links=document.querySelector('.nav-links');
    if(!nav||!links)return;
    document.body.classList.add('k12-experience');
    var keep=Array.prototype.slice.call(links.querySelectorAll('a')).filter(function(link){return !/S\u0131n\u0131flar|Dersler|Testler/i.test(link.textContent.trim());}).map(function(link){return link.outerHTML;}).join('');
    links.innerHTML='<a class="k12-mega-trigger" href="/siniflar/index.html" aria-expanded="false">\u00d6\u011frenim (K-12)</a><a href="/dersler/index.html">Bran\u015flar</a><a href="/testler/index.html">S\u0131navlar (LGS/YKS)</a><a href="/veli-paneli.html">\u00d6\u011fretmenler/Veliler \u0130\u00e7in</a>'+keep;
    var panel=document.createElement('div');
    panel.className='k12-mega-panel';
    panel.innerHTML=groups.map(function(group){
      return '<section class="k12-stage-card"><span>'+group[0]+'</span><div class="k12-grade-links">'+group[1].map(function(grade){return '<a href="'+gradeUrl(grade)+'">'+grade+'</a>';}).join('')+'</div><div class="k12-branch-list">'+group[2].map(function(branch){return '<b>'+branch+'</b>';}).join('')+'</div></section>';
    }).join('');
    nav.appendChild(panel);
    var trigger=links.querySelector('.k12-mega-trigger');
    function setOpen(open){nav.classList.toggle('k12-open',open);if(trigger)trigger.setAttribute('aria-expanded',open?'true':'false');}
    trigger&&trigger.addEventListener('click',function(event){event.preventDefault();setOpen(!nav.classList.contains('k12-open'));});
    nav.addEventListener('mouseleave',function(){setOpen(false);});
    document.addEventListener('click',function(event){if(!nav.contains(event.target))setOpen(false);});
  }
  function addGradeProfile(){
    if(document.querySelector('.grade-profile-card'))return;
    var path=location.pathname.toLowerCase();
    var shouldShow=/kayit|giris|profil|panel|basarilarim/.test(path)||document.querySelector('form input,form select,form textarea');
    if(!shouldShow)return;
    var host=document.querySelector('.page-hero .container,.hero .container,main,.container')||document.body;
    var card=document.createElement('section');
    card.className='grade-profile-card';
    card.innerHTML='<div><span>K-12 profil ayar\u0131</span><h2>S\u0131n\u0131f seviyeni se\u00e7</h2><p>Se\u00e7ilen seviyeye g\u00f6re dersler, mikro beceriler ve \u00f6\u011fretmen \u00f6nerileri filtrelenir.</p></div><div class="grade-profile-actions">'+selectHtml()+'<a class="btn btn-primary" href="'+gradeUrl(preferredGrade())+'">Seviyeme uygun i\u00e7erikleri g\u00f6ster</a></div>';
    host.insertAdjacentElement(host===document.body?'afterbegin':'beforeend',card);
    var select=card.querySelector('select');
    var action=card.querySelector('a');
    select.addEventListener('change',function(){localStorage.setItem('ekurs.gradeLevel',select.value);action.href=gradeUrl(select.value);});
  }
  function addAiAssistant(){
    if(document.querySelector('.ai-assistant-shell'))return;
    var student=localStorage.getItem('ekurs.studentName')||'e-kurs \u00f6\u011frencisi';
    var grade=preferredGrade();
    var shell=document.createElement('aside');
    shell.className='ai-assistant-shell';
    shell.innerHTML='<button class="ai-assistant-launcher" type="button" aria-expanded="false" aria-label="Yapay zeka asistan\u0131n\u0131 a\u00e7"><span>AI</span></button><section class="ai-assistant-panel" aria-label="Yapay zeka destekli \u00e7al\u0131\u015fma paneli"><header><div><span>e-kurs AI</span><h2>Merhaba, '+student+'</h2></div><button type="button" class="ai-close" aria-label="Paneli kapat">x</button></header><p class="ai-greeting">Bug\u00fcn '+grade+' Matematik hedeflerine ba\u015flayal\u0131m m\u0131?</p><label>\u00d6\u011frenci ad\u0131<input class="ai-name-input" type="text" value="'+(student==='e-kurs \u00f6\u011frencisi'?'':student)+'" placeholder="Ad\u0131n\u0131 yaz"></label><label>S\u0131n\u0131f seviyesi'+selectHtml(grade)+'</label><div class="ai-report"><article class="ai-status good"><i>&#10003;</i><div><strong>G\u00fc\u00e7l\u00fc alan</strong><span>Ritmik sayma ve temel i\u015flem ak\u0131c\u0131l\u0131\u011f\u0131 iyi gidiyor.</span></div></article><article class="ai-status watch"><i>!</i><div><strong>Tekrar alan\u0131</strong><span>Kesirlerde kar\u015f\u0131la\u015ft\u0131rma i\u00e7in 10 dakikal\u0131k tekrar \u00f6nerildi.</span></div></article></div><a class="btn btn-primary ai-start" href="'+gradeUrl(grade)+'">AI \u00e7al\u0131\u015fma rotas\u0131n\u0131 a\u00e7</a></section>';
    document.body.appendChild(shell);
    var launcher=shell.querySelector('.ai-assistant-launcher');
    var panel=shell.querySelector('.ai-assistant-panel');
    var close=shell.querySelector('.ai-close');
    var nameInput=shell.querySelector('.ai-name-input');
    var gradeSelect=shell.querySelector('.k12-grade-select');
    var start=shell.querySelector('.ai-start');
    var greeting=shell.querySelector('.ai-greeting');
    var heading=shell.querySelector('header h2');
    function toggle(open){panel.classList.toggle('open',open);launcher.setAttribute('aria-expanded',open?'true':'false');}
    function refresh(){
      var nextName=(nameInput.value||'e-kurs \u00f6\u011frencisi').trim();
      var nextGrade=gradeSelect.value;
      localStorage.setItem('ekurs.studentName',nextName);
      localStorage.setItem('ekurs.gradeLevel',nextGrade);
      heading.textContent='Merhaba, '+nextName;
      greeting.textContent='Bug\u00fcn '+nextGrade+' Matematik hedeflerine ba\u015flayal\u0131m m\u0131?';
      start.href=gradeUrl(nextGrade);
    }
    launcher.addEventListener('click',function(){toggle(!panel.classList.contains('open'));});
    close.addEventListener('click',function(){toggle(false);});
    nameInput.addEventListener('input',refresh);
    gradeSelect.addEventListener('change',refresh);
  }
  function normalizeText(){
    var map={
      'What Ders Siz Want':'Hangi dersi \u00e7al\u0131\u015fmak istiyorsun?',
      'What do you want to learn':'Hangi konuyu \u00e7al\u0131\u015fmak istiyorsun?',
      'Get I\u00e7inde Touch':'\u0130leti\u015fime ge\u00e7',
      'Search for Teachers':'Ders ve beceri ara',
      'Search Teachers':'Ders ve beceri ara',
      'Find Teachers':'S\u0131n\u0131f ve bran\u015f se\u00e7',
      'Book Now':'\u00c7al\u0131\u015fmaya ba\u015fla',
      'Book Lesson':'\u00c7al\u0131\u015fmaya ba\u015fla',
      'Book':'Ba\u015fla',
      'Browse Tutors':'S\u0131n\u0131flar\u0131 incele',
      'Tutors':'\u00d6\u011fretmenler',
      'Instructor':'\u00d6\u011fretmen',
      'Students':'\u00d6\u011frenciler',
      'Teachers':'\u00d6\u011fretmenler',
      'Lorem Ipsum':'',
      'Lorem ipsum dolor sit amet':''
    };
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(node){return node.parentElement&&/SCRIPT|STYLE|NOSCRIPT/.test(node.parentElement.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
    var node;
    while((node=walker.nextNode())){
      var text=node.nodeValue;
      Object.keys(map).forEach(function(bad){text=text.split(bad).join(map[bad]);});
      node.nodeValue=text;
    }
  }
  function hideImmatureCounters(){
    Array.prototype.slice.call(document.querySelectorAll('[data-countup],.metric-card,.stat-card,.counter,.badge,.pill,.meta,li,span,strong,small')).forEach(function(item){
      var text=item.textContent||'';
      var raw=item.getAttribute('data-countup')||((text.match(/\d+/)||[])[0]);
      var value=Number(raw);
      var sensitive=/\u00d6\u011frenci|Kayıtl\u0131|Kay\u0131tl\u0131|E\u011fitmen|\u00d6\u011fretmen|De\u011ferlendirme|Yorum|Review|Student|Teacher|Tutor/i.test(text);
      if((/(^|\s)0\s*(\u00d6\u011fretmen|E\u011fitmen|De\u011ferlendirme|Yorum|Review|Teacher|Tutor)s?/i.test(text))||(/(^|\s)1\s*(Kayıtl\u0131|Kay\u0131tl\u0131)?\s*(\u00d6\u011frenci|Student)/i.test(text))||(sensitive&&Number.isFinite(value)&&value>=0&&value<10)){
        (item.closest('.metric-card,.stat-card,.card,section')||item).classList.add('is-hidden-counter');
      }
    });
  }
  function removeTemplateResidue(){
    Array.prototype.slice.call(document.querySelectorAll('a[href],p,li,span,small,address')).forEach(function(item){
      var text=(item.textContent||'').replace(/\s+/g,' ').trim();
      var href=item.getAttribute&&item.getAttribute('href')||'';
      if(/(\+91|\+1\s?\d{3}|India|United States|California|New York|dummy|demo|placeholder|lorem ipsum)/i.test(text+' '+href)){
        (item.closest('li,.card,address,.footer-col,.contact-item')||item).classList.add('is-template-residue');
      }
      if(/facebook\.com\/#|twitter\.com\/#|instagram\.com\/#|linkedin\.com\/#|javascript:void\(0\)|\/#$/i.test(href)){
        item.classList.add('is-template-residue');
      }
    });
  }
  function consolidateMarketplaceCtas(){
    var marketplace=/\u00d6\u011fretmen Bul|Hemen Rezervasyon Yap|Rezervasyon Yap|Ders Ayarla|Book Now|Find Teachers|Search Teachers/i;
    Array.prototype.slice.call(document.querySelectorAll('a,button')).forEach(function(item){
      if(!marketplace.test(item.textContent||''))return;
      item.textContent='S\u0131n\u0131f\u0131n\u0131 se\u00e7';
      if(item.tagName==='A')item.setAttribute('href','/siniflar/index.html');
      item.classList.add('k12-primary-cta');
    });
  }
  function run(){normalizeText();hideImmatureCounters();removeTemplateResidue();consolidateMarketplaceCtas();enhanceNav();addGradeProfile();addAiAssistant();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
