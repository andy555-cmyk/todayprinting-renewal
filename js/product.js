/* 품목 상세 — products.js 의 PRODUCTS 한 항목을 받아 옵션·가격을 그린다 */
const $=id=>document.getElementById(id), won=n=>Math.round(n).toLocaleString('ko-KR');
const qs=new URLSearchParams(location.search), KEY=qs.get('c')||'namecard';
if(!PRODUCTS[KEY]||PRODUCTS[KEY].link) location.replace(PRODUCTS[KEY]?.link||'product.html?c=namecard');
const P=PRODUCTS[KEY];
const S={type:Math.min(+qs.get('t')||0,P.types.length-1),qty:P.qty[0]||0,f:P.fields.map(f=>f.mode==='multi'?new Set():0),design:0};
const stepOf=()=>P.qty[0]>=1000?500:P.qty[0]>=200?100:10;
const discT=P.qty[0]>=300?DISC:DISC_SMALL, discOf=q=>discT.filter(d=>q>=d[0]&&d[0]>P.qty[0]).reduce((a,d)=>d[1],0);

document.title=`${P.name} 주문 | 투데이프린팅 시안`;
$('pName').textContent=$('crumbName').textContent=P.name;$('pDesc').textContent=P.desc;
$('pFacts').innerHTML=P.facts.map(f=>`<div><b>${f[0]}</b><span>${f[1]}</span></div>`).join('');
$('pImg').src=P.img;$('pImg').alt=P.name+' 예시 사진';

/* 종류 */
const oType=$('oType');
oType.innerHTML=P.types.map((t,i)=>`<button type="button" aria-pressed="${i===S.type}" data-i="${i}">${t[0]}</button>`).join('');
oType.onclick=e=>{const b=e.target.closest('button');if(!b)return;S.type=+b.dataset.i;oType.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));history.replaceState(null,'',`?c=${KEY}&t=${S.type}`);calc()};

if(P.quote){ // 별도 견적 품목
  ['qtyRow','gOpt','gPost','gDesign'].forEach(id=>$(id).remove());$('nFile').textContent=3;
  document.querySelector('.sum').classList.add('quote');
  $('lines').innerHTML=`<tr><td>별도 견적<small>규격·용지·손잡이에 따라 달라요</small></td><td>상담 뒤 안내</td></tr>`;
  $('price').innerHTML='견적 문의';$('vat').textContent='남겨 주시면 확인한 뒤 연락드려요';document.querySelector('.sum .tot .k').firstChild.textContent='금액';
  $('per').textContent='';$('ship').textContent=`승인 뒤 약 10영업일에 출고`;
  $('acts').innerHTML='<button class="btn solid" type="button">견적 요청 보내기</button><a class="btn line" href="#">카카오톡 상담</a>';
  $('note').textContent='견적 요청은 시안 화면이라 실제로 보내지지 않습니다';
  $('mPrice').textContent='견적 문의';document.querySelector('.mbar .btn').textContent='견적 요청';
} else {
  $('gQuote').remove();
  /* 수량 */
  $('qHint').textContent=`${won(P.qty[0])}${P.unitName}부터 · ${won(stepOf())}${P.unitName} 단위`;
  $('qQuick').innerHTML=P.qty.map(q=>`<button type="button" data-q="${q}">${won(q)}${P.unitName}</button>`).join('');
  $('qQuick').onclick=e=>{const b=e.target.closest('button');if(b){S.qty=+b.dataset.q;calc()}};
  document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{S.qty=Math.max(P.qty[0],S.qty+ +b.dataset.step*stepOf());calc()});
  $('oQty').onchange=()=>{const s=stepOf();S.qty=Math.max(P.qty[0],Math.round((+$('oQty').value.replace(/\D/g,'')||0)/s)*s);calc()};
  /* 옵션 */
  const box=$('oFields');let hasPost=false;
  P.fields.forEach((f,fi)=>{
    if(f.mode==='multi'){hasPost=true;const el=$('oPost');
      el.innerHTML=f.opts.map((o,i)=>`<button type="button" aria-pressed="false" data-i="${i}">${o[0]}</button>`).join('');
      el.onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i,s=S.f[fi];s.has(i)?s.delete(i):s.add(i);b.setAttribute('aria-pressed',s.has(i));calc()};return}
    const row=document.createElement('div');row.className='ofield';const id='f'+fi;
    if(f.ui==='select'){row.innerHTML=`<label class="k" for="${id}">${f.k}</label><select id="${id}">${f.opts.map((o,i)=>`<option value="${i}">${o[0]}</option>`).join('')}</select>`;
      row.querySelector('select').onchange=e=>{S.f[fi]=+e.target.value;calc()}}
    else{row.innerHTML=`<span class="k" id="k${id}">${f.k}</span><div class="chips" role="group" aria-labelledby="k${id}">${f.opts.map((o,i)=>`<button type="button" aria-pressed="${i===0}" data-i="${i}">${o[0]}</button>`).join('')}</div>`;
      const c=row.querySelector('.chips');c.onclick=e=>{const b=e.target.closest('button');if(!b)return;S.f[fi]=+b.dataset.i;c.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));calc()}}
    box.appendChild(row)});
  if(!hasPost){$('gPost').remove();$('gDesign').querySelector('i').textContent=3;$('nFile').textContent=4}
  $('oDesign').innerHTML=DESIGN.map((d,i)=>`<label><input type="radio" name="design" value="${i}" ${i===0?'checked':''}><b>${d[0]}</b><span>${d[2]}</span><em>${d[1]?won(d[1])+'원':'추가 금액 없음'}</em></label>`).join('');
  $('oDesign').onchange=e=>{S.design=+e.target.value;calc()};
}

