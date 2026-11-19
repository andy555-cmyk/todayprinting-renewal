/* 메인 — 품목 아이콘 16개 · 배너 넘김 · 검색 · 특이한 품목 넘김 */
(()=>{
const g=(d,acc)=>`<svg viewBox="0 0 48 48" fill="none" stroke="#14161a" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${acc}${d}</svg>`;
const C='#00a0e3',Mg='#e5007e',Y='#ffd600';
const CATS=[
 ["칼라박스","product.html?c=bag&t=1",g('<path d="M8 16l16-7 16 7v18l-16 7-16-7z"/><path d="M8 16l16 7 16-7M24 23v18"/>','<path d="M24 23l16-7v18l-16 7z" fill="'+Y+'" stroke="none"/>')],
 ["카다로그<i class=\"lg\">·리플렛</i><br>브로셔<i class=\"lg\">·팜플렛</i>","product.html?c=catalog",g('<path d="M6 12l12-3v30l-12 3zM18 9l12 3v30l-12-3zM30 12l12-3v30l-12 3z"/>','<path d="M30 12l12-3v30l-12 3z" fill="'+C+'" stroke="none"/>')],
 ["명함","product.html?c=namecard",g('<rect x="6" y="14" width="30" height="19" rx="2"/><path d="M12 33v4a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V22a2 2 0 0 0-2-2h-4"/><path d="M11 21h10M11 26h14"/>','<rect x="6" y="14" width="30" height="5" rx="2" fill="'+Mg+'" stroke="none"/>')],
 ["전단지","product.html?c=flyer",g('<path d="M12 6h18l8 8v28H12z"/><path d="M30 6v8h8M17 30h16M17 35h12"/>','<rect x="17" y="17" width="16" height="9" fill="'+Y+'" stroke="none"/>')],
 ["포스터","product.html?c=poster",g('<rect x="10" y="6" width="28" height="36" rx="1"/><path d="M10 34l9-9 6 6 5-5 8 8"/>','<circle cx="29" cy="16" r="4" fill="'+Mg+'" stroke="none"/>')],
 ["봉투","product.html?c=envelope",g('<rect x="6" y="12" width="36" height="24" rx="2"/><path d="M6 14l18 13 18-13"/>','<path d="M6 14l18 13 18-13v-2H6z" fill="'+C+'" stroke="none"/>')],
 ["책자·교재","detail.html",g('<path d="M24 12c-4-3-10-4-17-3v29c7-1 13 0 17 3 4-3 10-4 17-3V9c-7-1-13 0-17 3zM24 12v29"/>','<path d="M24 12c4-3 10-4 17-3v29c-7-1-13 0-17 3z" fill="'+Mg+'" stroke="none"/>')],
 ["홍보용 노트","product.html?c=note",g('<rect x="12" y="6" width="28" height="36" rx="2"/><path d="M8 12h7M8 20h7M8 28h7M8 36h7M20 16h14M20 22h14"/>','<rect x="12" y="6" width="6" height="36" fill="'+Y+'" stroke="none"/>')],
 ["종이 쇼핑백","product.html?c=bag",g('<path d="M10 16h28l2 26H8z"/><path d="M17 16v-3a7 7 0 0 1 14 0v3"/>','<path d="M10 16h28l1 10H9z" fill="'+C+'" stroke="none"/>')],
 ["물티슈","product.html?c=tissue",g('<path d="M8 18c0-4 3-6 7-6h18c4 0 7 2 7 6v14c0 4-3 6-7 6H15c-4 0-7-2-7-6z"/><rect x="17" y="17" width="14" height="8" rx="3"/>','<rect x="17" y="17" width="14" height="8" rx="3" fill="'+Mg+'" stroke="none"/>')],
 ["각티슈","product.html?c=tissue&t=5",g('<rect x="6" y="20" width="36" height="20" rx="2"/><path d="M18 20c0-6 3-12 6-12s6 6 6 12"/>','<rect x="6" y="30" width="36" height="10" fill="'+Y+'" stroke="none"/>')],
 ["포스트잇","product.html?c=postit",g('<path d="M10 14h24v14l-10 10H10z"/><path d="M24 38V28h10"/><path d="M16 8h22v22"/>','<path d="M10 14h24v14l-10 10H10z" fill="'+Y+'" stroke="none"/>')],
 ["화일","product.html?c=folder",g('<path d="M12 6h26v36H12z"/><path d="M8 10h4M8 42V10"/><path d="M12 6l26 36"/>','<path d="M12 6h26L12 42z" fill="'+C+'" fill-opacity=".35" stroke="none"/>')],
 ["폴더","product.html?c=folder&t=3",g('<path d="M6 12h13l4 5h19v23H6z"/><path d="M6 20h36"/>','<path d="M6 12h13l4 5h19v3H6z" fill="'+Mg+'" stroke="none"/>')],
 ["상장·상장케이스","product.html?c=award",g('<rect x="6" y="8" width="36" height="26" rx="2"/><path d="M13 16h22M13 22h14"/><path d="M30 30l-3 12 5-3 5 3-3-12"/>','<circle cx="32" cy="29" r="6" fill="'+Y+'" stroke="#14161a"/>')],
 ["학원 인쇄물","product.html?c=academy",g('<path d="M4 18l20-9 20 9-20 9z"/><path d="M12 22v10c4 4 20 4 24 0V22M42 19v12"/>','<path d="M4 18l20-9 20 9-20 9z" fill="'+C+'" stroke="none"/>')],
];
document.getElementById('cats').innerHTML=CATS.map(c=>`<li><a href="${c[1]}"><span class="ic">${c[2]}</span><b>${c[0]}</b></a></li>`).join('');

/* 배너: 6초마다 넘기고, 마우스를 올리거나 멈춤을 누르면 선다 */
const sl=document.getElementById('slider'),slides=[...sl.querySelectorAll('.slide')],tabs=[...sl.querySelectorAll('.snav button')],pb=document.getElementById('sPause');
const still=document.documentElement.classList.contains('motion-off')||matchMedia('(prefers-reduced-motion:reduce)').matches;
let cur=0,timer,hold=false,manual=still;
const show=i=>{cur=(i+slides.length)%slides.length;slides.forEach((s,k)=>{s.classList.toggle('on',k===cur);s.setAttribute('aria-hidden',k!==cur)});
  tabs.forEach((t,k)=>{t.setAttribute('aria-selected',k===cur);const b=t.querySelector('.bar');b.style.animation='none';void b.offsetWidth;b.style.animation=''});arm()};
const arm=()=>{clearTimeout(timer);if(!hold&&!manual)timer=setTimeout(()=>show(cur+1),6000)};
tabs.forEach((t,k)=>t.onclick=()=>show(k));
sl.addEventListener('mouseenter',()=>{hold=true;sl.classList.add('paused');clearTimeout(timer)});
sl.addEventListener('mouseleave',()=>{hold=false;if(!manual)sl.classList.remove('paused');arm()});
pb.onclick=()=>{manual=!manual;pb.classList.toggle('paused',manual);pb.setAttribute('aria-label',manual?'자동 넘김 다시 켜기':'자동 넘김 멈추기');sl.classList.toggle('paused',manual);arm()};
if(still){pb.classList.add('paused');sl.classList.add('paused')}
show(0);

/* 검색: 품목 이름·종류에서 찾아 바로 이동 */
const F=document.getElementById('search');
F.onsubmit=e=>{e.preventDefault();const q=document.getElementById('q').value.replace(/\s/g,'');const miss=document.getElementById('miss');
  if(!q){miss.textContent='찾을 인쇄물 이름을 써 주세요';return}
  for(const [k,p] of Object.entries(PRODUCTS)){
    if(p.name.replace(/\s/g,'').includes(q)||q.includes(p.name.replace(/[·\s]/g,'').slice(0,2))){location.href=p.link||`product.html?c=${k}`;return}
    const t=(p.types||[]).findIndex(x=>x[0].replace(/\s/g,'').includes(q));
    if(t>=0){location.href=`product.html?c=${k}&t=${t}`;return}}
  miss.textContent=`「${q}」은 바로 주문 품목에 없어요 · 02‑2275‑8822로 물어보세요`};

/* 특이한 명함·브로셔 넘김 */
const car=document.getElementById('car'),stepW=()=>car.querySelector('a').offsetWidth+14;
document.getElementById('cPrev').onclick=()=>car.scrollBy({left:-stepW()});
document.getElementById('cNext').onclick=()=>car.scrollBy({left:stepW()});
})();
