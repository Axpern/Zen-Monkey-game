// document.querySelector(".secondPage").classList.add("hidingEverything"); 

const openModalBtn = document.getElementById("startGame");
const modal = document.getElementById("modalOptions");
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
  })
})

let player2Icon = document.querySelectorAll('.icon2')

player2Icon.forEach(function(ic) {
  ic.addEventListener("click", function(){
    player2Icon.forEach(function(e){
      e.classList.remove("selected")
    })
    ic.classList.add("selected")
  })
})


document.getElementById('submitBtn').addEventListener('click', function() {
  gameKeyValue = 1;
  modal.style.display = 'none'
  let keyValueMode = document.querySelector("#form1").value
  let keyValueDif =document.querySelector("#form2").value
  let keyValueTime = document.querySelector("#form3").value
  let keyValueicon1 = theImageChosenPlayer1.querySelector("img.selected")
  let keyValueicon2 = theImageChosenPlayer2.querySelector("img.selected")
  document.querySelector(".firstPage").classList.add("hidingEverything");
  console.log(keyValueicon1)
  // document.querySelector(".secondPage").classList.remove("hidingEverything");
  // displaySecondPage(keyValueMode, keyValueDif, keyValueTime, keyValueicon1, keyValueicon2);
});