let shown=0,raf;
function animate(to){
  cancelAnimationFrame(raf);const el=$('price'),from=shown,t0=performance.now(),dur=document.documentElement.classList.contains('motion-off')?0:450;
  const draw=v=>el.innerHTML=won(v)+'<small>원</small>';
  const step=t=>{const p=dur?Math.min(1,(t-t0)/dur):1,e=1-Math.pow(1-p,3);shown=Math.round(from+(to-from)*e);draw(shown);if(p<1)raf=requestAnimationFrame(step)};
  raf=requestAnimationFrame(step);clearTimeout(animate.t);animate.t=setTimeout(()=>{cancelAnimationFrame(raf);shown=to;draw(to)},dur+80);
}

function calc(){
  const T=P.types[S.type];$('mockLab').textContent=T[0];
  if(P.quote)return;
  const q=S.qty,d=discOf(q),item=(base,unit)=>base+(unit-unit*d/100)*q;
  let u=P.unit*T[1];const spec=[T[0]],L=[],post=[];
  P.fields.forEach((f,fi)=>{
    if(f.mode==='mul'){const o=f.opts[S.f[fi]];u*=o[1];spec.push(o[0])}
    else if(f.mode==='add'){const o=f.opts[S.f[fi]];if(o[1]||o[2])L.push([f.k,o[0],item(o[2],o[1])]);else spec.push(o[0].includes(f.k)?o[0]:f.k+' '+o[0])}
    else S.f[fi].forEach(i=>{const o=f.opts[i];post.push(['후가공',o[0],item(o[2],o[1])])});
  });
  L.unshift(['인쇄',spec.join(' · '),item(P.base,u)]);L.push(...post);
  if(S.design){const g=DESIGN[S.design];L.push(['디자인',g[0],g[1]])}
  const supply=Math.round(L.reduce((a,l)=>a+l[2],0)/100)*100,total=Math.round(supply*1.1/10)*10;
  $('lines').innerHTML=L.map(l=>`<tr><td>${l[0]}<small>${l[1]}</small></td><td>${won(Math.round(l[2]/100)*100)}원</td></tr>`).join('')
    +(d?`<tr class="disc"><td>수량 할인</td><td>${won(q)}${P.unitName} · ${d}%&nbsp;적용됨</td></tr>`:'');
  $('vat').textContent=`공급가 ${won(supply)} + 부가세 ${won(total-supply)}`;
  const per=total/q;$('per').textContent=`${P.unitName==='매'?'한 장':'하나'}에 약 ${per<100?per.toFixed(1):won(Math.round(per))}원`;
  const days=P.ship+(post.length?1:0)+(q>=P.qty[P.qty.length-1]?1:0);
  $('ship').textContent=`교정 승인 뒤 약 ${days}영업일에 출고`;
  animate(total);$('mPrice').textContent=won(total)+'원';
  $('oQty').value=won(q);
  $('qQuick').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.q===q));
  window.__est={L,supply,total,d,q};
}

