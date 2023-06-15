//Get all sections in index
const homePage = document.getElementById("homePage");
const mathsChoice = document.getElementById("mathsChoice");
const gameDisplay = document.getElementById("gameDisplay");
const resultDisplay = document.getElementById("result");
const body=document.body;
const gameMode = document.getElementById("gameMode");

const gameDisplayBody = document.getElementById("game-display-body");
const questionDiv = document.getElementById("question");
let totalNumSet = 0;
let NumquestAns=0;
let correctAns=0;
let currentScore="";
let totalTimeSpent = 0;
let defaultTime = 0;


const randomQuest = ['+', '-', '*', '/'];
//create global variables needed
let username="";
let userGameChoice="";
let finalChoice ="";
///get enter game button 
const entergameBtn= document.getElementById('enterGame');

//and add event listener to make it open next screen on click after validation
entergameBtn.addEventListener('click', ()=>{
    //take the value of username
    username=document.getElementById('username').value;
    homeErroDisplay = document.getElementById('homeError');
    //check if user enter a name if user enter name open next screen else display error
    if(username===""){
        homeErroDisplay.innerHTML = "Please enter a name";
    }
    else{
        homeErroDisplay.innerHTML = "";
        //set home diplay to none
        homePage.style.display="none";
        //display Levels        
        gameMode.style.display = "flex";
        //display game page        
       // mathsChoice.style.display = "flex";
    }
    document.getElementById('usernameDisplay').innerHTML = username;

})

//get user selected modes
const modeSelection = document.querySelectorAll(".mode");
modeSelection.forEach(mode => {
    mode.addEventListener('click',()=>{
        //get the first two letter of the selected options and set game mode to that
        totalNumSet=Number(mode.innerHTML.slice(0,2));
        //display the next page where user choose the type of equation and set this page to none
        gameMode.style.display = "none";
            
       mathsChoice.style.display = "flex";

    })
});
//create a timer function 

const timer =()=> {
    ///time function
    timeInterval=setInterval(showTime, 1000);   
    showTime();
}
function showTime() {
    let hour = Math.floor(defaultTime / 3600);
    let minute = Math.floor((defaultTime - hour * 3600) / 60);
    let seconds = defaultTime - (hour * 3600 + minute * 60);

    document.getElementById("clock").innerHTML = hour + ":" + minute + ":" + seconds;
    ++defaultTime;
    totalTimeSpent = defaultTime;
}

//get user selected choice
const userChoice = document.querySelectorAll(".userChoice");
//add eventlisterner to each choice
userChoice.forEach(GameChoicediv=>{
    GameChoicediv.addEventListener('click',()=>{
        //close current scrren and open the next screen
        gameDisplay.style.display = "flex";
        mathsChoice.style.display = "none";

        //update user choice

        userGameChoice = GameChoicediv.innerHTML;

        //display Game base on user selection
        document.getElementById('userSelection').innerHTML = userGameChoice;
        checkAns("none", totalNumSet);
        timer()
     })
})



const trueBtn = document.getElementById('true');
const falseBtn = document.getElementById('false');


//add eventlistener to both button with checkAns function
trueBtn.addEventListener('click', ()=>{
    checkAns("true", totalNumSet);
});
falseBtn.addEventListener('click', ()=>{
    checkAns("false", totalNumSet);
});

//function that checks answer



