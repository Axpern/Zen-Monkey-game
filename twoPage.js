

let countdownForGame = 3;

let player1WinRate = 0;
let player2WinRate = 0;
let theGameisPaused = 1;
let gameFinish = 1;
let pressPause = 0;
let restartingGame = 0;
let winnerBug = 0;

let optionsForMode = [0]
let optionsForDif = [800, 600, 400]
let optionsForTime = [60, 120, 240]


let gameModePicked = document.querySelector("#form1").value;
let DifficultyOfGame = document.querySelector("#form2").value;
let timeForGame = document.querySelector("#form3").value;


//variables to adjust game.
let loadingTime = 3500;

let speedOfGame = optionsForDif[DifficultyOfGame - 1];
let timeRemaining = "000";

document.querySelector("#icon1-1").classList.add("selected");
document.querySelector("#icon1-2").classList.add("selected");
//the icon <img that is selected
let theImageChosenPlayer1 = document.getElementById("player1ChoosingIcon");
let theImageChosenPlayer2 = document.getElementById("player2ChoosingIcon");

let icon1Query = theImageChosenPlayer1.querySelector("img.selected")
let icon2Query = theImageChosenPlayer2.querySelector("img.selected")
let keyValueSrc1 = icon1Query.src
let keyValueSrc2 = icon2Query.src



//the icon <img to be used
let defaultIcone1toChange = document.getElementById("theIconPlayer1uses");
let defaultIcone2toChange = document.getElementById("theIconPlayer2uses");
defaultIcone1toChange.src = keyValueSrc1
defaultIcone2toChange.src = keyValueSrc2 






//dpad of ai and players by using array of identity since its unique and therefore not confused
const aiDpad = ["aiU", "aiR", "aiD", "aiL"];
const player1Dpad = ["player1U", "player1R", "player1D", "player1L"];
const player2Dpad = ["player2U", "player2R", "player2D", "player2L"];



let player1Score = 0;
let player2Score = 0;

let sliderScore = document.getElementById("myRange");
// sliderScore.disabled = true
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


let classOfElement;
let idOfElement;
let indexOfElement;



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













//to keep track of the games time, used inside windows.onload
document.querySelector(".timeRemaining").textContent=timeRemaining + "s"

function stopWatch() {
    if (gameFinish == 1) {
        return false
    }
    else {
    //subtracts only when game is unpaused. when time=0, enters the win system
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
    else if (theGameisPaused == 1) {setTimeout(stopWatch, loadingTime)}
}}







// Ai to randomly press on its Dpad
function untoItself() {
    if (gameFinish == 1) {
        return false
    }
    else {
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
        }, 1500);
    }

}
}




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
        classOfElement = clickedPad.classList[0];

        if (classOfElement == "player1") {
            idOfElement = clickedPad.id;
            indexOfElement = player1Dpad.indexOf(idOfElement);
            clickListener(1, indexOfElement);

        } else if (classOfElement == "player2") {
            idOfElement = clickedPad.id;
            indexOfElement = player2Dpad.indexOf(idOfElement);
            clickListener(2, indexOfElement);
        }

    });
})

function clickListener(player, index) {
    if (theGameisPaused == 0) {
        //up
        if (player == 1){         
            player1Pressed = index;
            let endTime = performance.now()
            player1Cache = player1Pressed;
            player1Filled = true;
            scoringSystem1(player1Pressed,endTime);
        }
   
    
            //right
         else if (player == 2) {
            player2Pressed = index;
            let endTime = performance.now()
            player2Cache = player2Pressed;
            player2Filled = true;
            scoringSystem2(player2Pressed,endTime);
         } 
    } else if (theGameisPaused == 1) {
        return false
    } 
}




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

        





