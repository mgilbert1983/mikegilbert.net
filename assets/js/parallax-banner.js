/* Parallax Banner: moves each .px-bg at a different pace than the page scroll. */
(()=>{
const els=[...document.querySelectorAll('[data-parallax]')];
if(!els.length||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
let queued=false;
const update=()=>{
  queued=false;
  const vh=innerHeight;
  els.forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.bottom<0||r.top>vh)return;
    const bg=el.querySelector('.px-bg');if(!bg)return;
    const max=(bg.offsetHeight-r.height)/2;
    const p=((r.top+r.height/2)-vh/2)/((vh+r.height)/2);
    const c=Math.max(-1,Math.min(1,p));
    bg.style.transform='translate3d(0,'+(-c*max).toFixed(1)+'px,0)';
  });
};
const req=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
addEventListener('scroll',req,{passive:true});
addEventListener('resize',req);
addEventListener('load',req);
req();
})();
