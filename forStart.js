
const openModalBtn = document.getElementById("startGame");
const modal = document.getElementById("modalOptions");

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



document.getElementById('submitBtn').addEventListener('click', function() {
 
  console.log('Game options submitted');
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