function scoringSystem1(restartProtocol, endtime) {
    //define variable to note change in score to be used on other functions
    let changeInScore = 0;
    //if player1 pressed and Ai didnt
    if (player1Filled === true && aiFilled1 === false) {
        //needs change for balance
        changeInScore = -100
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
            changeInScore = -200
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
    gameFinish = 1;
    if (winnerBug == 1) {
        return false
    }
    document.querySelector(".hidingPage").classList.add("hidingEverything")

    if (winner == 1) {
        player1WinRate += 1;
        winnerBug = 1;
        document.querySelector(".player1Won").style.display = "grid"
        document.querySelector(".player1 > .NumberWin").textContent=player1WinRate;
        sliderScore.value = initialSlider;
    }
    else if (winner == 2) {

        player2WinRate += 1;
        winnerBug = 1;
        document.querySelector(".player2Won").style.display = "grid";
        document.querySelector(".player2 > .NumberWin").textContent=player2WinRate; 
        sliderScore.value = initialSlider;  
    }
    else if (winner == 3) {
        document.querySelector(".playerTie").style.display = "grid";
        sliderScore.value = initialSlider;
    }
    player1Score = 0;
    player2Score = 0;
    document.querySelector(".player1 > .NumberScore").textContent=player1Score;
    document.querySelector(".player2 > .NumberScore").textContent=player2Score;
    document.querySelector(".restart").style.display = "block";
    restartingGame = 1;
}

let restartMenuButton = document.getElementById("restartBtn");

restartMenuButton.addEventListener("click", function() {
    pressPause = 1;
    restartingGame = 1;
    modal.style.display = 'block';
    document.querySelector(".secondPage").classList.add("hidingEverything");
    document.querySelector("#cancelBtn").innerHTML= "Main Menu";
    theGameisPaused = 1;
    document.querySelector(".restart").style.display = "none";
});






document.querySelector(".secondPage").classList.add("hidingEverything"); 
let openModalBtn = document.getElementById("startGame");
let modal = document.getElementById("modalOptions");
let gameKeyValue = 1;



openModalBtn.addEventListener("click", function() {
  modal.style.display = 'block';
});


let openModalBtn2 = document.getElementById("howToPlay");
let modal2 = document.getElementById("modalHow");

openModalBtn2.addEventListener("click", function() {
  modal2.style.display = 'block';
});

document.querySelector(".xImg2").addEventListener('click', function() {
    modal2.style.display = 'none';
});
  



let openMenuButton = document.getElementById("pauseBtn");
openMenuButton.addEventListener("click", function() {
    pressPause = 1;
    modal.style.display = 'block';
    document.querySelector(".secondPage").classList.add("hidingEverything");
    document.querySelector("#cancelBtn").innerHTML= "Main Menu";
    theGameisPaused = 1
});



document.querySelector(".xImg").addEventListener('click', function() {
  modal.style.display = 'none';
  if (restartingGame == 1) {
    console.log("x")
    document.querySelector(".restart").style.display = "block"
  }
  if (pressPause == 1) {
    document.querySelector(".secondPage").classList.remove("hidingEverything");
    theGameisPaused = 0;
    pressPause = 0;
  }
});


document.querySelector("#cancelBtn").addEventListener('click', function() {
  modal.style.display = 'none';
  if (pressPause == 1) {
    gameFinish = 1;
    theGameisPaused = 1;
    pressPause = 0;
    player1WinRate = 0;
    player2WinRate = 0;

    document.querySelector(".player1 > .NumberWin").textContent=player1WinRate; 
    document.querySelector(".player2 > .NumberWin").textContent=player2WinRate; 


    document.querySelector(".player1Won").style.display = "none";
    document.querySelector(".player2Won").style.display = "none";
    document.querySelector(".playerTie").style.display = "none";
    document.querySelector(".restart").style.display = "none";

    document.querySelector(".secondPage").classList.add("hidingEverything");
    document.querySelector(".hidingPage").classList.add("hidingEverything");
    document.querySelector(".firstPage").classList.add("hidingEverything");
    document.querySelector(".firstPage").classList.remove("hidingEverything");
}
});






// Get all icon elements
let player1Icon = document.querySelectorAll('.icon0')

player1Icon.forEach(function(ic) {
  ic.addEventListener("click", function(){
    player1Icon.forEach(function(e){
      e.classList.remove("selected");
    })
    ic.classList.add("selected");
    keyValueSrc1 = ic.src;
  })
})

let player2Icon = document.querySelectorAll('.icon2')

player2Icon.forEach(function(ic) {
  ic.addEventListener("click", function(){
    player2Icon.forEach(function(e){
      e.classList.remove("selected")
    })
    ic.classList.add("selected")
    keyValueSrc2 = ic.src
  })
})


document.getElementById('submitBtn').addEventListener('click', function() {
  gameKeyValue = 1;

  //reset stopwatch and ai loop
  gameFinish = 1;
  restartingGame = 0;

  //reset score
  player1Score = 0;
  player2Score = 0;
  document.querySelector(".player1 > .NumberScore").textContent=player1Score;
  document.querySelector(".player2 > .NumberScore").textContent=player2Score;

  //reset time display
  timeRemaining = "000";
  document.querySelector(".timeRemaining").textContent=timeRemaining + "s";
  modal.style.display = 'none';
  //reset countdown
  countdownForGame = 3;
  //show countdown display
  document.querySelector(".numDown").textContent=countdownForGame;
  document.querySelector(".countdown").style.display = "block";
  document.querySelector(".numDown").style.display = "block";
  
  //reset slider value
  sliderScore.value = initialSlider


  //chooses new mode, dif, time
  gameModePicked = document.querySelector("#form1").value;
  DifficultyOfGame = document.querySelector("#form2").value;
  timeForGame = document.querySelector("#form3").value;
  speedOfGame = optionsForDif[DifficultyOfGame - 1];
  timeRemaining = optionsForTime[timeForGame - 1];
  //changes icon based on src that was clicked "ic"
  defaultIcone1toChange.src = keyValueSrc1;
  defaultIcone2toChange.src = keyValueSrc2 ;


  //hides winning result from previous game
  document.querySelector(".player1Won").style.display = "none"
  document.querySelector(".player2Won").style.display = "none"
  document.querySelector(".playerTie").style.display = "none"
  document.querySelector(".restart").style.display = "none";

  //adds display none to all except second page
  document.querySelector(".secondPage").classList.add("hidingEverything");
  document.querySelector(".hidingPage").classList.add("hidingEverything");
  document.querySelector(".firstPage").classList.add("hidingEverything");
  document.querySelector(".secondPage").classList.remove("hidingEverything");
  
  //begins process to start game
  displaySecondPage();
});






//second page js





function displaySecondPage() {
    if (gameKeyValue == 0) {
        return false
    } else if (gameKeyValue == 1) {
        setTimeout(startTheGame, 1000)
    }
}

//start the game
function startTheGame() {
    countdownForGame -= 1
    document.querySelector(".numDown").textContent=countdownForGame
    if (countdownForGame === 0) {
        document.querySelector(".numDown").textContent="Go!!!"
        document.querySelector(".countdown").style.display = "none"
        document.querySelector(".numDown").style.display = "none"
        newGame()
    }else{
        setTimeout(startTheGame, 1000)
    }
}


function newGame() {  

    if (gameKeyValue == 0) {
        return false
    }
    else{
        document.querySelector(".hidingPage").classList.remove("hidingEverything");
        theGameisPaused = 0;
        gameFinish = 0;
        winnerBug = 0;
        setTimeout(function() {untoItself()
            stopWatch()
        }, loadingTime);
}}






  



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














    








// (Stuff for Gif)

// ToDo
// When the user submits the search form, make an API request to Giphy's search endpoint
// https://api.giphy.com/v1/gifs/search?api_key="YOURAPIKEY"&q="SEARCHSTRING"
// Display the results in the #giphy-results div provided in the html
// Each new search should replace the previous search results
// CSS Bonus: Use flex or grid properties to display the results in a responsive, clean layout


const moodsObject = {
    "ecstatic": ["Bliss", "Super", "Delight", "Ecstasy", "Jubilation", "Exuberance", "Rapture", "Glee", "Thrill", "Radiance", "Enchantment", "Serenity", "Uplifted", "Elation", "Hilarity", "Zest", "Contentment", "Vivacity", "Joviality", "Euphoric"],

    "happy": ["Cheerful", "Pleasant", "Satisfied", "Content", "Joyful", "Merry", "Delighted", "Amiable", "Pleased", "Upbeat", "Grateful", "Lighthearted", "Gleeful", "Jolly", "Optimistic", "Radiant", "Smiling", "Sunny", "Carefree", "Serene"],

    "angry": ["Rage", "Fury", "Wrath", "Outrage", "Indignation", "Resentment", "Hate", "Ire", "Hostility", "Frustration", "Vengeance", "Enraged", "Murderous", "Seething", "Livid", "Furious", "Raging", "Scream", "Infuriated", "Pain"],

    "sad": ["Somber", "Melancholy", "Gloomy", "Sorrowful", "Blue", "Downcast", "Mournful", "Wistful", "Pensive", "Disheartened", "Dejected", "Forlorn", "Weary", "Crestfallen", "Longing", "Dismal", "Despondent", "funeral", "Lamenting", "Reflective"],

    "distraught": ["Defeated", "Wounded", "Weakened", "Frail", "Vulnerable", "Suffering", "Struggling", "Desperate", "Dismayed", "Crippled", "Deteriorating", "Anguished", "Agonized", "Tormented", "Devastated", "Forsaken", "Desolate", "Doomed", "Broken", "thanosCry"]
}


let player1mood = "joy";
let user1Search = player1mood;
let theGifContainer1 = document.querySelector("#giphy-results1")






let player2mood = "angry";
let user2Search = player2mood;
let theGifContainer2 = document.querySelector("#giphy-results2")
const apiKey = "nTUDdRhRKilnCuvVYEMM8I205ihPlZ9t";












async function giphySearch(e) {

  // prevent the page from submitting/reloading
  e.preventDefault();
  // get the user input from the form
//   let userSearch = document.querySelector("#gifreaction input[name='reaction']").value;
  // make an API call using fetch() - include your API key and the user's search term (template strings are your friend)

  let api1URl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${user1Search}`
  let response1 = await fetch(api1URl)

  let api2URl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${user2Search}`
  let response2 = await fetch(api2URl)


  // convert your response data into .json()
let data1 = await response1.json();
let data2 = await response2.json();

  // print your data to the console to see its format, dont forget to delete later

  // clear out all gifs from previous searches
// document.querySelector("#giphy-results").innerHTML="";
  // use a loop to create and append each image to the dom

let imageURL1 = (data1.data)[0].images.fixed_width.url;
let newImageTag1 = document.createElement("img");
newImageTag1.setAttribute("src", imageURL1);
document.querySelector("#giphy-results1").appendChild(newImageTag1);

let imageURL2 = (data1.data)[0].images.fixed_width.url;
let newImageTag2 = document.createElement("img");
newImageTag2.setAttribute("src", imageURL2);
document.querySelector("#giphy-results2").appendChild(newImageTag2);



  async function moodRegulation() {

    if (parseInt(sliderScore.value) == parseInt(initialSlider) && parseInt(sliderScore.value) > parseInt(initialSlider) * (95/100)  && parseInt(sliderScore.value) < parseInt(initialSlider) * (105/100)) 
    //in middle both angry
    {
        player1mood = moodsObject.angry[Math.floor(Math.random()*20)]
        user1Search = player1mood
        player2mood = moodsObject.angry[Math.floor(Math.random()*20)]
        user2Search = player2mood

        console.log(user1Search)
        console.log(user2Search)

    //player1 winning by large margin, player2 losing by large margin
    } else if (parseInt(sliderScore.value) > parseInt(initialSlider) * (150/100)) {
        player1mood = moodsObject.ecstatic[Math.floor(Math.random()*20)]
        user1Search = player1mood

        player2mood = moodsObject.distraught[Math.floor(Math.random()*20)]
        user2Search = player2mood 
        
        console.log(user1Search)
        console.log(user2Search)

    //player2 winning by large margin, player1 losing by large margin
    } else if (parseInt(sliderScore.value) < parseInt(initialSlider) * (50/100)) {
        player2mood = moodsObject.ecstatic[Math.floor(Math.random()*20)]
        user2Search = player2mood
        player1mood = moodsObject.distraught[Math.floor(Math.random()*20)]
        user1Search = player1mood 
        
        console.log(user1Search)
        console.log(user2Search)
        

    //player1 winning slightly
    } else if (parseInt(sliderScore.value) > parseInt(initialSlider) * (105/100)) {
        player1mood = moodsObject.happy[Math.floor(Math.random()*20)]
        user1Search = player1mood
        player2mood = moodsObject.sad[Math.floor(Math.random()*20)]
        user2Search = player2mood

        console.log(user1Search)
        console.log(user2Search)

    //player2 winning slightly
    } else if(parseInt(sliderScore.value) < parseInt(initialSlider) * (95/100)) {
        
        player2mood = moodsObject.happy[Math.floor(Math.random()*20)]
        user2Search = player2mood
        player1mood = moodsObject.sad[Math.floor(Math.random()*20)]
        user1Search = player1mood
        
        console.log(user1Search)
        console.log(user2Search)

    } else {
        player2mood = "joy"
        user2Search = player2mood
        player1mood = "joy"
        user1Search = player1mood

        console.log(user1Search)
        console.log(user2Search)
    }





    api1URl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${user1Search}`
    response1 = await fetch(api1URl)
    data1 = await response1.json();
    imageURL1 = (data1.data)[0].images.fixed_width.url;
    newImageTag1 = document.createElement("img");
    newImageTag1.setAttribute("src", imageURL1);
    while (theGifContainer1.firstChild) {
        theGifContainer1.removeChild(theGifContainer1.firstChild);
      }      
    theGifContainer1.appendChild(newImageTag1);




    api2URl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${user2Search}`
    response2 = await fetch(api2URl)
    data2 = await response2.json();
    console.log(data2)
    imageURL2 = (data2.data)[0].images.fixed_width.url;
    newImageTag2 = document.createElement("img");
    newImageTag2.setAttribute("src", imageURL2);
    while (theGifContainer2.firstChild) {
        theGifContainer2.removeChild(theGifContainer2.firstChild);
      }      
    theGifContainer2.appendChild(newImageTag2);





    setTimeout(moodRegulation, 5000)
}


setTimeout(moodRegulation, 5000)



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