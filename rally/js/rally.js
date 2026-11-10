(function(){
var film=document.querySelector('.film');
var $=function(i){return document.getElementById(i)};
var $$=function(s,r){return [].slice.call((r||film).querySelectorAll(s))};
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
$$('.bgi').forEach(function(el){el.style.backgroundImage='url("'+el.dataset.bg+'")'});
/* тема */
var tb=$('bmT'),de=document.documentElement;var th0=de.getAttribute('data-theme');if(!th0){try{th0=localStorage.getItem('yhTheme')}catch(e){}}
if(th0==='light')tb.checked=true;
tb.addEventListener('change',function(){var t=tb.checked?'light':'dark';de.setAttribute('data-theme',t);try{localStorage.setItem('yhTheme',t)}catch(e){}});
/* слайдер картинок */
function slider(imgs,btns,onSet){var k=0;function set(i){k=i;imgs.forEach(function(im,j){if(j===i){im.classList.remove('out');im.classList.add('on')}else if(im.classList.contains('on')){im.classList.remove('on');im.classList.add('out');setTimeout(function(){im.classList.remove('out')},700)}});btns.forEach(function(b,j){b.classList.toggle('on',j===i);b.classList.toggle('done',j<i);if(j===i){b.style.animation='none';void b.offsetWidth;b.style.animation=''}});if(onSet)onSet(i)}
  btns.forEach(function(b,i){b.addEventListener('click',function(){set(i)});b.addEventListener('animationend',function(e){if(e.animationName==='fill'&&b.classList.contains('on'))set((k+1)%imgs.length)})});return set}
var g2I=$$('#g2c img'),g2T=$$('#g2p button'),g2sec=$('gal2');
slider(g2I,g2T,function(i){var L=g2I[i].getAttribute('data-l');$('flab').textContent=(i+1)+' / '+g2I.length+(L?' · '+L:'')});
var GL=['Обложка','Главы','Выбор реплики','Два индикатора','Индикаторы в сцене','Протокол этапа','Общий зачёт','Турнирная таблица','Конец'];
var gI=$$('.galbox img'),gT=$$('#strip button');
if(gI.length)slider(gI,gT,function(i){$('glab').textContent=GL[i]});
var pzEls=[g2sec];var gs=document.querySelector('.px[data-s="gal"]');if(gs)pzEls.push(gs);
if('IntersectionObserver' in window){pzEls.forEach(function(el){new IntersectionObserver(function(en){el.classList.toggle('pz',!en[0].isIntersecting)},{threshold:.2}).observe(el)})}
/* счётчики, печать, отсчёт */
function fmt(n,dec){var s=n.toFixed(dec).replace('.',','),p=s.split(',');p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,' ');return p.join(',')}
function runCount(el){var to=parseFloat(el.dataset.to),dec=+el.dataset.dec||0,suf=el.dataset.suf||'';if(reduce){el.textContent=fmt(to,dec)+suf;return}var t0=null;(function tick(t){if(t0===null)t0=t;var k=Math.min(1,(t-t0)/1300),e=1-Math.pow(1-k,3);el.textContent=fmt(to*e,dec)+suf;if(k<1)requestAnimationFrame(tick)})(performance.now())}
var typeT,cdT;
function typeIn(el){var full=el.dataset.t;clearInterval(typeT);if(reduce){el.textContent=full;return}el.textContent='';var k=0;typeT=setInterval(function(){k++;el.textContent=full.slice(0,k);if(k>=full.length)clearInterval(typeT)},28)}
function onEnter(sec){var id=sec.dataset.s;
  $$('.cnt',sec).forEach(function(el){el.textContent='0';runCount(el)});
  $$('.ty',sec).forEach(typeIn);
  if(id==='start'&&$('cd')){var cd=$('cd'),lk=$('luck'),seq=['20','15','10','5','4','3','2','1','СТАРТ'];clearInterval(cdT);clearTimeout(window.cdR);
    var runCd=function(){var k=0;clearInterval(cdT);lk.classList.remove('on');cd.textContent=seq[0];
      cdT=setInterval(function(){k++;if(k>=seq.length){clearInterval(cdT);lk.classList.add('on');window.cdR=setTimeout(function(){var r=cd.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)runCd()},2200);return}cd.textContent=seq[k]},520)};
    if(!reduce)runCd();else{cd.textContent='СТАРТ';lk.classList.add('on')}}}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){if(e.target.dataset.s!=='start')io.unobserve(e.target);onEnter(e.target)}})},{threshold:.35});$$('.px').forEach(function(s){io.observe(s)})}else{$$('.px').forEach(onEnter)}
