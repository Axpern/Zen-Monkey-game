
//dpad of ai and players by using array of identity since its unique and therefore not confused
const aiDpad = ["aiU", "aiR", "aiD", "aiL"];
const player1Dpad = ["player1U", "player1R", "player1D", "player1L"];
const player2Dpad = ["player2U", "player2R", "player2D", "player2L"];

let aiMem = [];
let aiMem1 = [];
let aiMem2 = [];

let player1Mem = [];
let player2Mem =[];

let player1Score = 0;
let player2Score = 0;

let aiCache = -1
let aiFilled = false;

let player1Cache = -1
let player1Filled = false;
let aiFilled1 = false;

let player2Cache = -1
let player2Filled = false;
let aiFilled2 = false;


let randomFour = 0;
let aiChoice = "";

let player1Pressed = ""; //value from 0 to 3 to indicate which key has been pressed
let player1Choice = ""; //the arrow image the player clicked on and its classes and id
let player2Pressed = "";
let player2Choice = "";

//has to be revised when upscaled for multiple ai values 
let startTime = 0;
let endTime = 0;


// Ai to randomly press on its Dpad
function untoItself() {
    // random number generator from 0 to 3
    randomFour = Math.floor(Math.random()*4);
    // the number will be used to get a value from an index
    aiChoice = document.getElementById("" + aiDpad[randomFour]);
    //ai to punish if player didnt hit anything
    if (aiFilled1 === true && player1Filled === false) {
        aiFilled1 = false;
        //balance needed
        //T5 end time
        player1Score -= 80
        console.log(player1Score)
    }

    if (aiFilled2 === true && player2Filled === false) {
        aiFilled2 = false;
        //balance needed
        //T5 end time
        player1Score -= 80
        console.log(player2Score)
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
     setTimeout(function(){untoItself()},3000)
}

//waits until the page loads and some time to start ai randomly pressing
window.onload = function() {
    setTimeout(untoItself, 7000);
  };

    
    



    
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
        //up
    if (event.key === "w" || event.key === "W") {

        player1Pressed = 0;
        endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

        //right
    } else if (event.key === "d" || event.key === "D") {

        player1Pressed = 1;
        endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

        //down
    } else if (event.key === "s" || event.key === "S") {

        player1Pressed = 2;
        endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

        //left
    } else if (event.key === "a" || event.key === "A") {
        player1Pressed = 3
        endTime = performance.now()
        player1Cache = player1Pressed;
        player1Filled = true;
        scoringSystem1(player1Pressed,endTime);
        player1Choice = document.getElementById("" + player1Dpad[player1Pressed]);
        gettingClicked(player1Choice);

    }
  });





  
    // player 2 Dpad js
document.addEventListener("keydown", function(event) {
event.preventDefault();
    //up
if (event.key === "ArrowUp") {
    player2Pressed = 0
    endTime = performance.now()
    player2Cache = player2Pressed;
    player2Filled = true;
    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

    //right
} else if (event.key === "ArrowRight") {
    player2Pressed = 1;
    endTime = performance.now()
    player2Cache = player2Pressed;
    player2Filled = true;
    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

    //down
} else if (event.key === "ArrowDown") {

    player2Pressed = 2;
    endTime = performance.now()
    player2Cache = player2Pressed;
    player2Filled = true;
    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

    //left
} else if (event.key === "ArrowLeft") {

    player2Pressed = 3;
    endTime = performance.now()

    player2Cache = player2Pressed;
    player2Filled = true;

    scoringSystem2(player2Pressed,endTime);
    player2Choice = document.getElementById("" + player2Dpad[player2Pressed]);
    gettingClicked(player2Choice);

}
});









function gettingClicked(TBC) {
    TBC.classList.add("on");
    // the "effect" is removed after a short while"
    setTimeout(function(){bringPure(TBC)}, 500)
// also, the functions records the ID what has been clicked
}
    

//removes effects on the code
function bringPure(imgPads) {
    imgPads.classList.remove("on");
}


function scoringSystem1(scoringtime ,endtime) {
    //if player1 pressed and Ai didnt
    if (player1Filled === true && aiFilled1 === false) {
        //needs change for balance
        player1Score -= 6
        console.log(player1Score + " 1 patience")
    }
    else {
        timeDifference = endtime - startTime
        
        //if player1 and ai press and same value
        if (player1Cache === aiCache1) {
            //balance needed
            //T2 end time use
            console.log(Math.ceil(((endtime - startTime)*100)**(-1)) + " this")
            player1Score += ((endtime - startTime)**(-1)) * 100;
            console.log(player1Score + " 1 Nice")
        } 
        //if player1 and ai press but not same value
        else {
            //balance needed
            //T2 end time use
            player1Score -= 50;
            console.log(player1Score + " 1 Bad!")
        
        }
    }
    player1Cache = 0;
    aiCache1 = 0;
    player1Filled = false;
    aiFilled1 = false
}


function scoringSystem2(player2Pressed, endtime) {
    //if player2 pressed and Ai didnt
    if (player2Filled === true && aiFilled2 === false) {
        player2Filled = false
        //needs change for balance
        player2Score -= 6
        console.log(player2Score + " 2 patience")
    }
    else {
        //if player2 and ai press and same value
        if (player2Cache === aiCache2) {
            //balance needed
            //T2 end time use
            player2Score += (Math.ceil((endtime - startTime)^(-1))) * 100;
            console.log(player2Score + " 2 Nice")
        } 
        //if player1 and ai press but not same value
        else {
            //balance needed
            //T2 end time use
            player2Score -= 50;
            console.log(player2Score + " 2 Bad!")
        }
    }
    player2Cache = 0;
    aiCache2 = 0;
    player2Filled = false;
    aiFilled2 = false
}




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