/* 상품 안내 표 — 「재질 · 색」처럼 짝지은 옵션은 묶어서 짧게 */
const optText=f=>{const two=f.opts.filter(o=>o[0].includes(' · '));if(two.length<4)return f.opts.map(o=>o[0]).join(' · ');
  const u=i=>[...new Set(two.map(o=>o[0].split(' · ')[i]))].join('·');return `${u(0)} 세 가지 재질에 ${u(1)}`};
$('infoT').innerHTML=`<tr><th>종류</th><td>${P.types.map(t=>t[0]).join(' · ')}</td></tr>`
  +P.fields.filter(f=>f.mode!=='multi').map(f=>`<tr><th>${f.k}</th><td>${optText(f)}</td></tr>`).join('')
  +P.fields.filter(f=>f.mode==='multi').map(f=>`<tr><th>후가공</th><td>${f.opts.map(o=>o[0]).join(' · ')}</td></tr>`).join('')
  +P.facts.map(f=>`<tr><th>${f[1]}</th><td>${f[0]}</td></tr>`).join('');

/* 다른 품목 */
$('others').innerHTML=Object.entries(PRODUCTS).filter(([k])=>k!==KEY).map(([k,p])=>`<a href="${p.link||'product.html?c='+k}"><span class="ph"><img src="${p.img}" alt="" loading="lazy"></span><b>${p.name}</b></a>`).join('');

/* 파일 */
const fileIn=$('file'),drop=$('drop');
const showFiles=fs=>{$('files').innerHTML=[...fs].map(f=>`<li><span>${f.name}</span><span>${(f.size/1048576).toFixed(1)}MB</span></li>`).join('')};
fileIn.onchange=()=>showFiles(fileIn.files);
['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over')}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over')}));
drop.addEventListener('drop',e=>showFiles(e.dataTransfer.files));

/* 견적서 */
if($('estBtn')){
$('estBtn').onclick=()=>{const E=window.__est,today=new Date().toLocaleDateString('ko-KR');
  $('estTable').innerHTML=`<tr><th>견적일</th><td>${today}</td></tr><tr><th>품목</th><td>${P.name} · ${P.types[S.type][0]} · ${won(E.q)}${P.unitName}</td></tr>`
   +E.L.map(l=>`<tr><th>${l[0]}</th><td>${l[1]} · ${won(Math.round(l[2]/100)*100)}원</td></tr>`).join('')
   +(E.d?`<tr><th>수량 할인</th><td>${E.d}% 적용</td></tr>`:'')
   +`<tr><th>공급가</th><td>${won(E.supply)}원</td></tr><tr><th>부가세</th><td>${won(E.total-E.supply)}원</td></tr><tr><th>합계</th><td><b>${won(E.total)}원</b></td></tr><tr><th>공급자</th><td>투데이프린팅 · 295&#8209;21&#8209;00243 · 02&#8209;2275&#8209;8822</td></tr>`;
  $('est').classList.add('on');$('estClose').focus()};
$('cartBtn').onclick=()=>{const n=$('cartN');n.textContent=+n.textContent+1;n.animate([{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:300})};
}
$('estClose').onclick=()=>$('est').classList.remove('on');
$('est').onclick=e=>{if(e.target.id==='est')$('est').classList.remove('on')};
addEventListener('keydown',e=>{if(e.key==='Escape')$('est').classList.remove('on')});
$('itabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;$('itabs').querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));document.querySelectorAll('.ipanel').forEach(p=>p.classList.toggle('on',p.id===b.dataset.p))};
calc();