/* трасса */
if($('pf')){
var path=$('pf'),L=path.getTotalLength(),car=$('car'),th=$('th'),pts=$$('.tp',th),cr=$('cr');
var YT=[];(function(){var lo=0;for(var i=0;i<=1000;i++){var a=lo,b=L;for(var k=0;k<22;k++){var m=(a+b)/2;if(path.getPointAtLength(m).x<i)a=m;else b=m}lo=a;YT[i]=path.getPointAtLength(b).y}})();
function yAtX(x){x=Math.max(0,Math.min(1000,x));var i=Math.floor(x),f=x-i;return i>=1000?YT[1000]:YT[i]*(1-f)+YT[i+1]*f}
function place(){pts.forEach(function(p){var x=1000*(+p.dataset.f);p.style.left=(x/10)+'%';p.style.top=(10+yAtX(x))+'px'})}
place();
var anch=$$('[data-ch]'),AT=[],tick=false;
function meas(){var y=window.scrollY;AT=anch.map(function(e){return e.getBoundingClientRect().top+y});AT.push(document.documentElement.scrollHeight-window.innerHeight);place();upd()}
function upd(){tick=false;var N=pts.length,y=window.scrollY+window.innerHeight*.35;var kk=0;for(var z=0;z<AT.length-1;z++)if(y>=AT[z])kk=z;
  var span=AT[kk+1]-AT[kk]||1;var f=Math.max(0,Math.min(1,(kk+Math.max(0,Math.min(1,(y-AT[kk])/span)))/(N-1)));
  cr.setAttribute('width',f*1000);car.style.left=(f*100)+'%';car.style.top=(10+yAtX(f*1000))+'px';
  pts.forEach(function(p,ix){var on=f>=+p.dataset.f-.001;p.classList.toggle('on',on);p.classList.toggle('cur',on&&(ix===N-1||f<+pts[ix+1].dataset.f-.001))})}
function on(){if(!tick){tick=true;requestAnimationFrame(upd)}}
window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',meas);window.addEventListener('load',meas);meas();
if(window.ResizeObserver){new ResizeObserver(meas).observe(document.body)}
}
/* навигация */
function go(dir){var y0=window.scrollY,T=$$('.hero2,.gal2,.px,.st').map(function(e){return e.getBoundingClientRect().top+y0}).sort(function(a,b){return a-b}),t=null;
  if(dir>0){for(var i=0;i<T.length;i++)if(T[i]>y0+12){t=T[i];break}if(t===null)t=document.documentElement.scrollHeight}else{for(var k=T.length-1;k>=0;k--)if(T[k]<y0-12){t=T[k];break}if(t===null)t=0}
  window.scrollTo({top:t,behavior:reduce?'auto':'smooth'})}

/* реплики */
function seg(el,v){if(!el.children.length)for(var i=0;i<10;i++)el.appendChild(document.createElement('i'));for(var j=0;j<10;j++)el.children[j].classList.toggle('on',j<v)}
var tS=$('tSeg'),tN=$('tNum'),tC=$('tChip'),base=6,tm;if(tS)seg(tS,base);
var mWho=$('mWho'),mSay=$('mSay'),mOpts=$('mOpts'),mHint=$('mHint');
var replies=[{d:-2,t:'«Я потерялась, это моя ошибка, и разбирать её надо. Но не так. Больше так не делай»',h:'Доверие падает. От таких решений зависит, останется ли Вика, когда ей позвонит Кравец'},{d:1,t:'[Ответ Вики из игры]',h:'Доверие растёт. Реплика и сдвиг показаны для примера'}];
if(mOpts)mOpts.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
  if(b.dataset.again){seg(tS,base);tN.textContent=base+'/10';tC.classList.remove('show');mWho.textContent='Ваш ход';mSay.textContent='Вика потерялась в стенограмме. Что скажет Алекс?';mHint.textContent='';mOpts.innerHTML='<button type="button" data-i="0">Крикнуть на неё</button><button type="button" data-i="1">Спокойно спросить, где она потерялась</button>';return}
  var r=replies[+b.dataset.i],v=Math.max(0,Math.min(10,base+r.d));mWho.textContent='Вика';mSay.textContent=r.t;mHint.textContent=r.h;seg(tS,v);tN.textContent=v+'/10';
  tC.textContent=(r.d>0?'+':'−')+Math.abs(r.d);tC.className='chip show '+(r.d>0?'':'neg');clearTimeout(tm);tm=setTimeout(function(){tC.classList.remove('show')},2200);
  mOpts.innerHTML='<button type="button" data-again="1">Выбрать другую реплику</button>'});
