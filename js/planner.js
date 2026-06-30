/* =========================================
   PLACEMENTPREP AI - SMART PLANNER
   planner.js (Part 1)
========================================= */

/* ===========================
   DARK MODE
=========================== */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("plannerTheme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

    themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("plannerTheme","dark");

        themeBtn.textContent="☀️";

    }

    else{

        localStorage.setItem("plannerTheme","light");

        themeBtn.textContent="🌙";

    }

});


/* ===========================
   TASKS
=========================== */

const taskInput=document.getElementById("taskInput");

const addTask=document.getElementById("addTask");

const taskList=document.getElementById("taskList");

const todayTasks=document.getElementById("todayTasks");

const completedTasks=document.getElementById("completedTasks");

const pendingTasks=document.getElementById("pendingTasks");

const goalFill=document.getElementById("goalFill");

const goalPercentage=document.getElementById("goalPercentage");


let tasks=
JSON.parse(localStorage.getItem("plannerTasks"))||[];


/* ===========================
   ADD TASK
=========================== */

addTask.addEventListener("click",()=>{

    const text=taskInput.value.trim();

    if(text===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:text,

        completed:false

    });

    localStorage.setItem(

        "plannerTasks",

        JSON.stringify(tasks)

    );

    taskInput.value="";

    renderTasks();

});


/* ===========================
   RENDER TASKS
=========================== */

function renderTasks(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        if(task.completed){

            li.style.textDecoration="line-through";

            li.style.opacity=".7";

        }

        li.innerHTML=`

        <span>${task.text}</span>

        <div class="task-actions">

        <button
        class="complete-btn">

        ✓

        </button>

        <button
        class="delete-btn">

        ✕

        </button>

        </div>

        `;

        const completeBtn=
        li.querySelector(".complete-btn");

        const deleteBtn=
        li.querySelector(".delete-btn");

        completeBtn.addEventListener("click",()=>{

            tasks[index].completed=
            !tasks[index].completed;

            localStorage.setItem(

                "plannerTasks",

                JSON.stringify(tasks)

            );

            renderTasks();

        });

        deleteBtn.addEventListener("click",()=>{

            tasks.splice(index,1);

            localStorage.setItem(

                "plannerTasks",

                JSON.stringify(tasks)

            );

            renderTasks();

        });

        taskList.appendChild(li);

    });

    updateStats();

}


/* ===========================
   UPDATE STATS
=========================== */

function updateStats(){

    const total=tasks.length;

    const completed=
    tasks.filter(task=>task.completed).length;

    const pending=
    total-completed;

    todayTasks.textContent=total;

    completedTasks.textContent=completed;

    pendingTasks.textContent=pending;

    let percent=0;

    if(total>0){

        percent=Math.round(
            (completed/total)*100
        );

    }

    goalFill.style.width=
    percent+"%";

    goalPercentage.textContent=
    percent+"% Completed";

}

renderTasks();/* =========================================
   POMODORO TIMER
========================================= */

let totalSeconds = 25 * 60;
let timerInterval = null;

const timer = document.getElementById("timer");
const startTimer = document.getElementById("startTimer");
const pauseTimer = document.getElementById("pauseTimer");
const resetTimer = document.getElementById("resetTimer");

function updateTimer() {

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timer.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

updateTimer();

startTimer.addEventListener("click", () => {

    if(timerInterval) return;

    timerInterval = setInterval(() => {

        if(totalSeconds > 0){

            totalSeconds--;

            updateTimer();

        }
        else{

            clearInterval(timerInterval);

            timerInterval = null;

            alert("🎉 Pomodoro Session Completed!");

        }

    },1000);

});

pauseTimer.addEventListener("click",()=>{

    clearInterval(timerInterval);

    timerInterval = null;

});

resetTimer.addEventListener("click",()=>{

    clearInterval(timerInterval);

    timerInterval = null;

    totalSeconds = 25 * 60;

    updateTimer();

});


/* =========================================
   ENTER KEY SUPPORT
========================================= */

taskInput.addEventListener("keypress",(event)=>{

    if(event.key==="Enter"){

        addTask.click();

    }

});


/* =========================================
   CALENDAR
========================================= */

const calendarDays =
document.getElementById("calendarDays");

const monthYear =
document.getElementById("monthYear");

const prevMonth =
document.getElementById("prevMonth");

const nextMonth =
document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar(){

    calendarDays.innerHTML="";

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();

    monthYear.textContent =
        currentDate.toLocaleString("default",{
            month:"long",
            year:"numeric"
        });

    const firstDay =
        new Date(year,month,1).getDay();

    const totalDays =
        new Date(year,month+1,0).getDate();

    for(let i=0;i<firstDay;i++){

        const blank=document.createElement("div");

        calendarDays.appendChild(blank);

    }

    const today = new Date();

    for(let day=1;day<=totalDays;day++){

        const div=document.createElement("div");

        div.textContent=day;

        if(
            day===today.getDate() &&
            month===today.getMonth() &&
            year===today.getFullYear()
        ){

            div.classList.add("today");

        }

        calendarDays.appendChild(div);

    }

}

renderCalendar();

prevMonth.addEventListener("click",()=>{

    currentDate.setMonth(
        currentDate.getMonth()-1
    );

    renderCalendar();

});

nextMonth.addEventListener("click",()=>{

    currentDate.setMonth(
        currentDate.getMonth()+1
    );

    renderCalendar();

});


/* =========================================
   SAVE LAST VISIT
========================================= */

const todayString =
new Date().toLocaleDateString();

localStorage.setItem(
    "plannerLastVisit",
    todayString
);


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(`
📅 Smart Planner Loaded Successfully

PlacementPrep AI

Built by Aman Choudhary
`);