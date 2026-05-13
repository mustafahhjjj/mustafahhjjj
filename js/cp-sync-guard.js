(function(){
  if(window.__ekursCPSyncGuardLoaded)return;
  window.__ekursCPSyncGuardLoaded=true;

  var endpoint='/api/cp-sync.php';
  var clientId=getClientId();
  var originals=new WeakMap();

  function getClientId(){
    try{
      var key='ekurs_cp_client_id';
      var existing=localStorage.getItem(key);
      if(existing)return existing;
      var id='cp-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
      localStorage.setItem(key,id);
      return id;
    }catch(e){return 'cp-'+Date.now();}
  }

  function notify(message,type){
    var box=document.querySelector('.ekurs-cp-sync-toast');
    if(!box){
      box=document.createElement('div');
      box.className='ekurs-cp-sync-toast';
      document.body.appendChild(box);
    }
    box.className='ekurs-cp-sync-toast is-'+(type||'info');
    box.textContent=message;
    window.clearTimeout(box.__timer);
    box.__timer=window.setTimeout(function(){box.classList.remove('is-visible');},5200);
    requestAnimationFrame(function(){box.classList.add('is-visible');});
  }

  function contentId(form){
    var explicit=form.getAttribute('data-content-id')||form.querySelector('[name="content_id"]')&&form.querySelector('[name="content_id"]').value;
    return explicit||location.pathname.replace(/^\/+|\/+$/g,'')||'default';
  }

  function localVersion(form){
    var field=form.querySelector('[name="local_version"],[data-local-version]');
    return Number(form.getAttribute('data-local-version')||(field&&field.value)||0)||0;
  }

  function setLocalVersion(form,version){
    form.setAttribute('data-local-version',String(version));
    var field=form.querySelector('[name="local_version"]');
    if(field)field.value=String(version);
  }

  function collectPayload(form){
    var payload={};
    new FormData(form).forEach(function(value,key){
      if(key==='local_version'||key==='content_id')return;
      if(payload[key]!==undefined){
        if(!Array.isArray(payload[key]))payload[key]=[payload[key]];
        payload[key].push(value);
      }else payload[key]=value;
    });
    return payload;
  }

  function rememberOriginal(form){
    if(originals.has(form))return;
    originals.set(form,collectPayload(form));
  }

  function request(action,body){
    body=body||{};
    body.action=action;
    body.client_id=clientId;
    return fetch(endpoint,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Ekurs-Client':clientId},body:JSON.stringify(body)}).then(function(res){
      return res.json().catch(function(){return {ok:false,error:'bad_json'};}).then(function(json){json.httpStatus=res.status;return json;});
    });
  }

  function applyRemote(form,payload){
    payload=payload||{};
    Object.keys(payload).forEach(function(key){
      var field=form.querySelector('[name="'+cssEscape(key)+'"]');
      if(!field)return;
      if(field.type==='checkbox'||field.type==='radio')field.checked=String(field.value)===String(payload[key])||payload[key]===true;
      else field.value=payload[key];
      field.dispatchEvent(new Event('input',{bubbles:true}));
      field.dispatchEvent(new Event('change',{bubbles:true}));
    });
  }

  function findConflicts(form,remotePayload){
    var original=originals.get(form)||{};
    var current=collectPayload(form);
    var conflicts=[];
    Object.keys(remotePayload||{}).forEach(function(key){
      var localChanged=String(current[key]||'')!==String(original[key]||'');
      var remoteChanged=String(remotePayload[key]||'')!==String(original[key]||'');
      if(localChanged&&remoteChanged&&String(current[key]||'')!==String(remotePayload[key]||'')){
        conflicts.push({key:key,local:current[key],remote:remotePayload[key]});
      }
    });
    return conflicts;
  }

  function showDiff(form,conflicts,remotePayload,remoteVersion){
    try{sessionStorage.setItem('ekurs_cp_side_buffer_'+contentId(form),JSON.stringify(collectPayload(form)));}catch(e){}
    var modal=document.createElement('div');
    modal.className='ekurs-cp-diff-modal';
    var panel=document.createElement('section');
    panel.innerHTML='<h2>Sunucuda daha güncel sürüm var</h2><p>Aynı alan hem panelde hem sunucuda değişmiş. Sunucu verisi baskın kabul edildi; senin değişikliğin geçici hafızaya alındı.</p>';
    conflicts.slice(0,6).forEach(function(item){
      var row=document.createElement('article');
      row.innerHTML='<strong>'+escapeHtml(item.key)+'</strong><div><span>Senin değişikliğin</span><pre>'+escapeHtml(String(item.local||''))+'</pre></div><div><span>Sunucudaki güncel veri</span><pre>'+escapeHtml(String(item.remote||''))+'</pre></div>';
      panel.appendChild(row);
    });
    var button=document.createElement('button');
    button.type='button';
    button.textContent='Sunucu verisini uygula';
    button.addEventListener('click',function(){
      applyRemote(form,remotePayload);
      setLocalVersion(form,remoteVersion);
      rememberOriginal(form);
      modal.remove();
      notify('Sunucuda daha güncel bir sürüm bulundu. İçerik otomatik olarak güncellendi. Lütfen kontrol edip tekrar gönderin.','warning');
    });
    panel.appendChild(button);
    modal.appendChild(panel);
    document.body.appendChild(modal);
  }

  function escapeHtml(value){
    return String(value).replace(/[&<>'"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch];});
  }

  function cssEscape(value){
    if(window.CSS&&CSS.escape)return CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g,'\\$&');
  }

  function guardSubmit(event){
    var form=event.target;
    if(!form.matches('form[data-cp-sync]'))return;
    rememberOriginal(form);
    if(form.dataset.cpSyncReady==='1'){
      form.dataset.cpSyncReady='0';
      return;
    }
    event.preventDefault();
    var id=contentId(form);
    var version=localVersion(form);
    notify('Sunucu sürümü kontrol ediliyor...','info');

    request('check',{content_id:id,local_version:version}).then(function(remote){
      if(!remote.ok)throw new Error(remote.error||'check_failed');
      if(remote.remote_newer){
        var conflicts=findConflicts(form,remote.payload||{});
        if(conflicts.length){
          showDiff(form,conflicts,remote.payload||{},remote.remote_version);
        }else{
          applyRemote(form,remote.payload||{});
          setLocalVersion(form,remote.remote_version);
          rememberOriginal(form);
          notify(remote.message||'Sunucuda daha güncel bir sürüm bulundu. İçerik otomatik olarak güncellendi. Lütfen tekrar gönderin.','warning');
        }
        return null;
      }
      return request('lock',{content_id:id,local_version:version});
    }).then(function(lock){
      if(!lock)return;
      if(!lock.ok){
        notify(lock.message||'İçerik şu an başka bir kullanıcı tarafından güncelleniyor.','error');
        return;
      }
      form.dataset.cpSyncReady='1';
      form.submit();
    }).catch(function(){
      notify('Senkron kontrolü tamamlanamadı. Veri gönderimi durduruldu; lütfen tekrar deneyin.','error');
    });
  }

  function saveViaApi(form){
    rememberOriginal(form);
    var id=contentId(form);
    var payload=collectPayload(form);
    return request('save',{content_id:id,local_version:localVersion(form),payload:payload}).then(function(result){
      if(result.ok){
        setLocalVersion(form,result.remote_version);
        originals.set(form,payload);
        notify('İçerik güvenli şekilde kaydedildi.','success');
        return result;
      }
      if(result.error==='remote_newer'){
        var conflicts=findConflicts(form,result.payload||{});
        if(conflicts.length)showDiff(form,conflicts,result.payload||{},result.remote_version);
        else{applyRemote(form,result.payload||{});setLocalVersion(form,result.remote_version);notify(result.message,'warning');}
      }else notify(result.message||'Kaydetme engellendi.','error');
      return result;
    });
  }

  window.EkursCPSync={check:function(form){return request('check',{content_id:contentId(form),local_version:localVersion(form)});},save:saveViaApi,lock:function(form){return request('lock',{content_id:contentId(form),local_version:localVersion(form)});}};

  document.addEventListener('submit',guardSubmit,true);
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('form[data-cp-sync]').forEach(rememberOriginal);
  });
})();
