//Get all sections in index
const homePage = document.getElementById("homePage");
const mathsChoice = document.getElementById("mathsChoice");
const gameDisplay = document.getElementById("gameDisplay");
const result = document.getElementById("result");
const body=document.body;

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
