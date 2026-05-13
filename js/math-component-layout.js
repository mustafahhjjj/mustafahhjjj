(function(){
  if(window.__ekursMathComponentLayoutLoaded)return;
  window.__ekursMathComponentLayoutLoaded=true;

  var grades=['1. Sınıf','2. Sınıf','3. Sınıf','4. Sınıf','5. Sınıf','6. Sınıf','7. Sınıf','8. Sınıf','9. Sınıf','10. Sınıf','11. Sınıf','12. Sınıf'];

  function isMath(){
    return /\/dersler\/matematik/.test(location.pathname.toLowerCase())||/matematik/i.test((document.querySelector('h1')||{}).textContent||'');
  }

  function selectedGrade(){
    return localStorage.getItem('ekurs.mathGrade')||'2. Sınıf';
  }

  function buildSidebar(shell){
    if(shell.querySelector('.math-class-sidebar'))return;
    var sidebar=document.createElement('aside');
    sidebar.className='math-class-sidebar';
    sidebar.setAttribute('aria-label','Matematik sınıf seçim menüsü');
    sidebar.innerHTML='<span>Sınıf Seç</span><nav>'+grades.map(function(grade){
      return '<button type="button" data-grade="'+grade+'">'+grade+'</button>';
    }).join('')+'</nav>';
    shell.insertBefore(sidebar,shell.firstChild);
    bindSidebar(shell,sidebar);
    updateActive(shell,selectedGrade());
  }

  function bindSidebar(shell,sidebar){
    sidebar.querySelectorAll('button').forEach(function(button){
      button.addEventListener('click',function(){
        var grade=button.getAttribute('data-grade');
        localStorage.setItem('ekurs.mathGrade',grade);
        updateActive(shell,grade);
        var topTab=shell.querySelector('.math-grade-nav button[data-grade="'+grade+'"]');
        if(topTab)topTab.click();
      });
    });
  }

  function updateActive(shell,grade){
    shell.querySelectorAll('.math-class-sidebar button,.math-grade-nav button').forEach(function(item){
      item.classList.toggle('active',item.getAttribute('data-grade')===grade);
    });
  }

  function enhanceAccordions(root){
    root.querySelectorAll('.math-unit-card').forEach(function(card,index){
      if(card.classList.contains('pro-accordion-ready'))return;
      card.classList.add('pro-accordion-ready');
      if(index>1)card.classList.add('pro-collapsed');
      var header=card.querySelector('header');
      if(!header)return;
      header.setAttribute('role','button');
      header.setAttribute('tabindex','0');
      header.setAttribute('aria-expanded',card.classList.contains('pro-collapsed')?'false':'true');
      var chevron=document.createElement('span');
      chevron.className='unit-chevron';
      chevron.setAttribute('aria-hidden','true');
      header.appendChild(chevron);
      function toggle(){
        var collapsed=card.classList.toggle('pro-collapsed');
        header.setAttribute('aria-expanded',collapsed?'false':'true');
      }
      header.addEventListener('click',function(event){
        if(event.target.closest('.collapse-toggle'))return;
        toggle();
      });
      header.addEventListener('keydown',function(event){
        if(event.key==='Enter'||event.key===' '){
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  function enhanceSkillRows(root){
    root.querySelectorAll('.math-skill').forEach(function(row,index){
      if(row.classList.contains('skill-row-ready'))return;
      row.classList.add('skill-row-ready');
      var score=Number((row.querySelector('.skill-ring i')||{}).textContent||0);
      row.setAttribute('data-score-band',score>=90?'gold':score>=50?'blue':'gray');
      if(!row.querySelector('.skill-index')){
        var indexNode=document.createElement('span');
        indexNode.className='skill-index';
        indexNode.textContent=String(index+1).padStart(2,'0');
        row.insertBefore(indexNode,row.firstChild);
      }
      if(!row.querySelector('.skill-arrow')){
        var arrow=document.createElement('span');
        arrow.className='skill-arrow';
        arrow.textContent='→';
        row.appendChild(arrow);
      }
    });
  }

  function syncWhenCurriculumChanges(shell){
    var grid=shell.querySelector('.math-units-grid');
    if(!grid||shell.__componentObserver)return;
    shell.__componentObserver=new MutationObserver(function(){
      enhanceAccordions(shell);
      enhanceSkillRows(shell);
      updateActive(shell,selectedGrade());
    });
    shell.__componentObserver.observe(grid,{childList:true,subtree:true});
  }

  function init(){
    if(!isMath())return;
    var shell=document.querySelector('.math-curriculum-shell');
    if(!shell)return;
    shell.classList.add('has-component-layout');
    buildSidebar(shell);
    enhanceAccordions(shell);
    enhanceSkillRows(shell);
    syncWhenCurriculumChanges(shell);
  }

  function run(){
    init();
    window.setTimeout(init,400);
    window.setTimeout(init,900);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();
