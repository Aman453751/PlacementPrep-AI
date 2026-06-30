/* =====================================
   DSA TRACKER
   PlacementPrep AI
   Built by Aman Choudhary
===================================== */


/* ===========================
   QUESTION DATABASE
=========================== */

let questions = [

{
    id:1,
    title:"Two Sum",
    topic:"Arrays",
    difficulty:"Easy",
    solved:false
},

{
    id:2,
    title:"Best Time to Buy and Sell Stock",
    topic:"Arrays",
    difficulty:"Easy",
    solved:false
},

{
    id:3,
    title:"Contains Duplicate",
    topic:"Arrays",
    difficulty:"Easy",
    solved:false
},

{
    id:4,
    title:"Valid Parentheses",
    topic:"Stack",
    difficulty:"Easy",
    solved:false
},

{
    id:5,
    title:"Binary Tree Inorder Traversal",
    topic:"Trees",
    difficulty:"Easy",
    solved:false
},

{
    id:6,
    title:"Merge Intervals",
    topic:"Arrays",
    difficulty:"Medium",
    solved:false
},

{
    id:7,
    title:"Course Schedule",
    topic:"Graphs",
    difficulty:"Medium",
    solved:false
},

{
    id:8,
    title:"Coin Change",
    topic:"Dynamic Programming",
    difficulty:"Medium",
    solved:false
},

{
    id:9,
    title:"Word Search",
    topic:"Backtracking",
    difficulty:"Medium",
    solved:false
},

{
    id:10,
    title:"Median of Two Sorted Arrays",
    topic:"Arrays",
    difficulty:"Hard",
    solved:false
}

];


/* ===========================
   LOCAL STORAGE
=========================== */

const savedQuestions =
JSON.parse(localStorage.getItem("dsaQuestions"));

if(savedQuestions){

    questions = savedQuestions;

}


/* ===========================
   DOM ELEMENTS
=========================== */

const questionContainer =
document.getElementById("questionContainer");

const searchInput =
document.getElementById("searchInput");

const topicFilter =
document.getElementById("topicFilter");

const difficultyFilter =
document.getElementById("difficultyFilter");

const solvedCount =
document.getElementById("solvedCount");

const remainingCount =
document.getElementById("remainingCount");

const percentage =
document.getElementById("percentage");

const progressFill =
document.getElementById("progressFill");


/* ===========================
   RENDER QUESTIONS
=========================== */

function renderQuestions(list){

    questionContainer.innerHTML="";

    list.forEach(question=>{

        const card=document.createElement("div");

        card.className="question-card";

        card.innerHTML=`

        <h3>${question.title}</h3>

        <p>

        ${question.topic}

        </p>

        <span class="badge ${question.difficulty.toLowerCase()}">

        ${question.difficulty}

        </span>

        <br>

        <button
        class="solve-btn"
        data-id="${question.id}">

        ${question.solved ?
        "Solved ✅"
        :
        "Mark Solved"}

        </button>

        `;

        questionContainer.appendChild(card);

    });

    updateProgress();

}/* ===========================
   UPDATE PROGRESS
=========================== */

function updateProgress(){

    const solved =
    questions.filter(q=>q.solved).length;

    const total =
    questions.length;

    const remaining =
    total - solved;

    solvedCount.textContent = solved;

    remainingCount.textContent = remaining;

    const percent =
    Math.round((solved/total)*100);

    percentage.textContent = percent + "%";

    progressFill.style.width =
    percent + "%";

    localStorage.setItem(
        "dsaQuestions",
        JSON.stringify(questions)
    );

}


/* ===========================
   SOLVE BUTTON
=========================== */

questionContainer.addEventListener("click",function(e){

    if(e.target.classList.contains("solve-btn")){

        const id =
        Number(e.target.dataset.id);

        const question =
        questions.find(q=>q.id===id);

        question.solved =
        !question.solved;

        renderQuestions(getFilteredQuestions());

    }

});


/* ===========================
   SEARCH
=========================== */

searchInput.addEventListener("input",()=>{

    renderQuestions(getFilteredQuestions());

});


/* ===========================
   FILTERS
=========================== */

topicFilter.addEventListener("change",()=>{

    renderQuestions(getFilteredQuestions());

});

difficultyFilter.addEventListener("change",()=>{

    renderQuestions(getFilteredQuestions());

});


/* ===========================
   FILTER FUNCTION
=========================== */

function getFilteredQuestions(){

    const search =
    searchInput.value.toLowerCase();

    const topic =
    topicFilter.value;

    const difficulty =
    difficultyFilter.value;

    return questions.filter(question=>{

        const matchSearch =
        question.title
        .toLowerCase()
        .includes(search);

        const matchTopic =
        topic==="All" ||
        question.topic===topic;

        const matchDifficulty =
        difficulty==="All" ||
        question.difficulty===difficulty;

        return (
            matchSearch &&
            matchTopic &&
            matchDifficulty
        );

    });

}


/* ===========================
   INITIAL LOAD
=========================== */

renderQuestions(getFilteredQuestions());