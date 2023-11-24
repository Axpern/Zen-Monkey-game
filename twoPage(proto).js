let player1WinRate = 0
let player2WinRate = 0
let theGameisPaused = 1;

document.querySelector(".secondPage").classList.add("hidingEverything"); 
let openModalBtn = document.getElementById("startGame");
let modal = document.getElementById("modalOptions");
let theImageChosenPlayer1 = document.getElementById("player1ChoosingIcon")
let theImageChosenPlayer2 = document.getElementById("player2ChoosingIcon")
let gameKeyValue = 1;


document.querySelector("#icon1-1").classList.add("selected");
document.querySelector("#icon1-2").classList.add("selected");

openModalBtn.addEventListener("click", function() {
  modal.style.display = 'block';
});

document.querySelector(".xImg").addEventListener('click', function() {
  modal.style.display = 'none';
});


document.querySelector("#cancelBtn").addEventListener('click', function() {
  modal.style.display = 'none';
});








// Get all icon elements
let player1Icon = document.querySelectorAll('.icon0')

player1Icon.forEach(function(ic) {
  ic.addEventListener("click", function(){
    player1Icon.forEach(function(e){
      e.classList.remove("selected")
    })
    ic.classList.add("selected")
    console.log(ic.src)
    
  })
})

let player2Icon = document.querySelectorAll('.icon2')

player2Icon.forEach(function(ic) {
  ic.addEventListener("click", function(){
    player2Icon.forEach(function(e){
      e.classList.remove("selected")
    })
    console.log(ic)
    ic.classList.add("selected")
  })
})


document.getElementById('submitBtn').addEventListener('click', function() {
  gameKeyValue = 1;
  modal.style.display = 'none'
  let keyValueMode = document.querySelector("#form1").value
  let keyValueDif =document.querySelector("#form2").value
  let keyValueTime = document.querySelector("#form3").value
  let icon1Query = theImageChosenPlayer1.querySelector("img.selected")
  let icon2Query = theImageChosenPlayer2.querySelector("img.selected")
  let keyValueSrc1 = icon1Query.src
  let keyValueSrc2 = icon2Query.src
  document.querySelector(".secondPage").classList.add("hidingEverything");
  document.querySelector(".firstPage").classList.add("hidingEverything");
  document.querySelector(".secondPage").classList.remove("hidingEverything");
  theGameisPaused = 0
  displaySecondPage(keyValueMode, keyValueDif, keyValueTime, keyValueSrc1 , keyValueSrc2);
});






//second page js





