/* ===============================
   DARK MODE
================================ */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("dashboardTheme");

if(savedTheme === "dark"){
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("dashboardTheme","dark");
        themeBtn.textContent = "☀️";
    }
    else{
        localStorage.setItem("dashboardTheme","light");
        themeBtn.textContent = "🌙";
    }

});


/* ===============================
   DSA COUNTER
================================ */

const dsaValue = document.getElementById("dsaValue");
const dsaCount = document.getElementById("dsaCount");

const increaseBtn = document.getElementById("increaseDsa");
const decreaseBtn = document.getElementById("decreaseDsa");

let dsaSolved = Number(localStorage.getItem("dsaSolved")) || 0;

updateDsa();

increaseBtn.addEventListener("click", () => {

    dsaSolved++;

    localStorage.setItem("dsaSolved", dsaSolved);

    updateDsa();

    addActivity(`Solved DSA Question (${dsaSolved})`);
});

decreaseBtn.addEventListener("click", () => {

    if(dsaSolved > 0){

        dsaSolved--;

        localStorage.setItem("dsaSolved", dsaSolved);

        updateDsa();

        addActivity(`Updated DSA Count (${dsaSolved})`);
    }

});

function updateDsa(){

    dsaValue.textContent = dsaSolved;

    dsaCount.textContent = dsaSolved;

    updateReadiness();
}


/* ===============================
   TASK MANAGER
================================ */

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", addTask);

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){

        alert("Enter a task!");

        return;
    }

    tasks.push({

        text:text,
        completed:false

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    addActivity(`Added Task: ${text}`);

    taskInput.value = "";

    renderTasks();
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        if(task.completed){

            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">

                <button class="complete-btn">

                    ✓

                </button>

                <button class="delete-btn">

                    ✕

                </button>

            </div>
        `;

        li.querySelector(".complete-btn")
        .addEventListener("click", ()=>{

            tasks[index].completed =
            !tasks[index].completed;

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            addActivity(
                `Completed Task: ${tasks[index].text}`
            );

            renderTasks();
        });

        li.querySelector(".delete-btn")
        .addEventListener("click", ()=>{

            addActivity(
                `Deleted Task: ${tasks[index].text}`
            );

            tasks.splice(index,1);

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            renderTasks();
        });

        taskList.appendChild(li);

    });

    updateTaskCount();

    updateStreak();

    updateReadiness();

    updateChart();
}


/* ===============================
   TASK COUNT
================================ */

const taskCount =
document.getElementById("taskCount");

function updateTaskCount(){

    taskCount.textContent = tasks.length;
}


/* ===============================
   STUDY STREAK
================================ */

const streakCount =
document.getElementById("streakCount");

let streak =
Number(localStorage.getItem("streak")) || 0;

function updateStreak(){

    const completed =
    tasks.filter(task=>task.completed).length;

    if(completed > 0){

        streak = completed;

        localStorage.setItem(
            "streak",
            streak
        );
    }

    streakCount.textContent = streak;
}


/* ===============================
   READINESS
================================ */

const readinessCount =
document.getElementById("readinessCount");

function updateReadiness(){

    const completed =
    tasks.filter(task=>task.completed).length;

    const taskScore =
    tasks.length === 0
    ? 0
    : (completed / tasks.length) * 100;

    const dsaScore =
    Math.min((dsaSolved / 100) * 100,100);

    const readiness =
    Math.round((taskScore + dsaScore)/2);

    readinessCount.textContent =
    readiness + "%";
}


/* ===============================
   RECENT ACTIVITY
================================ */

const activityList =
document.getElementById("activityList");

let activities =
JSON.parse(
    localStorage.getItem("activities")
) || [];

renderActivities();

function addActivity(message){

    activities.unshift(
        `✓ ${message}`
    );

    if(activities.length > 5){

        activities.pop();
    }

    localStorage.setItem(
        "activities",
        JSON.stringify(activities)
    );

    renderActivities();
}

function renderActivities(){

    activityList.innerHTML = "";

    activities.forEach(activity=>{

        const li =
        document.createElement("li");

        li.textContent = activity;

        activityList.appendChild(li);

    });
}


/* ===============================
   CHART.JS
================================ */

const ctx =
document.getElementById("progressChart");

let chart;

function updateChart(){

    const completed =
    tasks.filter(task=>task.completed).length;

    const readiness =
    parseInt(readinessCount.textContent);

    if(chart){

        chart.destroy();
    }

    chart = new Chart(ctx,{

        type:"bar",

        data:{

            labels:[
                "DSA",
                "Tasks",
                "Readiness"
            ],

            datasets:[{

                label:"Progress",

                data:[
                    dsaSolved,
                    completed,
                    readiness
                ]

            }]
        },

        options:{

            responsive:true,

            maintainAspectRatio:false
        }
    });
}

updateChart();