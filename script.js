const nav=document.getElementById("nav");
const menu=document.querySelector(".menu-toggle");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

const toast=document.getElementById("toast");
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
document.querySelectorAll("[data-toast]").forEach(btn=>btn.addEventListener("click",()=>showToast(btn.dataset.toast)));

const verifyBtn=document.getElementById("verifyBtn");
const batch=document.getElementById("batch");
const result=document.getElementById("verifyResult");
function verify(){const value=batch.value.trim().toUpperCase();if(!value){result.textContent="Enter a batch ID to run the demo.";result.style.color="#8a6e36";return}if(value==="TN-2026-001"){result.innerHTML="✓ <strong>Demo batch verified.</strong> Authenticity record found for TN-2026-001.";result.style.color="#3f654c"}else{result.innerHTML="○ <strong>No demo record found.</strong> Try <b>TN-2026-001</b>.";result.style.color="#8a6e36"}}
verifyBtn.addEventListener("click",verify);batch.addEventListener("keydown",e=>{if(e.key==="Enter")verify()});

const modal=document.getElementById("quizModal"), openQuiz=document.getElementById("openQuiz"), closeQuiz=document.getElementById("closeQuiz");
const steps=[...document.querySelectorAll(".quiz-step")];let answers=[];
function openModal(){modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";steps.forEach((s,i)=>s.classList.toggle("hidden",i!==0));answers=[]}
openQuiz?.addEventListener("click",openModal);closeQuiz?.addEventListener("click",closeModal);document.querySelector(".modal-backdrop")?.addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeModal()});
document.querySelectorAll(".choice-grid button").forEach(btn=>btn.addEventListener("click",()=>{
  answers.push(btn.dataset.choice);const current=steps.findIndex(s=>!s.classList.contains("hidden"));steps[current].classList.add("hidden");
  if(current<steps.length-1){steps[current+1].classList.remove("hidden");if(current===1){document.getElementById("profileTitle").textContent=answers[0]+" • "+answers[1];document.getElementById("profileText").textContent="Your demo profile is ready. Explore the collection and shape a simple wellness routine at your own pace."}}
}));
document.getElementById("finishQuiz")?.addEventListener("click",()=>{closeModal();document.getElementById("collection").scrollIntoView({behavior:"smooth"});showToast("Demo profile complete — explore the collection.")});

const cartState={};
const cartDrawer=document.getElementById("cartDrawer"), cartItems=document.getElementById("cartItems"), cartCount=document.getElementById("cartCount"), cartSubtotal=document.getElementById("cartSubtotal");
function money(n){return "₹"+n.toLocaleString("en-IN")}
function renderCart(){
  const items=Object.values(cartState);
  const count=items.reduce((s,x)=>s+x.qty,0), subtotal=items.reduce((s,x)=>s+x.price*x.qty,0);
  cartCount.textContent=count; cartSubtotal.textContent=money(subtotal);
  if(!items.length){cartItems.innerHTML='<div class="empty-cart"><span>✦</span><b>Your cart is waiting.</b><p>Add a ritual from the collection to get started.</p></div>';return}
  cartItems.innerHTML=items.map((x)=>'<div class="cart-item"><div class="cart-thumb">'+x.name.split(" ")[0]+'</div><div><h4>'+x.name+'</h4><small>'+money(x.price)+' each</small><div class="qty"><button data-minus="'+x.name+'">−</button><span>'+x.qty+'</span><button data-plus="'+x.name+'">+</button></div></div><strong class="cart-item-total">'+money(x.price*x.qty)+'</strong></div>').join("");
  cartItems.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));
  cartItems.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));
}
function changeQty(name,delta){if(!cartState[name])return;cartState[name].qty+=delta;if(cartState[name].qty<=0)delete cartState[name];renderCart()}
function addToCart(name,price){if(!cartState[name])cartState[name]={name,price,qty:0};cartState[name].qty++;renderCart();openCart();showToast(name+" added to cart")}
function openCart(){cartDrawer.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeCart(){cartDrawer.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");if(!document.getElementById("checkoutModal").classList.contains("open"))document.body.style.overflow=""}
document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(b.dataset.add,Number(b.dataset.price))));
document.getElementById("openCart")?.addEventListener("click",openCart);document.getElementById("closeCart")?.addEventListener("click",closeCart);document.getElementById("cartBackdrop")?.addEventListener("click",closeCart);

const checkoutModal=document.getElementById("checkoutModal");
function openCheckout(){const total=Object.values(cartState).reduce((s,x)=>s+x.price*x.qty,0);if(!total){showToast("Your cart is empty");return}document.getElementById("checkoutTotal").textContent=money(total);checkoutModal.classList.add("open");checkoutModal.setAttribute("aria-hidden","false")}
function closeCheckout(){checkoutModal.classList.remove("open");checkoutModal.setAttribute("aria-hidden","true");if(!cartDrawer.classList.contains("open"))document.body.style.overflow=""}
document.getElementById("checkoutBtn")?.addEventListener("click",openCheckout);document.getElementById("closeCheckout")?.addEventListener("click",closeCheckout);document.getElementById("checkoutBackdrop")?.addEventListener("click",closeCheckout);
document.getElementById("placeOrder")?.addEventListener("click",()=>{const name=document.getElementById("checkoutName").value.trim();if(!name){showToast("Please enter your name");return}closeCheckout();closeCart();Object.keys(cartState).forEach(k=>delete cartState[k]);renderCart();showToast("Demo order placed — thank you, "+name+" ✦")});

document.getElementById("sortProducts")?.addEventListener("change",(e)=>{
 const grid=document.getElementById("productGrid"), cards=[...grid.children];
 cards.sort((a,b)=>e.target.value==="low"?Number(a.dataset.price)-Number(b.dataset.price):e.target.value==="high"?Number(b.dataset.price)-Number(a.dataset.price):0);
 cards.forEach(x=>grid.appendChild(x));
});
renderCart();
