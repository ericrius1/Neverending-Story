Neverending-Story
=================

Welcome to Neverending Story!
The Nevereding Story is a collaboritive story-writing game where the players work together to create a story based on a given prompt

For instructions on how to play the game, navigate to neverendingstory.meteor.com and click on the "instructions" button

Neverending Story (NES) is composed of a number of Handlebars templates and mongoDB collections, 
which generally correspond to each other in a one-to-one fashion.]

MODEL (Collections)

GAMES COLLECTION
The Games collection stores all of the games that have been created. Each game keeps track of the current round, total rounds,
and whether players are currently voting or writing.

PLAYERS COLLECTION
Each player holds a reference to the game they are currently in, if any (each player can only be in one game).
A player also stores the number of votes he has gotten for his submission each round, as well as whether he has 
voted in that round yet

STORIES COLLECTION
Each story holds a reference to the game it is attached to, 
and the original prompt as well as the dynamically forming narrative content.

TIMERS COLLECTION
Each Timer holds a reference to the game it is attached to, and keeps track of time remaining for players to write
their submission.

VIEW (Templates)

The first template to appear when the player navigates to the neverending story site is the Main view. The main view displays one of three subviews,
the Lobby, Game, or PostGame View.

Lobby View:
The Lobby template allows the player to start or join a game, as well as reading the instructions.

Game View: 
The Game template is composed of three sub-templates- the players, stopwatch, and story template. 

The players template displays each player as a selectable tab, with their current submission. 

The stopwatch template displays the time as an old-timey watch which uses the CSS3 rotation feature to 
rotate the second-hand around. 

The story template displays the up-to-date story content, thanks to meteor's reactive templating feature, 
which updates the dom automatically anytime relevent changes on the backend.



