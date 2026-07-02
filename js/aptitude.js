/* ===========================================
        APTITUDE QUIZ
        PlacementPrep AI
=========================================== */


/* ==========================
      DARK MODE
========================== */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("aptitudeTheme");

if(savedTheme==="dark"){

    document.body.classList.add("dark-mode");

    themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("aptitudeTheme","dark");

        themeBtn.textContent="☀️";

    }

    else{

        localStorage.setItem("aptitudeTheme","light");

        themeBtn.textContent="🌙";

    }

});


/* ==========================
      DOM ELEMENTS
========================== */

const category=document.getElementById("category");

const difficulty=document.getElementById("difficulty");

const questionCount=document.getElementById("questionCount");

const startQuiz=document.getElementById("startQuiz");

const questionText=document.getElementById("questionText");

const optionsContainer=document.getElementById("optionsContainer");

const previousBtn=document.getElementById("previousBtn");

const nextBtn=document.getElementById("nextBtn");

const submitQuiz=document.getElementById("submitQuiz");

const timer=document.getElementById("timer");

const questionNumber=document.getElementById("questionNumber");

const liveScore=document.getElementById("liveScore");


/* ==========================
      QUIZ VARIABLES
========================== */

let quiz=[];

let currentIndex=0;

let score=0;

let answers=[];


/* ==========================
      START QUIZ
========================== */

startQuiz.addEventListener("click",()=>{

    let filtered=[...aptitudeQuestions];

    if(category.value!=="Mixed"){

        filtered=filtered.filter(

            q=>q.category===category.value

        );

    }

    filtered=filtered.filter(

        q=>q.difficulty===difficulty.value

    );

    const total=parseInt(questionCount.value);

    quiz=filtered.slice(0,total);

    if(quiz.length===0){

        alert("No questions found.");

        return;

    }

    currentIndex=0;

    score=0;

    answers=[];

    showQuestion();

    startTimer();

});


/* ==========================
      SHOW QUESTION
========================== */

function showQuestion(){

    const q=quiz[currentIndex];

    questionNumber.textContent=

    `${currentIndex+1} / ${quiz.length}`;

    questionText.textContent=q.question;

    optionsContainer.innerHTML="";

    q.options.forEach(option=>{

        const div=document.createElement("div");

        div.className="option";

        div.textContent=option;

        div.addEventListener("click",()=>{

            answers[currentIndex]=option;

            document.querySelectorAll(".option")

            .forEach(o=>o.style.background="");

            div.style.background="#c7d2fe";

        });

        optionsContainer.appendChild(div);

    });

}


/* ==========================
      NEXT BUTTON
========================== */

nextBtn.addEventListener("click",()=>{

    if(currentIndex<quiz.length-1){

        currentIndex++;

        showQuestion();

    }

});


/* ==========================
      PREVIOUS BUTTON
========================== */

previousBtn.addEventListener("click",()=>{

    if(currentIndex>0){

        currentIndex--;

        showQuestion();

    }

});/* ==========================
      TIMER
========================== */

let totalSeconds = 30 * 60;
let timerInterval;

function startTimer(){

    clearInterval(timerInterval);

    totalSeconds = 30 * 60;

    updateTimer();

    timerInterval = setInterval(()=>{

        totalSeconds--;

        updateTimer();

        if(totalSeconds<=0){

            clearInterval(timerInterval);

            submitQuiz.click();

        }

    },1000);

}

function updateTimer(){

    const minutes=Math.floor(totalSeconds/60);

    const seconds=totalSeconds%60;

    timer.textContent=

    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


/* ==========================
      SUBMIT QUIZ
========================== */

submitQuiz.addEventListener("click",()=>{

    clearInterval(timerInterval);

    score=0;

    quiz.forEach((q,index)=>{

        if(answers[index]===q.answer){

            score++;

        }

    });

    showResult();

});


/* ==========================
      RESULT
========================== */

const finalScore=document.getElementById("finalScore");

const resultProgress=document.getElementById("resultProgress");

const correctAnswers=document.getElementById("correctAnswers");

const wrongAnswers=document.getElementById("wrongAnswers");

const accuracy=document.getElementById("accuracy");

const tipsList=document.getElementById("tipsList");

function showResult(){

    const percent=

    Math.round((score/quiz.length)*100);

    finalScore.textContent=

    percent+"%";

    resultProgress.style.width=

    percent+"%";

    correctAnswers.textContent=

    score;

    wrongAnswers.textContent=

    quiz.length-score;

    accuracy.textContent=

    percent+"%";

    liveScore.textContent=

    score;

    generateTips(percent);

    saveStats(percent);

}


/* ==========================
      TIPS
========================== */

function generateTips(percent){

    tipsList.innerHTML="";

    const tips=[];

    if(percent>=90){

        tips.push("Excellent work! Keep practicing.");

        tips.push("Attempt harder questions.");

    }

    else if(percent>=70){

        tips.push("Good performance.");

        tips.push("Practice speed improvement.");

    }

    else{

        tips.push("Revise basic concepts.");

        tips.push("Practice daily.");

        tips.push("Focus on weak topics.");

    }

    tips.forEach(tip=>{

        const li=document.createElement("li");

        li.textContent=tip;

        tipsList.appendChild(li);

    });

}


/* ==========================
      SAVE STATS
========================== */

const quizCount=document.getElementById("quizCount");

const averageQuizScore=document.getElementById("averageQuizScore");

const bestQuizScore=document.getElementById("bestQuizScore");

function saveStats(percent){

    const history=

    JSON.parse(

        localStorage.getItem("quizHistory")

    ) || [];

    history.push(percent);

    localStorage.setItem(

        "quizHistory",

        JSON.stringify(history)

    );

    loadStats();

}

function loadStats(){

    const history=

    JSON.parse(

        localStorage.getItem("quizHistory")

    ) || [];

    quizCount.textContent=

    history.length;

    if(history.length===0){

        averageQuizScore.textContent="0%";

        bestQuizScore.textContent="0%";

        return;

    }

    let total=0;

    let best=0;

    history.forEach(score=>{

        total+=score;

        if(score>best){

            best=score;

        }

    });

    averageQuizScore.textContent=

    Math.round(total/history.length)+"%";

    bestQuizScore.textContent=

    best+"%";

}


/* ==========================
      LOAD
========================== */

window.addEventListener("load",()=>{

    loadStats();

});


/* ==========================
      CONSOLE
========================== */

console.log(`

🧠 Aptitude Quiz Loaded Successfully

PlacementPrep AI

Built by Aman Choudhary

`);