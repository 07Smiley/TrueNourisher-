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
