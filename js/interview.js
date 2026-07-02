/* ===========================================
        INTERVIEW AI
        PlacementPrep AI
=========================================== */


/* ==========================
      DARK MODE
========================== */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("interviewTheme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

    themeBtn.textContent = "☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("interviewTheme","dark");

        themeBtn.textContent="☀️";

    }

    else{

        localStorage.setItem("interviewTheme","light");

        themeBtn.textContent="🌙";

    }

});


/* ==========================
      DOM ELEMENTS
========================== */

const interviewType=document.getElementById("interviewType");

const difficulty=document.getElementById("difficulty");

const startInterview=document.getElementById("startInterview");

const questionText=document.getElementById("questionText");

const answerBox=document.getElementById("answerBox");

const submitAnswer=document.getElementById("submitAnswer");

const scoreValue=document.getElementById("scoreValue");

const scoreProgress=document.getElementById("scoreProgress");

const performanceFill=document.getElementById("performanceFill");

const performanceText=document.getElementById("performanceText");

const feedbackList=document.getElementById("feedbackList");


/* ==========================
      QUESTIONS DATABASE
========================== */

const questions={

HR:[

"Tell me about yourself.",

"Why should we hire you?",

"What are your strengths?",

"What is your biggest weakness?",

"Where do you see yourself in 5 years?"

],

Technical:[

"Explain Object Oriented Programming.",

"What is JVM?",

"What is SQL JOIN?",

"Difference between Stack and Queue.",

"What is Operating System?"

],

DSA:[

"Explain Two Sum approach.",

"What is Binary Search?",

"Difference between DFS and BFS.",

"What is Dynamic Programming?",

"Explain Merge Sort."

]

};


/* ==========================
      START INTERVIEW
========================== */

let currentQuestion="";

startInterview.addEventListener("click",()=>{

    const type=interviewType.value;

    const list=questions[type];

    const random=Math.floor(Math.random()*list.length);

    currentQuestion=list[random];

    questionText.textContent=currentQuestion;

    answerBox.value="";

});


/* ==========================
      SUBMIT ANSWER
========================== */

submitAnswer.addEventListener("click",()=>{

    const answer=answerBox.value.trim();

    if(answer===""){

        alert("Please write your answer.");

        return;

    }

    evaluateAnswer(answer);

});


/* ==========================
      EVALUATE ANSWER
========================== */

function evaluateAnswer(answer){

    let score=0;

    const words=answer.split(" ").length;

    if(words>=20){

        score+=40;

    }

    else{

        score+=20;

    }

    if(answer.includes("project") || answer.includes("experience")){

        score+=20;

    }

    if(answer.includes("team")){

        score+=15;

    }

    if(answer.includes("problem")){

        score+=15;

    }

    score+=10;

    if(score>100){

        score=100;

    }

    scoreValue.textContent=score+"%";

    scoreProgress.style.width=score+"%";

    performanceFill.style.width=score+"%";/* ==========================
      PERFORMANCE TEXT
========================== */

    if(score>=90){

        performanceText.textContent="Excellent Performance 🏆";

    }

    else if(score>=75){

        performanceText.textContent="Good Performance 👍";

    }

    else if(score>=60){

        performanceText.textContent="Average Performance 🙂";

    }

    else{

        performanceText.textContent="Needs Improvement 📚";

    }


/* ==========================
      AI FEEDBACK
========================== */

    feedbackList.innerHTML="";

    const feedback=[];

    if(words<20){

        feedback.push("Give a more detailed answer.");

    }

    if(!answer.toLowerCase().includes("project")){

        feedback.push("Mention a project to support your answer.");

    }

    if(!answer.toLowerCase().includes("team")){

        feedback.push("Explain your teamwork experience.");

    }

    if(!answer.toLowerCase().includes("problem")){

        feedback.push("Describe a problem you solved.");

    }

    feedback.push("Maintain confidence during interviews.");

    feedback.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        feedbackList.appendChild(li);

    });


/* ==========================
      SAVE HISTORY
========================== */

    const history=

    JSON.parse(

        localStorage.getItem("interviewHistory")

    ) || [];

    history.push({

        date:new Date().toLocaleDateString(),

        type:interviewType.value,

        score:score

    });

    localStorage.setItem(

        "interviewHistory",

        JSON.stringify(history)

    );

    loadHistory();

    updateStats(history);

    alert("✅ Interview Submitted Successfully!");

}


/* ==========================
      LOAD HISTORY
========================== */

const historyTable=document.getElementById("historyTable");

function loadHistory(){

    const history=

    JSON.parse(

        localStorage.getItem("interviewHistory")

    ) || [];

    historyTable.innerHTML="";

    if(history.length===0){

        historyTable.innerHTML=`

        <tr>

        <td colspan="3">

        No Interview History

        </td>

        </tr>

        `;

        return;

    }

    history.forEach(item=>{

        historyTable.innerHTML+=`

        <tr>

        <td>${item.date}</td>

        <td>${item.type}</td>

        <td>${item.score}%</td>

        </tr>

        `;

    });

}


/* ==========================
      UPDATE STATS
========================== */

const totalInterviews=

document.getElementById("totalInterviews");

const averageScore=

document.getElementById("averageScore");

const bestScore=

document.getElementById("bestScore");

function updateStats(history){

    totalInterviews.textContent=

    history.length;

    let total=0;

    let best=0;

    history.forEach(item=>{

        total+=item.score;

        if(item.score>best){

            best=item.score;

        }

    });

    const avg=

    history.length?

    Math.round(total/history.length):0;

    averageScore.textContent=

    avg+"%";

    bestScore.textContent=

    best+"%";

}


/* ==========================
      LOAD SAVED DATA
========================== */

window.addEventListener("load",()=>{

    const history=

    JSON.parse(

        localStorage.getItem("interviewHistory")

    ) || [];

    loadHistory();

    updateStats(history);

});


/* ==========================
      CONSOLE MESSAGE
========================== */

console.log(`

🎤 Interview AI Loaded Successfully

PlacementPrep AI

Built by Aman Choudhary

`);