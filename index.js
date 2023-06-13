//Get all sections in index
const homePage = document.getElementById("homePage");
const mathsChoice = document.getElementById("mathsChoice");
const gameDisplay = document.getElementById("gameDisplay");
const result = document.getElementById("result");
const body=document.body;
const gameDisplayBody = document.getElementById("game-display-body");
const questionDiv = document.getElementById("question");
let NumquestAns=1;

const randomQuest = ['+', '-', '*', '/', 'mix',];
//create global variables needed
let username="";
let userGameChoice="";
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

function checkAns(userOpt) {
    const currentDiv = document.getElementsByClassName("current")[0];
    if (currentDiv){
        currentDiv.classList.remove("current");    
    }
    //check

    //add result
    let lhs = Math.floor(Math.random() * 20);
    let rhs = Math.floor(Math.random() * 20);

    let dummyAns = Math.floor(Math.random() * 5);
    let randMixAns = randomQuest[Math.floor(Math.random() * 1)];
    let displayedAns = eval(lhs + userGameChoice + rhs + randMixAns + dummyAns);

    //generate new question
    //remove question class list from other question
    questionDiv.classList.remove("current");
    gameDisplayBody.innerHTML += "<div id='question' class='current'><div class='lhs'>" + lhs + "</div><div class='sign'>" + userGameChoice + "</div><div class='rhs'>" + rhs + "</div><div class='equal'>=" + displayedAns +"</div></div>";
    //increase number of Questions ansed
    NumquestAns++;

}
