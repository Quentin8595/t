let scores={1:0,2:0};
let suddenTarget=7;
let currentSuddenPlayer=0;
let funActions=[
  "Lancer de la mauvaise main à chaque lancé",
  "Lancer les yeux fermés à chaque lancé",
  "Lancer dos tourné à chaque lancé",
  "Lancer avec une jambe levée à chaque lancé",
  "Lancer accroupi à chaque lancé",
  "Si vous ne lancez pas sur la cible vous devez enlever un palet de votre choix à vous"
];
let tournamentPlayers=[];

// NAVIGATION
function goTo(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id!=="score80") resetScore();
  if(id==="funMode") resetFun();
}

// 80 POINTS
function add(team,val){
  scores[team]+=val;
  if(scores[team]<0) scores[team]=0;
  updateScore(team);
}

function addInput(team){
  const val=parseInt(document.getElementById("input"+team).value);
  if(!isNaN(val)){
    scores[team]+=val;
    updateScore(team);
    document.getElementById("input"+team).value="";
  }
}

function updateScore(team){
  const el=document.getElementById("s"+team);
  el.textContent=scores[team];
  el.style.textAlign="center";
  if(scores[team]>=80){
    el.classList.add("win");
    confetti();
    document.getElementById("winMsg").textContent="VICTOIRE !";
  } else {
    el.classList.remove("win");
    document.getElementById("winMsg").textContent="";
  }
}

function resetScore(){
  scores={1:0,2:0};
  ["s1","s2"].forEach(id=>{
    const el=document.getElementById(id);
    el.textContent="0";
    el.classList.remove("win");
    el.style.textAlign="center";
  });
  ["input1","input2"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("winMsg").textContent="";
}

// CONFETTIS
function confetti(){
  for(let i=0;i<50;i++){
    const c=document.createElement("div");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.background=["#facc3a","#8bc34a","#795548","#ff5722","#2196f3"][Math.floor(Math.random()*5)];
    c.style.width=c.style.height=(Math.random()*8+5)+"px";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),2500);
  }
}

// MORT SUBITE
function startSudden(){
  currentSuddenPlayer=0;
  suddenTarget=Math.floor(Math.random()*6)+5;
  document.getElementById("target").textContent=suddenTarget;
  goTo("sudden");
}

function nextSudden(){
  suddenTarget += Math.floor(Math.random()*3)+1;
  document.getElementById("target").textContent=suddenTarget;
}

// FUN MODE
function resetFun(){
  document.getElementById("funMsg").innerHTML=
    'Chaque équipe lance à tour de rôle ses 6 palets en effectuant l\'action demandée. À la fin des 12 palets lancés, l\'équipe avec le plus de points gagne la manche, puis on recommence pour la suivante avec une nouvelle action. <span style="font-style:italic;">Pour plus de détails, consultez les règles.</span>';
}

function funAction(){
  const action = funActions[Math.floor(Math.random()*funActions.length)];
  document.getElementById("funMsg").textContent="L'action de cette manche sera : "+action;
}

// PDF
function openPDF(){ window.open("regles.pdf","_blank"); }

// TOURNOI
function startTournament(){
  tournamentPlayers=[];
  let num=parseInt(prompt("Nombre de joueurs/équipes ? (4-10)"));
  if(isNaN(num)||num<4||num>10) return alert("Nombre invalide !");
  for(let i=0;i<num;i++){
    let name=prompt("Nom du joueur "+(i+1));
    tournamentPlayers.push(name);
  }
  displayTournament();
}

function displayTournament(){
  goTo("tournament");
  const container=document.getElementById("tournamentBracket");
  container.innerHTML="";
  for(let i=0;i<tournamentPlayers.length;i+=2){
    if(i+1<tournamentPlayers.length){
      const div=document.createElement("div");
      div.textContent=tournamentPlayers[i]+" vs "+tournamentPlayers[i+1];
      container.appendChild(div);
    } else {
      const div=document.createElement("div");
      div.textContent=tournamentPlayers[i]+" passe au tour suivant";
      container.appendChild(div);
    }
  }
}
