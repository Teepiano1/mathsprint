//Get all sections in index
const homePage = document.getElementById("homePage");
const mathsChoice = document.getElementById("mathsChoice");
const gameDisplay = document.getElementById("gameDisplay");
const resultDisplay = document.getElementById("result");
const body = document.body;
const gameMode = document.getElementById("gameMode");
gameMode.style.display = "none"

const gameDisplayBody = document.getElementById("game-display-body");
const questionDiv = document.getElementById("question");
let totalNumSet = null;
let NumquestAns = null;
let correctAns = null;
let currentScore = null;
let totalTimeSpent = null;
let defaultTime = null;
let lhs=null;
let rhs=null;
let displayedAns=null;
let currentQuest=null;
let answeredQuest=null;

//timer function

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let gametimer;


//timer function ends


const randomQuest = ['+', '-', '*', '/'];
//create global variables needed
let username = null;
let userGameChoice = null;
let finalChoice = null;
///get enter game button 
const entergameBtn = document.getElementById('enterGame');

//and add event listener to make it open next screen on click after validation
entergameBtn.addEventListener('click', () => {
    //take the value of username
    username = document.getElementById('username').value;
    homeErroDisplay = document.getElementById('homeError');
    //check if user enter a name if user enter name open next screen else display error
    if (username === "") {
        homeErroDisplay.innerHTML = "Please enter a name";
    }
    else {
        homeErroDisplay.innerHTML = "";
        //set home diplay to none
        homePage.style.display = "none";
        //display Levels        
        gameMode.style = "animation:modalKeyFrame 0.8s 1; display:flex"
        //display game page        
        // mathsChoice.style.display = "flex";
    }
    document.getElementById('usernameDisplay').innerHTML = username;

})

//get user selected modes
const modeSelection = document.querySelectorAll(".mode");
modeSelection.forEach(mode => {
    mode.addEventListener('click', () => {
        //get the first two letter of the selected options and set game mode to that
        totalNumSet = Number(mode.innerHTML.slice(0, 2));
        //display the next page where user choose the type of equation and set this page to none
        gameMode.style.display = "none";

        mathsChoice.style = "animation:gameKeyFrame 0.8s 1; display: flex;"

    })
});
//create a timer function 



function startTime() {
    gametimer = setInterval(() => { timer(); }, 10);
}


function resetTime() {
    clearInterval(gametimer);
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    defaultTime = 0;
    document.getElementById("clock").innerHTML = "00:00:00:0000";
}
function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    document.getElementById("clock").innerHTML = "<span class='time-counter hour'>" + hour + "</span>:<span class='time-counter minutes'>" + minute + "</span>:<span class='time-counter sec'>" + second + "</span>:<span class='time-counter minisec'>" + millisecond+"</span>";
    //get total time spent
    ++defaultTime;
    totalTimeSpent = second;
}

const trueBtn = document.getElementById('true');
const falseBtn = document.getElementById('false');
//get user selected choice
const userChoice = document.querySelectorAll(".userChoice");
//add eventlisterner to each choice
userChoice.forEach(GameChoicediv => {
    GameChoicediv.addEventListener('click', () => {
        //close current scrren and open the next screen
        gameDisplay.style = "animation:modalKeyFrame 0.8s 1; display:flex"
        mathsChoice.style.display = "none";

        //update user choice

        userGameChoice = GameChoicediv.innerHTML;
        //display Game base on user selection
        document.getElementById('userSelection').innerHTML = userGameChoice;
            GenerateQuestion();
            startTime()
        
        
        //add eventlistener to both button with checkAns function
        trueBtn.addEventListener('click', () => {
            checkAns("true");
        });
        falseBtn.addEventListener('click', () => {
            checkAns("false");
        });
        //function that checks answer
        trueBtn.style.display = "flex"
        falseBtn.style.display = "flex"
    })    
})    

