//Get all sections in index
const homePage = document.getElementById("homePage");
const mathsChoice = document.getElementById("mathsChoice");
const gameDisplay = document.getElementById("gameDisplay");
const result = document.getElementById("result");
const body=document.body;
const gameDisplayBody = document.getElementById("game-display-body");
const questionDiv = document.getElementById("question");
let NumquestAns=1;
let correctAns=0;

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
        //display game page
        mathsChoice.style.display="flex";
    }
    document.getElementById('usernameDisplay').innerHTML = username;

})

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
        checkAns("none");
     })
})



const trueBtn = document.getElementById('true');
const falseBtn = document.getElementById('false');

//add eventlistener to both button with checkAns function
trueBtn.addEventListener('click', ()=>{
    checkAns("true");
});
falseBtn.addEventListener('click', ()=>{
    checkAns("false");

});

//function that checks answer



function checkAns(userOpt) {
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
            console.log('you are correct');
            //update score board
            let currentScore= Number(correctAns.innerHTML)+1;
            correctAns.innerHTML = currentScore;
        }
        //update number ofquestions answered
        let currentQuest = Number(NumquestAns.innerHTML) + 1;
            NumquestAns.innerHTML = currentQuest;
       
    }
    //add result
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
