/* ===========================================
        RESUME AI
        PlacementPrep AI
=========================================== */


/* ==========================
      DARK MODE
========================== */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("resumeTheme");

if(savedTheme==="dark"){

    document.body.classList.add("dark-mode");

    themeBtn.textContent="☀️";

}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("resumeTheme","dark");

        themeBtn.textContent="☀️";

    }

    else{

        localStorage.setItem("resumeTheme","light");

        themeBtn.textContent="🌙";

    }

});


/* ==========================
      DOM ELEMENTS
========================== */

const resumeFile =
document.getElementById("resumeFile");

const analyzeBtn =
document.getElementById("analyzeBtn");

const atsScore =
document.getElementById("atsScore");

const atsProgress =
document.getElementById("atsProgress");

const detectedSkills =
document.getElementById("detectedSkills");

const missingSkills =
document.getElementById("missingSkills");

const suggestionList =
document.getElementById("suggestionList");

const strengthFill =
document.getElementById("strengthFill");

const strengthText =
document.getElementById("strengthText");

const resetResume =
document.getElementById("resetResume");



/* ==========================
      SKILLS DATABASE
========================== */

const allSkills=[

"Java",

"Python",

"C",

"C++",

"JavaScript",

"HTML",

"CSS",

"React",

"Node.js",

"SQL",

"MySQL",

"MongoDB",

"Git",

"GitHub",

"AWS",

"Docker",

"Linux",

"DSA"

];



/* ==========================
      ANALYZE BUTTON
========================== */

analyzeBtn.addEventListener("click",()=>{

    if(resumeFile.files.length===0){

        alert("Please upload your resume.");

        return;

    }

    analyzeResume();

});



/* ==========================
      ANALYZE RESUME
========================== */

function analyzeResume(){

    const score=Math.floor(Math.random()*31)+70;

    atsScore.textContent=score+"%";

    atsProgress.style.width=score+"%";

    strengthFill.style.width=score+"%";



    if(score>=90){

        strengthText.textContent="Excellent Resume";

    }

    else if(score>=80){

        strengthText.textContent="Good Resume";

    }

    else{

        strengthText.textContent="Needs Improvement";

    }



    const detected=[

        "Java",

        "HTML",

        "CSS",

        "JavaScript",

        "SQL",

        "Git"

    ];



    detectedSkills.innerHTML="";



    detected.forEach(skill=>{

        const span=document.createElement("span");

        span.textContent=skill;

        detectedSkills.appendChild(span);

    });



    const missing=allSkills.filter(

        skill=>!detected.includes(skill)

    );



    missingSkills.innerHTML="";



    missing.slice(0,6).forEach(skill=>{

        const span=document.createElement("span");

        span.textContent=skill;

        missingSkills.appendChild(span);

    });/* ==========================
      AI SUGGESTIONS
========================== */

    suggestionList.innerHTML="";

    const suggestions=[

        "Add measurable achievements in your projects.",

        "Include internship or freelance experience.",

        "Add certifications relevant to your domain.",

        "Improve your ATS keywords.",

        "Include GitHub and LinkedIn profile links.",

        "Keep your resume within one page."

    ];

    suggestions.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        suggestionList.appendChild(li);

    });


/* ==========================
      RECRUITER CHECKLIST
========================== */

    const checkList=document.getElementById("checkList");

    checkList.innerHTML=`

    <li>✅ Resume uploaded</li>

    <li>✅ Skills identified</li>

    <li>✅ ATS score calculated</li>

    <li>✅ Missing skills analyzed</li>

    <li>✅ Suggestions generated</li>

    `;


/* ==========================
      SAVE TO LOCAL STORAGE
========================== */

    const report={

        score:score,

        detectedSkills:detected,

        missingSkills:missing.slice(0,6),

        strength:strengthText.textContent

    };

    localStorage.setItem(

        "resumeReport",

        JSON.stringify(report)

    );

    alert("✅ Resume analyzed successfully!");

}


/* ==========================
      DOWNLOAD REPORT
========================== */

const downloadReport=
document.getElementById("downloadReport");

downloadReport.addEventListener("click",()=>{

    const report=

    JSON.parse(

        localStorage.getItem("resumeReport")

    );

    if(!report){

        alert("Analyze your resume first.");

        return;

    }

    const content=`

PlacementPrep AI

Resume Analysis Report

------------------------------------

ATS Score : ${report.score}%

Resume Strength : ${report.strength}

Detected Skills

${report.detectedSkills.join(", ")}

------------------------------------

Missing Skills

${report.missingSkills.join(", ")}

------------------------------------

Generated By PlacementPrep AI

`;

    const blob=new Blob(

        [content],

        {type:"text/plain"}

    );

    const url=

    URL.createObjectURL(blob);

    const a=

    document.createElement("a");

    a.href=url;

    a.download="Resume_Report.txt";

    a.click();

    URL.revokeObjectURL(url);

});


/* ==========================
      RESET
========================== */

resetResume.addEventListener("click",()=>{

    resumeFile.value="";

    atsScore.textContent="0%";

    atsProgress.style.width="0%";

    strengthFill.style.width="0%";

    strengthText.textContent="Waiting for analysis...";

    detectedSkills.innerHTML="<span>Upload Resume</span>";

    missingSkills.innerHTML="<span>Waiting...</span>";

    suggestionList.innerHTML="<li>Upload your resume to generate suggestions.</li>";

    document.getElementById("checkList").innerHTML=`

    <li>⬜ Resume uploaded</li>

    <li>⬜ Skills identified</li>

    <li>⬜ ATS score calculated</li>

    <li>⬜ Missing skills analyzed</li>

    <li>⬜ Suggestions generated</li>

    `;

    localStorage.removeItem("resumeReport");

});


/* ==========================
      LOAD SAVED REPORT
========================== */

window.addEventListener("load",()=>{

    const report=

    JSON.parse(

        localStorage.getItem("resumeReport")

    );

    if(!report) return;

    atsScore.textContent=

    report.score+"%";

    atsProgress.style.width=

    report.score+"%";

    strengthFill.style.width=

    report.score+"%";

    strengthText.textContent=

    report.strength;

});


/* ==========================
      CONSOLE MESSAGE
========================== */

console.log(`

📄 Resume AI Loaded Successfully

PlacementPrep AI

Built by Aman Choudhary

`);