const MENU = [
  {name:"명함", img:"img/namecard.jpg", items:["일반명함","고급명함","수입지명함","카드명함","리미티드","아델리오","파비앙","프로렌스"]},
  {name:"전단지", img:"img/leaflet.jpg", items:["일반전단지","문어발전단지","문고리전단지","A1 일반옵셋 포스터","A2 일반옵셋 포스터","2절 일반옵셋 포스터","4절 일반옵셋 포스터"]},
  {name:"리플렛", img:"img/leaflet.jpg", items:["A4 3단접지","B4 3단접지","B5 3단접지","N접지","A4 2단펼침","B5 2단펼침","A4 3단펼침","B5 3단펼침"]},
  {name:"카다로그", img:"img/booklet.jpg", items:["A4 사이즈","16절(B5) 사이즈","A4 변형사이즈","A5 사이즈","표지도무송","A4 가로형"]},
  {name:"브로셔·팜플렛", img:"img/leaflet.jpg", items:["스프링접지","B5 표지타공","A4 홀더형","계단식","삼각접지","다이아몬드","6단 병풍","A4 8페이지","B5 8페이지","5단접지"]},
  {name:"책자·교재", img:"img/booklet.jpg", items:["책자 자동 주문 견적","기성칼라 표지교재","주문제작 교재","별도 견적"]},
  {name:"노트", img:"img/note.jpg", items:["16절 일반노트","16절 스프링노트","A4 일반노트","A4 스프링노트","A5 노트","프라임노트","수첩","오답노트","영어노트","독서기록장"]},
  {name:"기타", img:"img/note.jpg", items:["포스트잇","티슈","봉투","화일","상장","상장케이스","학원 인쇄물","쇼핑백","칼라박스"]},
];

/* 메뉴 */
const gnb = document.getElementById('gnb');
const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
gnb.innerHTML = MENU.map((m,i)=>`<li data-i="${i}"><a href="#">${m.name}</a>
  <div class="mega"><div class="wrap"><div class="thumb"><img src="${m.img}" alt="" loading="lazy"></div>
  <div><h4>${m.name} 전체</h4><ul>${m.items.map(t=>`<li><a href="${t.startsWith('책자 자동')?'detail.html':'#'}">${t}</a></li>`).join('')}</ul></div></div></div></li>`).join('');
let closeT;
gnb.querySelectorAll(':scope>li').forEach(li=>{
  li.addEventListener('mouseenter',()=>{clearTimeout(closeT);gnb.querySelectorAll('.open').forEach(o=>o.classList.remove('open'));li.classList.add('open')});
  li.addEventListener('mouseleave',()=>{closeT=setTimeout(()=>li.classList.remove('open'),120)});
  li.querySelector(':scope>a').addEventListener('click',e=>{e.preventDefault();li.classList.toggle('open')});
});

if(new URLSearchParams(location.search).get('motion')==='off') document.documentElement.classList.add('motion-off');
