const b=document.querySelector('.mt'),n=document.getElementById('nav');
b.onclick=()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)};
const f=document.getElementById('cf');
if(f)f.onsubmit=async e=>{e.preventDefault();const s=document.getElementById('st');s.textContent='Sending...';
try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
if(r.ok){f.reset();s.textContent='Message sent. Thank you.'}else throw 0}catch(_){s.textContent='Message failed. Please email me directly.'}};
/* extras: video rollovers, signature replay, lightbox, scroll reveal */
{
const q=s=>document.querySelectorAll(s);
if(matchMedia('(hover:hover)').matches){
document.addEventListener('mouseover',e=>{const a=e.target.closest&&e.target.closest('.ro[data-v]');if(!a||a.bad)return;let v=a.v;if(!v){v=a.v=document.createElement('video');v.muted=v.loop=v.playsInline=true;v.preload='none';v.onerror=()=>{a.bad=1;v.remove()};v.onplaying=()=>v.classList.add('p');v.src=a.dataset.v;a.append(v)}v.play().catch(()=>{})});
document.addEventListener('mouseout',e=>{const a=e.target.closest&&e.target.closest('.ro[data-v]');if(a&&a.v&&!a.contains(e.relatedTarget))a.v.pause()});
let t;document.addEventListener('mouseover',e=>{const h=e.target.closest&&e.target.closest('.home');if(!h||h.contains(e.relatedTarget))return;const i=h.querySelector('img');i.dataset.s=i.dataset.s||i.src;const g=i.dataset.g||i.dataset.s.replace('logo.png','MIKE_SIGNATURE.gif');clearTimeout(t);i.src=g+'#'+Date.now();t=setTimeout(()=>{i.src=i.dataset.s},2750)})}
let o,im,c,i,last;const L=()=>[...q('[data-lb]')];
const go=d=>{const g=L();i=(i+d+g.length)%g.length;im.src=g[i].currentSrc||g[i].src;im.alt=g[i].alt;c.textContent=(i+1)+' / '+g.length};
const cl=()=>{o.remove();document.body.classList.remove('lbo');last&&last.focus()};
const op=n=>{last=document.activeElement;if(!o){o=document.createElement('div');o.id='lb';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label','Image viewer');
o.innerHTML='<img alt=""><button class="x" aria-label="Close">&#10005;</button><button class="pv" aria-label="Previous image">&#8249;</button><button class="nx" aria-label="Next image">&#8250;</button><div class="c"></div>';im=o.firstChild;c=o.lastChild;
o.onclick=e=>{const b=e.target.closest('button');if(b)b.className=='x'?cl():go(b.className=='pv'?-1:1);else if(e.target!==im)cl()};
let x0;o.ontouchstart=e=>{x0=e.touches.length==1?e.touches[0].clientX:null};
o.ontouchend=e=>{if(x0==null||(window.visualViewport&&visualViewport.scale>1.05))return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(d<0?1:-1)}}
i=n;document.body.append(o);document.body.classList.add('lbo');go(0);o.querySelector('.x').focus()};
document.addEventListener('click',e=>{const g=e.target.closest&&e.target.closest('[data-lb]');if(g)op(L().indexOf(g))});
document.addEventListener('keydown',e=>{const g=e.target.closest&&e.target.closest('[data-lb]');if(g&&e.key=='Enter')return op(L().indexOf(g));if(!o||!o.isConnected)return;
if(e.key=='Escape')cl();if(e.key=='ArrowRight')go(1);if(e.key=='ArrowLeft')go(-1);
if(e.key=='Tab'){const b=[...o.querySelectorAll('button')],f=b.indexOf(document.activeElement);e.preventDefault();b[(f+(e.shiftKey?-1:1)+b.length)%b.length].focus()}});
if(document.body.classList.contains('proj')&&'IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -6% 0px'});
q('main>*:nth-child(n+3):not(footer)').forEach(e=>{e.classList.add('rv');io.observe(e)})}
}
