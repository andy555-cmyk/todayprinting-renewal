const L=(c,t=0)=>`product.html?c=${c}&t=${t}`, ix=(arr,c)=>arr.map((x,i)=>[x,L(c,i)]);
const MENU = [
  {name:"명함", img:"img/namecard.jpg", items:ix(["일반명함","고급명함","수입지명함","카드명함","리미티드","아델리오","파비앙","프로렌스"],'namecard')},
  {name:"전단지", img:"img/leaflet.jpg", items:[...ix(["일반전단지","문어발전단지","문고리전단지"],'flyer'),...ix(["A1 일반옵셋 포스터","A2 일반옵셋 포스터","2절 일반옵셋 포스터","4절 일반옵셋 포스터"],'poster')]},
  {name:"리플렛", img:"img/leaflet.jpg", items:ix(["A4 3단접지","B4 3단접지","B5 3단접지","N접지","A4 2단펼침","B5 2단펼침","A4 3단펼침","B5 3단펼침"],'leaflet')},
  {name:"카다로그", img:"img/s_catalog.jpg", items:ix(["A4 사이즈","16절(B5) 사이즈","A4 변형사이즈","A5 사이즈","표지도무송","A4 가로형"],'catalog')},
  {name:"브로셔·팜플렛", img:"img/leaflet.jpg", items:[["스프링접지",L('brochure',0)],["B5 표지타공",L('brochure',1)],["A4 홀더형",L('brochure',2)],["계단식",L('brochure',3)],["삼각접지",L('brochure',5)],["다이아몬드",L('brochure',6)],["6단 병풍",L('brochure',7)],["A4 8페이지",L('brochure',10)],["B5 8페이지",L('brochure',11)],["5단접지",L('brochure',15)]]},
  {name:"책자·교재", img:"img/booklet.jpg", items:[["책자 자동 주문 견적","detail.html"],["기성칼라 표지교재","detail.html"],["주문제작 교재","detail.html"],["별도 견적","product.html?c=bag"]]},
  {name:"노트", img:"img/note.jpg", items:[...ix(["16절 일반노트","16절 스프링노트","A4 일반노트","A4 스프링노트","A5 노트","프라임노트","수첩"],'note'),["오답노트",L('note')],["영어노트",L('note')],["독서기록장",L('note')]]},
  {name:"기타", img:"img/postit.jpg", items:[["포스트잇",L('postit')],["티슈",L('tissue')],["봉투",L('envelope')],["화일",L('folder')],["상장",L('award')],["상장케이스",L('award')],["학원 인쇄물",L('academy')],["쇼핑백",L('bag')],["칼라박스",L('bag',1)]]},
];

/* 메뉴 */
const gnb = document.getElementById('gnb');
const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
gnb.innerHTML = MENU.map((m,i)=>`<li data-i="${i}"><a href="#">${m.name}</a>
  <div class="mega"><div class="wrap"><div class="thumb"><img src="${m.img}" alt="" loading="lazy"></div>
  <div><h4>${m.name} 전체</h4><ul>${m.items.map(([t,h])=>`<li><a href="${h}">${t}</a></li>`).join('')}</ul></div></div></div></li>`).join('');
let closeT;
gnb.querySelectorAll(':scope>li').forEach(li=>{
  li.addEventListener('mouseenter',()=>{clearTimeout(closeT);gnb.querySelectorAll('.open').forEach(o=>o.classList.remove('open'));li.classList.add('open')});
  li.addEventListener('mouseleave',()=>{closeT=setTimeout(()=>li.classList.remove('open'),120)});
  li.querySelector(':scope>a').addEventListener('click',e=>{e.preventDefault();li.classList.toggle('open')});
});

if(new URLSearchParams(location.search).get('motion')==='off') document.documentElement.classList.add('motion-off');

/* 휴대폰 전체 메뉴 */
(()=>{const btn=document.querySelector('.menu-btn');if(!btn)return;
const d=document.createElement('div');d.className='drawer';d.setAttribute('aria-hidden','true');
d.innerHTML=`<div class="dim"></div><nav class="panel" aria-label="전체 메뉴"><div class="dh"><b>전체 메뉴</b><button type="button" aria-label="메뉴 닫기">×</button></div>
<div class="quick"><a href="#">로그인</a><a href="#">원고 올리기</a><a href="#">교정 보기</a><a href="#">견적 문의</a></div>
${MENU.map(m=>`<details><summary>${m.name}</summary><ul>${m.items.map(([t,h])=>`<li><a href="${h}">${t}</a></li>`).join('')}</ul></details>`).join('')}
<p class="tel">견적 상담<b>02&#8209;2275&#8209;8822</b></p></nav>`;
document.body.appendChild(d);
const open=v=>{d.classList.toggle('on',v);d.setAttribute('aria-hidden',!v);document.body.style.overflow=v?'hidden':'';if(v)d.querySelector('.dh button').focus();else btn.focus()};
btn.addEventListener('click',()=>open(true));d.querySelector('.dim').onclick=()=>open(false);d.querySelector('.dh button').onclick=()=>open(false);
addEventListener('keydown',e=>{if(e.key==='Escape'&&d.classList.contains('on'))open(false)});})();