/* музыка */
var audio=new Audio();audio.loop=true;var trks=$$('.trk'),curSrc='';
function rs(){trks.forEach(function(t){t.setAttribute('aria-pressed','false');t.firstChild.textContent='▶'})}
trks.forEach(function(t){t.addEventListener('click',function(){var s=t.dataset.src;if(curSrc===s&&!audio.paused){audio.pause();rs();return}if(curSrc!==s){audio.src=s;curSrc=s}rs();var p=audio.play();if(p&&p.catch)p.catch(function(){});t.setAttribute('aria-pressed','true');t.firstChild.textContent='❚❚'})});
})();

(function(){var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;[].slice.call(document.querySelectorAll('.case-carousel')).forEach(function(c){var tr=c.querySelector('.case-carousel-track'),sl=[].slice.call(tr.children),dots=[].slice.call(c.querySelectorAll('.case-carousel-dot')),pv=c.querySelector('[data-prev]'),nx=c.querySelector('[data-next]');
function cur(){var l=tr.getBoundingClientRect().left,b=0,bd=1e9;sl.forEach(function(s,i){var d=Math.abs(s.getBoundingClientRect().left-l);if(d<bd){bd=d;b=i}});return b}
function go(i){i=(i+sl.length)%sl.length;tr.scrollTo({left:sl[i].offsetLeft,behavior:rm?'auto':'smooth'})}
function up(){var i=cur();dots.forEach(function(d,k){d.classList.toggle('is-active',k===i)})}
if(pv)pv.addEventListener('click',function(){go(cur()-1)});if(nx)nx.addEventListener('click',function(){go(cur()+1)});dots.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
var t;tr.addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(up,80)},{passive:true});up()})})();

/* лайтбокс концептов, чек-лист, счётчики */
(function(){var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var lb=document.getElementById('lb');if(lb){var im=lb.querySelector('img'),cp=lb.querySelector('figcaption'),list=[],k=0,last=null;
function show(i){k=(i+list.length)%list.length;var a=list[k];im.src=a.href;im.alt=a.querySelector('img').alt;cp.textContent=a.parentNode.querySelector('figcaption').textContent+' · '+(k+1)+' / '+list.length}
function open(a){list=[].slice.call(a.closest('.ccg').querySelectorAll('a[data-lb]'));last=a;lb.hidden=false;document.documentElement.style.overflow='hidden';show(list.indexOf(a));lb.querySelector('.lb-x').focus()}
function close(){lb.hidden=true;document.documentElement.style.overflow='';if(last)last.focus()}
[].forEach.call(document.querySelectorAll('a[data-lb]'),function(a){a.addEventListener('click',function(e){e.preventDefault();open(a)})});
lb.querySelector('.lb-x').addEventListener('click',close);lb.querySelector('.lb-p').addEventListener('click',function(){show(k-1)});lb.querySelector('.lb-n').addEventListener('click',function(){show(k+1)});
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(k-1);else if(e.key==='ArrowRight')show(k+1)})}
[].forEach.call(document.querySelectorAll('.bigst b'),function(b){var raw=b.textContent,m=raw.match(/^([\d]+(?:,\d+)?)(.*)$/);if(!m)return;var to=parseFloat(m[1].replace(',','.')),dec=(m[1].split(',')[1]||'').length,suf=m[2];
function run(){if(rm){return}var t0=null;function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1100),v=to*(1-Math.pow(1-p,3));b.textContent=v.toFixed(dec).replace('.',',')+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if('IntersectionObserver' in window&&!rm){b.textContent='0'+(dec?',0':'')+suf;new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){run();o.disconnect()}})},{threshold:.6}).observe(b)}})})();

/* сравнение и демо доверия */
(function(){[].forEach.call(document.querySelectorAll('.cmp'),function(f){var r=f.querySelector('input');r.addEventListener('input',function(){f.style.setProperty('--p',r.value+'%')})});
var d=document.getElementById('dm');if(!d)return;var st=+d.getAttribute('data-start'),bars=d.querySelectorAll('.dm-bar i'),w=d.querySelector('.dm-w'),rs=d.querySelector('.dm-r'),cur=st;
function word(n){return n>=8?'железное':n>=4?'складывается':n>=1?'сдержанное':'потеряно'}
function draw(n){[].forEach.call(bars,function(b,i){b.classList.toggle('on',i<n)});w.textContent=word(n)+' · '+n+' из 10'}
draw(st);
[].forEach.call(d.querySelectorAll('.dm-o button'),function(b){b.addEventListener('click',function(){var n=Math.max(0,Math.min(10,st+(+b.getAttribute('data-d'))));b.classList.add('sel');d.classList.add('done');draw(n);rs.hidden=false})});
rs.addEventListener('click',function(){d.classList.remove('done');[].forEach.call(d.querySelectorAll('.sel'),function(x){x.classList.remove('sel')});draw(st);rs.hidden=true})})();