function displaySecondPage(gameModePicked, DifficultyOfGame, timeForGame, iconForPlayer1, iconForPlayer2) {
    if (gameKeyValue == 0) {
        return false
    } else if (gameKeyValue == 1) {

let optionsForMode = [0]
let optionsForDif = [800, 600, 400]
let optionsForTime = [60, 120, 240]

let defaultIcone1toChange = document.getElementById("theIconPlayer1uses");
let defaultIcone2toChange = document.getElementById("theIconPlayer2uses");
defaultIcone1toChange.src = iconForPlayer1
defaultIcone2toChange.src = iconForPlayer2



function winDisplay(thePlayer) {
    if (thePlayer == 1) {
    document.querySelector(".player1 > .NumberWin").textContent=player1WinRate;
    } 
    else if (thePlayer == 2) {
    document.querySelector(".player2 > .NumberWin").textContent=player2WinRate;
    }
}

let countdownForGame = 3
let qBegin = 0

setTimeout(startTheGame, 1000)

//start the game
function startTheGame() {
    countdownForGame -= 1
    document.querySelector(".numDown").textContent=countdownForGame
    if (countdownForGame === 0) {
        document.querySelector(".numDown").textContent="Go!!!"
        document.querySelector(".countdown").style.display = "none"
        document.querySelector(".numDown").style.display = "none"
        qBegin += 1
        newGame(qBegin)
    }else{
        setTimeout(startTheGame, 1000)
    }
}


function newGame(kBegin) {
    
if (kBegin ==   0) {
return false
}
else{
document.querySelector(".hidingPage").classList.remove("hidingEverything");
theGameisPaused = 0;



//dpad of ai and players by using array of identity since its unique and therefore not confused
const aiDpad = ["aiU", "aiR", "aiD", "aiL"];
const player1Dpad = ["player1U", "player1R", "player1D", "player1L"];
const player2Dpad = ["player2U", "player2R", "player2D", "player2L"];



let player1Score = 0;
let player2Score = 0;

let sliderScore = document.getElementById("myRange");
let initialSlider = (parseInt(sliderScore.max) + parseInt(sliderScore.min))/2
sliderScore.value = initialSlider;


let aiCache = -1
let aiFilled = false;

let player1Cache = -1
let player1Filled = false;
let aiCache1 = -1
let aiFilled1 = false;

let player2Cache = -1
let player2Filled = false;
let aiCache2 = -1
let aiFilled2 = false;


let randomFour = 0;
let aiChoice = "";

let player1Pressed = ""; //value from 0 to 3 to indicate which key has been pressed
let player1Choice = ""; //the arrow image the player clicked on and its classes and id
let player2Pressed = "";
let player2Choice = "";

//has to be revised when upscaled for multiple ai values 
let startTime = 0;

//variables to adjust game. 
let speedOfGame = optionsForDif[DifficultyOfGame - 1];
let loadingTime = 3500;

let timeRemaining = optionsForTime[timeForGame - 1];



//to keep track of the games time, used inside windows.onload
document.querySelector(".timeRemaining").textContent=timeRemaining + "s"

function stopWatch() {
    //subtracts only when game is unpaused. when =0, enters the win system
    if (theGameisPaused == 0){    
        timeRemaining -= 1;
        document.querySelector(".timeRemaining").textContent=timeRemaining + "s"
        if (timeRemaining == 0) {
            if (player1Score > player2Score){
                winSystem(1);
            } else if (player1Score < player2Score){
                winSystem(2);
            } else if (player1Score == player2Score){
                winSystem(3);
            }

        }else {setTimeout(stopWatch, 1000)}
    } 
    else if (theGameisPaused == 1) {setTimeout(stopWatch, 1000)}
}



// Ai to randomly press on its Dpad
function untoItself() {

    if (theGameisPaused == 0) {
        // random number generator from 0 to 3
        randomFour = Math.floor(Math.random()*4);
        // the number will be used to get a value from an index
        aiChoice = document.getElementById("" + aiDpad[randomFour]);
        //ai to punish if player didnt hit anything
        if (aiFilled1 === true && player1Filled === false) {
            aiFilled1 = false;
            let changeInScore = 0;
            //balance needed
            //T5 end time
            changeInScore = -300
            player1Score += changeInScore
            displayScore(changeInScore, 1);
        }

        if (aiFilled2 === true && player2Filled === false) {
            aiFilled2 = false;
            let changeInScore = 0;
            //balance needed
            //T5 end time
            changeInScore = -300
            player2Score += changeInScore
            displayScore(changeInScore, 2);
        }

        //T1 start time, T6 restart process
        startTime = performance.now();

        aiCache = randomFour;
        aiFilled = true;

        aiCache1 = aiCache;
        aiFilled1 = aiFilled;
        aiCache2 = aiCache;
        aiFilled2 = aiFilled

        // on class will be added 
        gettingClicked(aiChoice);
        // function will occur unto itself
        setTimeout(function(){untoItself()},speedOfGame)
    } else if (theGameisPaused == 1) {
        setTimeout(function() {
            untoItself()
        }, loadingTime);
    }

}

//waits until the page loads and some time to start ai randomly pressing

    setTimeout(function() {untoItself()
        stopWatch()
    }, loadingTime);
  


    
    



    
//skeletal structure
    // First start with click event listener.
    // Clicking will change the color of the clicked dpad to indicate it listened
    // the elements that need an event listener must be queried, all of them.
const iterateOver = document.querySelectorAll(".pad>img");


//the event listeners
iterateOver.forEach(function(element){
    element.addEventListener("click", function(event){
        const clickedPad = event.target;
        // a function plays after getting clicked
        // that function cause the clicked dpad to change colors by adding class
        gettingClicked(clickedPad)
    
    });
})


    // player 1 Dpad js
document.addEventListener("keydown", function(event) {
event.preventDefault()
if (theGameisPaused == 0) {
    //up
    if (event.key === "w" || event.key === "W") {

        player1Pressed = 0;
        let endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

        //right
    } else if (event.key === "d" || event.key === "D") {

        player1Pressed = 1;
        let endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

        //down
    } else if (event.key === "s" || event.key === "S") {

        player1Pressed = 2;
        let endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

        //left
    } else if (event.key === "a" || event.key === "A") {
        player1Pressed = 3
        let endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

    }
} else if (theGameisPaused == 1) {
    return false
} 
        
  });




  
    // player 2 Dpad js
document.addEventListener("keydown", function(event) {
event.preventDefault();
if (theGameisPaused == 0) {
        //up
if (event.key === "ArrowUp") {
    player2Pressed = 0
    let endTime = performance.now()
    player2Cache = player2Pressed;
    player2Filled = true;
    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

    //right
} else if (event.key === "ArrowRight") {
    player2Pressed = 1;
    let endTime = performance.now()
    player2Cache = player2Pressed;
    player2Filled = true;
    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

    //down
} else if (event.key === "ArrowDown") {

    player2Pressed = 2;
    let endTime = performance.now()
    player2Cache = player2Pressed;
    player2Filled = true;
    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

    //left
} else if (event.key === "ArrowLeft") {

    player2Pressed = 3;
    let endTime = performance.now()

    player2Cache = player2Pressed;
    player2Filled = true;

    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

}
} else if (theGameisPaused == 1) {
    return false
}

});




function gettingClicked(TBC) {
    TBC.classList.add("on");
    // the "effect" is removed after a short while"
    if (TBC.id === "aiU" || TBC.id === "aiR"|| TBC.id === "aiD" || TBC.id === "aiL") {
        setTimeout(function(){bringPure(TBC)}, (optionsForDif[DifficultyOfGame - 1] - 150))
    } else {
        setTimeout(function(){bringPure(TBC)}, 100)
    }
    
// also, the functions records the ID what has been clicked
}
    

//removes effects on the code
function bringPure(imgPads) {
    imgPads.classList.remove("on");
}


function scoringSystem1(restartProtocol, endtime) {
    //define variable to note change in score to be used on other functions
    let changeInScore = 0;
    //if player1 pressed and Ai didnt
    if (player1Filled === true && aiFilled1 === false) {
        //needs change for balance
        changeInScore = -200
        player1Score += changeInScore 
    }
    else {
        timeDifference = endtime - startTime
        //if player1 and ai press and same value
        if (player1Cache === aiCache1) {
            let timeDifference = endtime - startTime
            //balance needed
            changeInScore = ((Math.ceil((((timeDifference - 500)**2)/300)/10))*10)+50
            if (timeDifference > 500) {
                changeInScore = 50
            }
            //balance needed
            //T2 end time use
            player1Score += changeInScore
        } 
        //if player1 and ai press but not same value
        else {
            //balance needed
            //T2 end time use
            changeInScore = -300
            player1Score += changeInScore;
        
        }
    }

    player1Cache = 0;
    aiCache1 = 0;
    player1Filled = false;
    aiFilled1 = false;
    displayScore(changeInScore, 1);
    }
    



function scoringSystem2(restartProtocol, endtime) {
    //define variable for change in score to be passed along other functions
    let changeInScore = 0;
    //if player2 pressed and Ai didnt
    if (player2Filled === true && aiFilled2 === false) {
        player2Filled = false
        //needs change for balance
        changeInScore = -200
        player2Score += changeInScore
    }
    else {
        //if player2 and ai press and same value
        if (player2Cache === aiCache2) {
            let timeDifference = endtime - startTime
            //balance needed 
            changeInScore = ((Math.ceil((((timeDifference - 500)**2)/300)/10))*10)+50
            if (timeDifference > 500) {
                changeInScore = 50
            }
            //balance needed
            //T2 end time use
            player2Score += changeInScore;
        } 
        //if player2 and ai press but not same value
        else {
            //balance needed
            //T2 end time use
            changeInScore = -300;
            player2Score += changeInScore;
            
        }
    }

    player2Cache = 0;
    aiCache2 = 0;
    player2Filled = false;
    aiFilled2 = false
    displayScore(changeInScore, 2);
}

   


//Score is displayed in score box and vertical range
function displayScore(scoreChange, num) {
    if (num === 1) {
    document.querySelector(".player1 > .NumberScore").textContent=player1Score;
    sliderScore.value = parseInt(sliderScore.value) + parseInt(scoreChange);
    } 
    else if (num === 2) {
    document.querySelector(".player2 > .NumberScore").textContent=player2Score;
    sliderScore.value = parseInt(sliderScore.value) - parseInt(scoreChange);
    }

    if (sliderScore.value == sliderScore.max) {
        winSystem(1)
    }else if (parseInt(sliderScore.value) === 0) {
        winSystem(2)
        }
}

function winSystem(winner) {

    document.querySelector(".hidingPage").classList.add("hidingEverything")

    if (winner == 1) {
        document.querySelector(".player1Won").style.display = "grid"
        winDisplay(1);
    }
    else if (winner == 2) {
        document.querySelector(".player2Won").style.display = "grid"
        winDisplay(2);
    }
    else if (winner == 3) {
        document.querySelector(".playerTie").style.display = "grid"
    }
}





// let openMenuButton = document.getElementById("pauseBtn");
// openMenuButton.addEventListener("click", function() {
//     modal.style.display = 'block';
//     document.querySelector(".secondPage").classList.add("hidingEverything");
//     theGameisPaused = 1
// });

// document.querySelector(".xImg").addEventListener('click', function() {
//     modal.style.display = 'none';
//     document.querySelector(".secondPage").classList.remove("hidingEverything");
//     theGameisPaused = 0
//   });
  
  
//   document.querySelector("#cancelBtn").addEventListener('click', function() {
//     modal.style.display = 'none';
//     document.querySelector(".secondPage").classList.remove("hidingEverything");
//     theGameisPaused = 0
//   });
  



//   function restartProtocol() {
//     player1Score = 0;
//     player2Score = 0;
//     clearInterval()
//   }

//   document.getElementById('submitBtn').addEventListener('click', function() {
//     gameKeyValue = 1;
//     modal.style.display = 'none';
//     let keyValueMode = document.querySelector("#form1").value
//     let keyValueDif =document.querySelector("#form2").value
//     let keyValueTime = document.querySelector("#form3").value
//     let icon1Query = theImageChosenPlayer1.querySelector("img.selected")
//     let icon2Query = theImageChosenPlayer2.querySelector("img.selected")
//     let keyValueSrc1 = icon1Query.src
//     let keyValueSrc2 = icon2Query.src
//     document.querySelector(".secondPage").classList.add("hidingEverything");
//     document.querySelector(".firstPage").classList.add("hidingEverything");
//     document.querySelector(".secondPage").classList.remove("hidingEverything");
//     displaySecondPage(keyValueMode, keyValueDif, keyValueTime, keyValueSrc1 , keyValueSrc2);
//   });


//   document.getElementById('submitBtn').addEventListener('click', function() {
//     gameKeyValue = 1;
//     modal.style.display = 'none'
//     let keyValueMode = document.querySelector("#form1").value
//     let keyValueDif =document.querySelector("#form2").value
//     let keyValueTime = document.querySelector("#form3").value
//     let icon1Query = theImageChosenPlayer1.querySelector("img.selected")
//     let icon2Query = theImageChosenPlayer2.querySelector("img.selected")
//     let keyValueSrc1 = icon1Query.src
//     let keyValueSrc2 = icon2Query.src
//     document.querySelector(".firstPage").classList.add("hidingEverything");
//     document.querySelector(".secondPage").classList.remove("hidingEverything");
//     displaySecondPage(keyValueMode, keyValueDif, keyValueTime, keyValueSrc1 , keyValueSrc2);
//   });



//document.querySelector(".hidingPage").classList.add("hidingEverything")
//T1 I want a way to start the time the moment the ai hits (key action) a key and 
//T2 in the middle, the player can also end the time by hitting the key (key action). The difference between
//T3 start and finish will add on the score(key action).
//T4 end the time when the ai hits another key (key action)
//T5 if player did not hit, lose score(key action)
//T6 process repeats









}
}




    }
}







