const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const nav=$('#nav'),menu=$('#menu');menu?.addEventListener('click',()=>nav.classList.toggle('open'));$$('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));$('#year').textContent=new Date().getFullYear();
const toast=$('#toast');let toastTimer;function showToast(m){toast.textContent=m;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
const cart={};const drawer=$('#cartDrawer');function money(n){return '₹'+n.toLocaleString('en-IN')}
function renderCart(){const items=Object.values(cart),count=items.reduce((s,x)=>s+x.qty,0),total=items.reduce((s,x)=>s+x.price*x.qty,0);$('#cartCount').textContent=count;$('#cartSubtotal').textContent=money(total);if(!items.length){$('#cartItems').innerHTML='<div class="empty"><b>Your bag is waiting.</b><p>Add a ritual from the collection to get started.</p></div>';return}$('#cartItems').innerHTML=items.map(x=>`<div class="cart-item"><div class="cart-thumb">${x.name.split(' ')[0]}</div><div><h4>${x.name}</h4><small>${money(x.price)} each</small><div class="qty"><button data-minus="${x.name}">−</button><span>${x.qty}</span><button data-plus="${x.name}">+</button></div></div><strong class="cart-item-total">${money(x.price*x.qty)}</strong></div>`).join('');$$('[data-minus]').forEach(b=>b.onclick=()=>qty(b.dataset.minus,-1));$$('[data-plus]').forEach(b=>b.onclick=()=>qty(b.dataset.plus,1))}
function qty(n,d){cart[n].qty+=d;if(cart[n].qty<=0)delete cart[n];renderCart()}function openCart(){drawer.classList.add('open');document.body.style.overflow='hidden'}function closeCart(){drawer.classList.remove('open');if(!$('#checkoutModal').classList.contains('open'))document.body.style.overflow=''}function add(name,price){cart[name]??={name,price,qty:0};cart[name].qty++;renderCart();openCart();showToast(name+' added to bag')}
$$('[data-add]').forEach(b=>b.onclick=()=>add(b.dataset.add,+b.dataset.price));$('#openCart').onclick=openCart;$('#closeCart').onclick=closeCart;$('#cartBackdrop').onclick=closeCart;renderCart();
const sort=$('#sortProducts'),grid=$('#productGrid');sort.onchange=e=>{let cards=[...grid.children];cards.sort((a,b)=>e.target.value==='low'?a.dataset.price-b.dataset.price:e.target.value==='high'?b.dataset.price-a.dataset.price:0);cards.forEach(x=>grid.appendChild(x))};
$$('.category-row button').forEach(btn=>btn.onclick=()=>{$$('.category-row button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.product').forEach(p=>p.style.display=f==='all'||p.dataset.category===f?'':'none')});
const checkout=$('#checkoutModal');$('#checkoutBtn').onclick=()=>{const total=Object.values(cart).reduce((s,x)=>s+x.price*x.qty,0);if(!total){showToast('Your bag is empty');return}$('#checkoutTotal').textContent=money(total);checkout.classList.add('open')};$('#closeCheckout').onclick=()=>checkout.classList.remove('open');$('#checkoutBackdrop').onclick=()=>checkout.classList.remove('open');$('#placeOrder').onclick=()=>{const n=$('#checkoutName').value.trim();if(!n){showToast('Please enter your name');return}checkout.classList.remove('open');closeCart();Object.keys(cart).forEach(k=>delete cart[k]);renderCart();showToast('Demo order placed — thank you, '+n+' ✦')};
const batch=$('#batch'),vr=$('#verifyResult');$('#verifyBtn').onclick=verify;batch.onkeydown=e=>{if(e.key==='Enter')verify()};function verify(){const v=batch.value.trim().toUpperCase();if(v==='TN-2026-001'){vr.innerHTML='✓ <b>Demo batch verified.</b> Authenticity record found.';vr.style.color='#3f603c'}else{vr.innerHTML=v?'○ <b>No demo record found.</b> Try TN-2026-001.':'Enter a batch ID to verify.';vr.style.color='#8a6e36'}}
const quiz=$('#quizModal'),steps=$$('.quiz-step'),answers=[];$('#openQuiz').onclick=()=>quiz.classList.add('open');$('#closeQuiz').onclick=()=>quiz.classList.remove('open');quiz.querySelector('.drawer-backdrop').onclick=()=>quiz.classList.remove('open');$$('.quiz-step button[data-choice]').forEach(b=>b.onclick=()=>{const i=steps.findIndex(s=>!s.classList.contains('hidden'));answers.push(b.dataset.choice);steps[i].classList.add('hidden');steps[i+1].classList.remove('hidden');if(i===1)$('#profileTitle').textContent=answers[0]+' • '+answers[1]});$('#finishQuiz').onclick=()=>{quiz.classList.remove('open');answers.length=0;steps.forEach((s,i)=>s.classList.toggle('hidden',i!==0));$('#shop').scrollIntoView({behavior:'smooth'});showToast('Your demo ritual is ready ✦')};

/* Premium editorial motion */
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.header');
  const revealTargets=document.querySelectorAll('.signature,.value,.editorial-copy,.shop .section-heading,.category-row,.premium-product,.science-head,.evidence-card,.classical-sources,.science-footer,.ritual-copy,.ritual-card,.verify>div,.closing h2');
  revealTargets.forEach((el,i)=>{el.dataset.reveal=i%4===1?'left':i%4===2?'scale':i%4===3?'right':'up'});
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}});
  },{threshold:.12,rootMargin:'0px 0px -55px 0px'});
  revealTargets.forEach(el=>observer.observe(el));

  const onScroll=()=>{
    header?.classList.toggle('scrolled',window.scrollY>24);
    const photo=document.querySelector('.hero-photo .hero-image');
    if(photo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      const y=Math.min(window.scrollY*.08,32);
      photo.style.transform='scale(1.015) translate3d(0,'+y+'px,0)';
    }
  };
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  document.querySelectorAll('.btn,.link-btn,.catalog-link,.bag').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      if(window.matchMedia('(pointer:coarse)').matches)return;
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.06,y=(e.clientY-r.top-r.height/2)*.06;
      el.style.transform='translate3d('+x+'px,'+y+'px,0)';
    });
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });

  document.querySelectorAll('.premium-product').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      if(window.matchMedia('(pointer:coarse)').matches)return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform='translateY(-10px) perspective(900px) rotateX('+(-y*2.2)+'deg) rotateY('+(x*2.2)+'deg)';
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
});