(function(){var s=document.getElementById('hstage');if(!s)return;var c=[].slice.call(s.querySelectorAll('.ch')),cur=null,cu=document.getElementById('hcur'),rp=document.getElementById('hrip'),demo=false,tms=[];function act(id){c.forEach(function(e){e.classList.toggle('on',e.getAttribute('data-id')==id)})}
function put(x,y){cu.style.transform='translate('+x+'px,'+y+'px)'}
function stopDemo(){if(!demo)return;demo=false;tms.forEach(clearTimeout);tms=[];cu.style.opacity=0;act(cur)}
function later(f,t){tms.push(setTimeout(f,t))}
function run(){demo=true;var sr=s.getBoundingClientRect(),pts=c.map(function(e){var r=e.getBoundingClientRect();return {id:e.getAttribute('data-id'),x:r.left-sr.left+r.width*.5,y:r.top-sr.top+r.height*.32}});
cu.style.transition='none';put(-40,sr.height*.9);cu.style.opacity=0;void cu.offsetWidth;cu.style.transition='';cu.style.opacity=1;var t=250;
pts.forEach(function(p,i){later(function(){put(p.x-4,p.y);},t);later(function(){act(p.id);rp.style.left=p.x+'px';rp.style.top=p.y+'px';rp.classList.remove('go');void rp.offsetWidth;rp.classList.add('go')},t+170);t+=i<pts.length-1?260:0});
later(function(){put(pts[3].x-4,pts[3].y+10);act(null)},t+500);later(function(){cu.style.opacity=0;demo=false},t+900)}
c.forEach(function(e){var id=e.getAttribute('data-id');e.addEventListener('mouseenter',function(){stopDemo();act(id)});e.addEventListener('click',function(){stopDemo();cur=cur==id?null:id;act(cur)})});s.addEventListener('mouseleave',function(){if(!demo)act(cur)});s.addEventListener('touchstart',stopDemo,{passive:true});
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!rm&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(!en[0].isIntersecting)return;io.disconnect();later(run,350)},{threshold:.5});io.observe(s)}})();

(function(){var r=document.getElementById('snd');if(!r)return;var au=new Audio();au.loop=true;var cur='the_road_ahead',w=r.querySelector('.snd-w'),tm=r.querySelector('.snd-tm'),pl=r.querySelector('.snd-pl');
function seed(id,n){var h=0;for(var i=0;i<id.length;i++)h=(h*31+id.charCodeAt(i))>>>0;var a=[];for(var i=0;i<n;i++){h=(h*1664525+1013904223)>>>0;var e=.35+.65*Math.abs(Math.sin(i/5+(h%97)))*(.5+.5*((h>>8)%100)/100);a.push(Math.round(e*100))}return a}
function bars(id){w.innerHTML=seed(id,88).map(function(v){return '<i style="height:'+v+'%"></i>'}).join('')}
function fmt(s){s=Math.floor(s||0);return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
function tick(){var f=au.duration?au.currentTime/au.duration:0,c=w.children,k=Math.round(c.length*f);for(var i=0;i<c.length;i++)c[i].classList.toggle('f',i<k);tm.textContent=fmt(au.currentTime);w.setAttribute('aria-valuenow',Math.round(f*100))}
function ui(){r.classList.toggle('on',!au.paused)}
function toggle(){if(!au.src||au.src.indexOf(cur)<0){au.src='https://cdn.jsdelivr.net/gh/EkaterinaYulina/images@13c84a09e345a7283da6ca0e53a63e45310b0242/rally/assets/audio/'+cur+'.mp3'}if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()}
function sel(b){cur=b.getAttribute('data-id');r.querySelector('.snd-bgi').style.backgroundImage='url('+b.getAttribute('data-bg')+')';r.querySelector('.snd-t').textContent=b.getAttribute('data-ttl');r.querySelector('.snd-d').textContent=b.getAttribute('data-ds');[].forEach.call(r.querySelectorAll('.snd-sw button'),function(x){x.classList.toggle('sel',x===b)});au.pause();au.removeAttribute('src');au.load();bars(cur);tick();ui()}
bars(cur);pl.addEventListener('click',toggle);au.addEventListener('timeupdate',tick);au.addEventListener('play',ui);au.addEventListener('pause',ui);
w.addEventListener('click',function(e){if(au.duration&&au.src.indexOf(cur)>=0){var b=w.getBoundingClientRect();au.currentTime=au.duration*(e.clientX-b.left)/b.width}else toggle()});
w.addEventListener('keydown',function(e){if(!au.duration)return;if(e.key==='ArrowRight')au.currentTime=Math.min(au.duration,au.currentTime+3);if(e.key==='ArrowLeft')au.currentTime=Math.max(0,au.currentTime-3)});
r.querySelector('.snd-sw').addEventListener('click',function(e){var b=e.target.closest('button');if(b)sel(b)})})();