//questions Generated 
function GenerateQuestion(){

    if (userGameChoice == "Mix") {
        //randomly pic a mathimatical sign
        let randomSignPicker = Math.floor(Math.random() * 3);
        finalChoice = randomQuest[randomSignPicker];

    }
    else {
        finalChoice = userGameChoice;
    }
    //generate LHs and RHS
    lhs = Math.floor(Math.random() * 20) + 1;
    rhs = Math.floor(Math.random() * 20) + 1;

    //generate specialy for division so that lhs will always be greater than rhs and division will be by 1, 2,5 or 10, also 
    if (finalChoice == "/") {
        let rand = Math.floor(Math.random() * 8) + 1;
        lhs = (rand * 20);
        //create an arrary for what you are dividing by
        const rhsArray = [1, 2, 5, 10];
        let rhsSelector = Math.floor(Math.random() * 3);
        rhs = rhsArray[rhsSelector];
    }
    //ensure that lHS is greather than rhs when user selects -
    if (finalChoice == "-") {
        lhs = Math.floor(Math.random() * 40) + 30;
    }
    //ensure that simple numbers are genrated for multiplication preferably 1-12
    if (finalChoice == "*") {
        lhs = Math.floor(Math.random() * 11);
        rhs = Math.floor(Math.random() * 11) + 1;
    }

    //generate answer for the displayed questions
    let dummyAns = Math.floor(Math.random() * 5);
    let randMixAns = randomQuest[Math.floor(Math.random() * 1)];
    displayedAns = eval(lhs + finalChoice + rhs + randMixAns + dummyAns);

    //display the generated question
    gameDisplayBody.innerHTML = "<div id='question' class='current'><div class='lhs'>" + lhs + "</div><div class='sign'>" + finalChoice + "</div><div class='rhs'>" + rhs + "</div><div>=</div><div id='equal'>" + displayedAns + "</div></div>";


}


function checkAns(userOpt) {

        //collect each question varable
        const lhsQuest = document.getElementsByClassName("lhs")[0].innerHTML;
        const rhsQuest = document.getElementsByClassName("rhs")[0].innerHTML;
        const questAns = document.getElementById("equal").innerHTML;
        const sign = document.getElementsByClassName("sign")[0].innerHTML;

        const realAns = eval(lhsQuest + sign + rhsQuest);
        const solution = (questAns == realAns).toString()
        //get score board
        correctAns = document.getElementById("correctAns").innerHTML;
        NumquestAns = document.getElementById("NumquestAns");

        //check if solution and user answer is true
        if (solution === userOpt) {
            //update score board
            currentScore = Number(correctAns) + 1;
            document.getElementById("correctAns").innerHTML = currentScore;
        }
        //update number ofquestions answered
        currentQuest = Number(NumquestAns.innerHTML) +1;
        NumquestAns.innerHTML = currentQuest;

        //restyle time to hasten user
        if (Number(NumquestAns.innerHTML / totalNumSet) > 0.5) {
            const timeCounter = document.getElementById("clock");
            timeCounter.style.backgroundColor="red";
        }
    
    //Check if total Number answered <= number chooses
     answeredQuest = Number(document.getElementById("NumquestAns").innerHTML);
    if (answeredQuest < totalNumSet) {
    //generate question
        GenerateQuestion(totalNumSet);
    }
    else {
        //hide game display
        gameDisplay.style.display = "none";
        resultDisplay.style = "animation:gameKeyFrame 0.8s 1; display:flex"
        //hide btn
        falseBtn.style.display = "none"
        trueBtn.style.display = "none"
        let userRate = eval((currentScore / totalNumSet) / parseInt(totalTimeSpent));
        //properly display game result
        document.getElementById('userInfo').innerHTML = username;
        document.getElementById('totalQuestionsAnswerd').innerHTML = totalNumSet;
        document.getElementById('correctlyAnswerd').innerHTML = currentScore;
        let missedQuestions = eval(totalNumSet - currentScore);
        document.getElementById('questionMissed').innerHTML = missedQuestions;
        document.getElementById('timeSpent').innerHTML = totalTimeSpent + 'Seconds';

        resetScore();
        resetTime()
    }
}

function resetScore() {
    //reset all score
    correctAns = document.getElementById("correctAns");
    NumquestAns = document.getElementById("NumquestAns");
    correctAns.innerHTML = 0;
    NumquestAns.innerHTML = 0;
    currentScore = 0;
}
function playAgain() {
    //make result paage display none
    resultDisplay.style.display = "none";
    //make player Play again 
    homePage.style.display = "none";
    //display game choice page
    mathsChoice.style = "animation:gameKeyFrame 0.8s 1; display:flex"
    //level selection set to none
    gameMode.style.display = "none";
    
    //rest time
    resetTime()
}

function quit() {
    //take player home page
    //make result paage display none
    resultDisplay.style.display = "none";
    //game choice page set to none
    mathsChoice.style.display = "none";
    //display home page
    //level selection set to none
    gameMode.style.display = "none";
    homePage.style = "animation:gameKeyFrame 0.8s 1; display:flex"
}