// (Stuff for Gif)

// ToDo
// When the user submits the search form, make an API request to Giphy's search endpoint
// https://api.giphy.com/v1/gifs/search?api_key="YOURAPIKEY"&q="SEARCHSTRING"
// Display the results in the #giphy-results div provided in the html
// Each new search should replace the previous search results
// CSS Bonus: Use flex or grid properties to display the results in a responsive, clean layout
let player1mood = "joy"
const apiKey = "nTUDdRhRKilnCuvVYEMM8I205ihPlZ9t";

async function giphySearch(e) {

  // prevent the page from submitting/reloading
  e.preventDefault();
  // get the user input from the form
//   let userSearch = document.querySelector("#gifreaction input[name='reaction']").value;
    let userSearch = player1mood
  // make an API call using fetch() - include your API key and the user's search term (template strings are your friend)
  const apiURl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userSearch}`
  const response = await fetch(apiURl)



  // convert your response data into .json()
const data = await response.json();

  // print your data to the console to see its format, dont forget to delete later

  // clear out all gifs from previous searches
// document.querySelector("#giphy-results").innerHTML="";
  // use a loop to create and append each image to the dom

const imageURL = (data.data)[0].images.fixed_width.url;
const newImageTag = document.createElement("img");
newImageTag.setAttribute("src", imageURL);
document.querySelector("#giphy-results").appendChild(newImageTag);

}
// dont forget your event listener
// document.querySelector("#search-form").addEventListener("submit", giphySearch);


// document.addEventListener('DOMContentLoaded', function(event) {

//     jQuery('#relaxrExistingUser a').click(function (e) {
//         e.preventDefault()
//         jQuery(this).tab('show')
//     });

//     // Bind a validation function to the submit of the login form
//     document.querySelector("#home .relaxrLoginForm").addEventListener('submit',validateSignInForm);

//     // Bind a validation function to the submit of the profile

// });
 document.addEventListener('DOMContentLoaded', giphySearch);