function checkAns(userOpt, totalNumSet) {
    const currentDiv = document.getElementsByClassName("current")[0];


    //check if user pick mix
    if (userGameChoice == "Mix") {
        //randomly pic a mathimatical sign
        let randomSignPicker = Math.floor(Math.random() * 3);
        finalChoice = randomQuest[randomSignPicker];

    }
    else {
        finalChoice = userGameChoice;
    }
    if (currentDiv){

        currentDiv.classList.remove("current");    

        //collect each question varable
        const lhsQuest = document.getElementsByClassName("lhs")[0].innerHTML;
        const rhsQuest = document.getElementsByClassName("rhs")[0].innerHTML;
        const questAns =document.getElementById("equal").innerHTML;

        const realAns = eval(lhsQuest + finalChoice + rhsQuest);
        const solution = (questAns == realAns).toString()
        
        //get score board
        const correctAns = document.getElementById("correctAns");
        const NumquestAns = document.getElementById("NumquestAns");

        //check if solution and user answer is true
        if (solution===userOpt){
           
            //update score board
            currentScore= Number(correctAns.innerHTML)+1;
            correctAns.innerHTML = currentScore;
        }
        //update number ofquestions answered
        let currentQuest = Number(NumquestAns.innerHTML) + 1;
            NumquestAns.innerHTML = currentQuest;
       
    }
       

    //Check if total Number answered <= number chooses
    const answeredQuest = Number(document.getElementById("NumquestAns").innerHTML);
    if (answeredQuest <totalNumSet){
    //generate LHs and RHS
    let lhs = Math.floor(Math.random() * 20)+1;
    let rhs = Math.floor(Math.random() * 20)+1;

    //generate specialy for division so that lhs will always be greater than rhs and division will be by 1, 2,5 or 10, also 
    if (finalChoice =="/"){
        let rand = Math.floor(Math.random()*8)+1;
        lhs = (rand * 20);
        //create an arrary for what you are dividing by
        const rhsArray= [1,2,5,10];
        let rhsSelector = Math.floor(Math.random() * 3);
        rhs= rhsArray[rhsSelector];
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


    //generate answer

    let dummyAns = Math.floor(Math.random() * 5);
    let randMixAns = randomQuest[Math.floor(Math.random() * 1)];
    let displayedAns = eval(lhs + finalChoice + rhs + randMixAns + dummyAns);

    //generate new question
    //remove question class list from other question
    
    gameDisplayBody.innerHTML = "<div id='question' class='current'><div class='lhs'>" + lhs + "</div><div class='sign'>" + finalChoice + "</div><div class='rhs'>" + rhs + "</div><div>=</div><div id='equal'>" + displayedAns +"</div></div>";
    //increase number of Questions ansed
    NumquestAns++;
    }
    else{
        //hide game display
        gameDisplay.style.display="none";
        resultDisplay.style.display="flex";
        let userRate = eval((currentScore / totalNumSet) / parseInt(totalTimeSpent));
        //properly display game result
        document.getElementById('userInfo').innerHTML = username;
        document.getElementById('totalQuestionsAnswerd').innerHTML = totalNumSet;
        document.getElementById('correctlyAnswerd').innerHTML = currentScore;
        let missedQuestions = eval(totalNumSet-currentScore);
        document.getElementById('questionMissed').innerHTML = missedQuestions;
        document.getElementById('timeSpent').innerHTML = totalTimeSpent+'Seconds';

        document.getElementById('rating').innerHTML = userRate+" Correct Questions Per Seconds";
        
        resetScore();
        //rest time
        totalTimeSpent=0;
        defaultTime=0;
        clearInterval(showTime); 
    }
}

function resetScore(){
//reset all score
    const correctAns = document.getElementById("correctAns");
    const NumquestAns = document.getElementById("NumquestAns");
    correctAns.innerHTML=0;
    NumquestAns.innerHTML=0;
    currentScore = 0;

}
function playAgain(){
    //make result paage display none
    resultDisplay.style.display = "none";
    //make player Play again 
    homePage.style.display = "none";
    //display game choice page
    mathsChoice.style.display = "flex";
    //level selection set to none
    gameMode.style.display = "none";

    
    
}

function quit (){
//take player home page
    //make result paage display none
    resultDisplay.style.display = "none";
    //game choice page set to none
    mathsChoice.style.display = "none";
    //display home page
    //level selection set to none
    gameMode.style.display = "none";
    homePage.style.display = "flex";


}

