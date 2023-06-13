# Tic Tac Toe Game (2.0)

This is another project from The Odin Project, being a Javascript Tic Tac Toe game. It is meant to be an introduction to concepts such as factory functions, module patterns, private functions and related concepts. (As well as technically a bit of A.I as well)

In this project you can name both players and choose to play against yourself/someone else or choose to play against an unbeatable computer A.I, which was implemented using the minimax algorithm. After a player wins their name will be displayed on the page, and you can then restart the game.

While creating this project I, as always, focused first on the HTML and CSS and then moved on to Javascript, creating all of the game dynamics first (displaying and updating the board, making it possible to play by clicking, etc) and then moving on to the display, which required modifications in the CSS and HTML (player names, displaying the winner, creating the buttons for choosing A.I and which side to play) and then I finally moved to the A.I itself. Creating the A.I was a challenge that I definitively underestimated at first, as there were various different issues I ran into while making it which almost made me give up, but after various bug fixes and a long time of me bashing my head against the table I finally made it work and I am very proud of it.

Known bug: when the computer radio button is checked and the tab is closed and then reopened with ctrl + shift + t, the button will still be checked even though the "X" and "O" radio buttons won't be displayed and there is a function that literally prevents that on page load... I have no idea on how to fix it and simply restarting the page or checking the other radio buttons will fix the issue.

For version 2.0 of this project there really weren't too many things to change or fix, so I did a visual overhaul to make it prettier and added mobile support. I feel as if I'm getting decent at CSS, but it's still not my favourite thing to work on.