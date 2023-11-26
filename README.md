# Zen-Monkey-game
Rhythm-Reflix game to determine who is Zen and who is Monkey.



The computer will randomly press on one of the four directions. The pressed direction will light up and the players have to press in the same direction as quickly as possible.
player 1 controls: ASDW
player 2 controls: ←↓→↑
A slider will show the progress of player 1. The closer player 1 is to winning, the higher the slider will be. The closer player 2 is to winning, the lower the slider will be. The game will end when the slider reaches a maximum or minimum or when the time runs out.

("ai" is what the code says when it means computer)

The game is meant to be have distractive elements to challenge the player's focus. Therefore the player that can remain focused for the longest time will have the advantage and is "zen" as opposed to "monkey"

Background video, music, and gifs will be played to achieve this purpose. The gifs reproduce every 5 seconds based on if statements dependent on the score of the player. The higher the player's score, the more optimistic the gif. The lower, the more pessimistic. The player's mood which determines the gif is stored in an object that stores array values. For example, the object property "happy" has 20 synonymous emotions which are chosen at random when the if statement determines that the player's score merits a "happy" mood. This way the user search will not generate the same gif over and over for the mood "happy" but at least 20 unique gifs. 

The game has all of its pages overlayed another and utilizes JS to determine when those pages have the CSS property of "display: none" or not. z-index is also utilized to achieve this purpose. 

The game has 8 main groups of functionalities: 
1.The Dpad event listeners determine what player-input will influence their Dpad, 
2.the gettingClicked functions which display when ai or players press on a Dpad, the ai function which makes the ai randomly 3.press on their Dpad within an adjustable interval, 
4.the stopWatch which shows how long the game will last if no one gets the maximum score, 
5.the scoring system, 
6.the win system, 
7.the gif system, 
8.and finally all the other various event listeners that control which page will show and which will be hidden.


Workflow:
There are two pages that were worked on separately, the starter page which loads when the page loads and has the modal options, and the index page where the game actually takes place. The starter page has two buttons (start and How to play). Start calls on a modal which shows a mini-page that has all the configuration of the game (difficulty, time, player icons, etc). The CSS and JS of those two were worked on independently and only merged when the game was 3/4 finished.  

Adjusting the headers, icons, and score/win box was direct enough so the focus in the index was the Dpads. The index page is meant to have a Dpad in the top-middle and then two Dpads below that which mirror each other left and right. The upper Dpad is meant for ai use and the lower is meant for player use. Left is for player 1 and right is for player 2. 
The next step was working on the event listeners which bind the keyboard keys to the Dpad of the players and display them by changing the color of the Dpad momentarily. 

A scoring system is then implemented to bind what and when the player presses on a Dpad direction relative to the ai. If both the ai and the player press UP then the time will be taken and the player will be rewarded proportional to how quick they were. If the player does not hit any direction in their Dpad, or if they hit but it is not equal to the Ai, or if they hit more than once within a time interval, they lose points. 

The scoring system also waits until the slider is either at maximum or minimum to call the win system. The win system is also called when the stopwatch is at 0 and the winner is determined based on who has the highest score. HTML elements are displayed as none and others are displayed as not-none to call on HTML pages based on who the winner is. The player1Won will be displayed as a grid for example which will cover the entire page and divide it by half to tell the left side (player 1) that they have won and the right side (player 2) that they have lost.

In order for the game to have multiple rounds, the start page and its modal had to be merged with the index since the modal is what determines the structure of the game (difficulty, player icon, etc) and so the modal was used to start the game, pause the game, and restart the game. The modal is adjusted in JS based on which of those 3 states is it in. 
background videos, gifs, and music were worked on last to add the desired distracting effects of the game. Responsiveness was worked on at this stage.

