const $=s=>document.querySelector(s);
const petals=document.getElementById("petals"), hearts=document.getElementById("hearts");

function petal(){
  const e=document.createElement("span"); e.className="petal"; e.textContent=Math.random()>.25?"🌹":"🌸";
  e.style.left=Math.random()*100+"vw"; e.style.setProperty("--x",(Math.random()*220-110)+"px");
  e.style.animationDuration=(5+Math.random()*6)+"s"; e.style.fontSize=(12+Math.random()*14)+"px";
  petals.appendChild(e); setTimeout(()=>e.remove(),12000);
}
function heart(){
  const e=document.createElement("span"); e.className="heart-float"; e.textContent=["♥","❤","♡"][Math.floor(Math.random()*3)];
  e.style.left=Math.random()*100+"vw"; e.style.color=`hsl(${345+Math.random()*20}, 75%, 70%)`;
  e.style.fontSize=(10+Math.random()*22)+"px"; hearts.appendChild(e); setTimeout(()=>e.remove(),5500);
}
setInterval(petal,650); setInterval(heart,900);

$("#openBtn").addEventListener("click",()=>{
  document.body.classList.add("opened");
  $("#musicBtn").classList.add("active");
  document.querySelector("#home").nextElementSibling.scrollIntoView({behavior:"smooth"});
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

$("#sweetBtn").addEventListener("click",()=>{
  document.querySelector(".gift-box").classList.toggle("open");
  $("#sweetMsg").classList.toggle("show");
  $("#sweetBtn").textContent=$("#sweetMsg").classList.contains("show")?"Chocolate opened ♥":"Open the chocolate box";
});
$("#chapterBtn").addEventListener("click",()=>{
  $("#book").classList.add("open");
  setTimeout(()=>$("#question").scrollIntoView({behavior:"smooth"}),650);
});
let dodges=0;
$("#thinkingBtn").addEventListener("click",()=>{
  dodges++;
  const msgs=["I understand... take your time 🥺","But my heart is waiting... ❤️","One tiny chance? 🥹","I'll keep saying sorry. ❤️","Okay... whenever you're ready. 🌹"];
  $("#tease").textContent=msgs[Math.min(dodges-1,msgs.length-1)];
  if(dodges<4){
    const x=(Math.random()*160-80), y=(Math.random()*50-25);
    $("#thinkingBtn").style.transform=`translate(${x}px,${y}px)`;
  }
});
$("#yesBtn").addEventListener("click",()=>{
  for(let i=0;i<35;i++) setTimeout(heart,i*35);
  for(let i=0;i<20;i++) setTimeout(petal,i*55);
  $("#final").scrollIntoView({behavior:"smooth"});
});

$("#musicBtn").addEventListener("click",()=>{
  const a=$("#music");
  if(a.src && a.src!==location.href){
    if(a.paused)a.play().catch(()=>{}); else a.pause();
  } else {
    alert("Add a file named romantic.mp3 beside index.html to enable background music.");
  }
});

// Reveal the page even if IntersectionObserver is unavailable.
setTimeout(()=>document.querySelectorAll(".reveal").forEach(x=>x.classList.add("visible")),1500);
