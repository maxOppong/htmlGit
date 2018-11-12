# Project Three: [Tower of Hanoi Solver](https://github.com/intOppong/software_engineer_journey/blob/master/cs_wd_progress.md)

## Content
* [Overview](#overview)
* [*minified* Documentation](#minified-documentation)
* [Major Decisions on the Project](#major-decisions-on-the-project)
* [What I Learnt](#what-i-learnt)
* [Challenges](#challenges)
* [My Thoughts](#my-thoughts)

### Overview
***
* This is the Third Project from [P1xt’s guide](https://github.com/P1xt/p1xt-guides).
* I completed the project in 30 working days in real time (Feb 26-April 5th). *NOTE: 5 Days is 1 week (Mon - Fri)*
  * first 10 working days: did nothing for various or no reasons.
  * next 20 working days: worked on project + occasional loss in momentum.
* Very Inconsistent but i showed determination & gained momentum as i switched from focusing on results to focusing on the process. [March](https://github.com/intOppong/software_engineer_journey/blob/master/journey/04_march_2018.md).

### minified Documentation
***
**Objectives**
* Build an online Towers of Hanoi solver that accepts a tower height between 5 and 10, and then displays a graphical (animated) solution, iteratively moving each piece until the puzzle is solved.
* Tower of Hanoi [Problem](https://courses.edx.org/courses/course-v1:UTAustinX+UT.9.10x+3T2016/courseware/f15802593f9f433b847253f7dadb6902/d06e11a5cce7489eb2f3dbb4ad1201c9/1?activate_block_id=block-v1%3AUTAustinX%2BUT.9.10x%2B3T2016%2Btype%40vertical%2Bblock%40f42ff328ba2b4b82ba33fc80252cbf01) Description: There are 3 pegs, one of which has a specified number of discs of different sizes. The goal is to move all of the discs to the another peg. Here are some rules to follow.
  * You may only move one disc at a time, and
  * You can never put a disc on top of a smaller disc

**Project Summary**
* It’s a single page website with 2 main sections. One allows the user to set up the puzzle according to their preference & the other displays the animation solution to the puzzle.
* Dev Environment
  * [Atom Editor](https://atom.io/)
  * Chrome DevTools

**main Variables / Data structures**
* Peg: an object that holds data about the peg & the number of discs on the peg. Some properties are
  * pos: a number representing the position of the peg. either 1, 2 or 3
  * initialPeg: a boolean that determines which peg will hold all the discs at the start of the puzzle
  * finalPeg: a boolean that determines which peg will hold all the discs at the end of the puzzle
  * sortPeg: a boolean that identifies which peg to sort discs on at the end each round.
* Disc: an object that holds data about a disc.
  * num: a number that represents the disc
  * currentPeg: a number that shows the current peg the disc is on.
  * destinationPeg: a number that shows the next peg a disc will move to.
  * baseDisc: an object that represents the largest disc that will move to the bottom of the sortPeg during each round. It’s the first disc in the initialPeg after each round.
  * smallerDiscs: an array containing the discs that’ll be moved to the sortPeg after the baseDisc has been moved there. Larger discs are moved first. All discs smaller than the baseDisc are stored in the smallerDiscs[].
* pegPositions: an array that contains the peg Positions. the positions are eliminated from the array until 1 is left, which is then assigned as destinationPeg for a disc in the smallerDiscs.
* largestDiscNumberType: a boolean that checks if the largest disc is even or odd & is used to determine the sortPeg
* orderOfMovement: an array which stores each disc that was moved during the round in order. It is used for the animation. So if there are 2 or more occurrences of the disc in orderOfMovement array, then the next one is where is previous one is moved to. if theres only 1 occurrence, it means the disc is next move is to the sortPeg.
  * movingDisc = 1st element in the orderOfMovemen

Some Trule Statements
- All even discs are sorted on one peg, All odd disc are sorted on the other peg.
- The sortpeg is always Empty each round at the start of each round.
- InitialPeg cannot be the sortPeg. cos we are looking to move the discs to another peg.
- SmallerDiscs array is always equal to the peg whose’s first disc is smaller than the baseDisc ie the smaller Peg.
- The largestDisc is sorted on the finalPeg.

**main Functions**
* setSortPeg(): uses the baseDisc to find the peg to sort on for each round then sets It’s sortPeg property to true.
  * It cannot be the currentPeg of the baseDisc (ie the initialPeg)
  * Since The largest disc is sorted on the finalPeg, if largest disc is an even number, then the sortPeg of an even disc is the peg that will be the finalPeg & vice versa.
  * the sortPeg is always Empty each round because even numbers follow odd numbers and they are sorted on different pegs.
  * the sortPeg is always Empty each round
* moveToNewPeg(Obj): Moves the disc to it’s new peg, stores the discs previous position (x, y positions etc) into the orderOfMovement array then updates the disc’s current position.
* setDestinationPegs(): sets the destination pegs of discs in the smallerDiscs.
  * it cannot be the discs currentPeg
  * It cannot be the next/higher discs (disc+1) currentPeg or DestinationPeg
  * NOTE: so you have to know the higher disc’s currentPeg & destinationPeg to set that of the lower discs in the smallerDiscs
* moveDisc(Obj): it accepts a disc as an argument & recursively / continually moves other discs till the *passed-in* disc is moved to it's destination peg.

**Pseudocode for the Logic**
* create 3 Pegs
* user select initial & final pegs,
* store all discs to the initial peg in ascending order
* Find the sortPeg.
* Find the (initial) baseDisc: it’s the first disc in initial Peg
* *Loop* until the number of discs in the initialPeg is zero
  * Move baseDisc to sortPeg
  * If baseDisc > 1
    * Find the peg who’s first disc is lesser than the baseDisc.
      * Assign them to an array (smallerDiscs[]) & keep track of their Current Peg & Destination Peg.
    * *Loop* Move the smallerDiscs to the SortPeg one by one  until all smallerDiscs sits on the sortPeg in Ascending Order
  * Else
    * Find the next sortPeg.
    * find the next baseDisc. *the first disc in initialPeg.*
  * Find the next sortPeg.
  * Find the next baseDisc. *the first disc in initialPeg.*

**Pseudocode for the Animation**
* move the movingDisc from previous Peg
  * draw the previous peg of the moving disc.
  * draw the current discs on the peg. NOTE: it’s without the movingDisc
  * draw the movingDisc on it’s previous peg
  * animate the movingDisc to top of previous peg
* animate the movingDisc to top of new peg
* move the movingDisc to it’s new Peg
  * draw the new peg with current disc. without the moving disc
  * animate the movingDisc to the new peg

### Major Decisions on the Project
***
* I used pure JS with no libraries with this project. *I’ll use jQuery with the [next](https://www.freecodecamp.org/challenges/build-a-simon-game) project*
* Changed peg & disc object structure to include their canvas data instead of storing it in a different object.
* I place the functions & variables into separate files. *not sure if it's the right thing to do*
* decided to create an orderOfMovement array to store all the disc movements during each round & use that for my animation after the round. I couldn't find a way to do a real time animation ie animate the discs as they move from 1 disc to another during each round.
* Since I'm not focusing on front-end development & I already have a firm understanding of css layouts & other css principles,  I’m ditching custom css layout for bootstrap. I want to be good at bootstrap so I don’t worry about intricacies of CSS layouts anymore (calculating widths/padding/margin etc).

### What I Learnt
***
* Handy Javascript Array methods: slice, splice etc.
* Debugging JS in Chrome DevTools
* Animation is about knowing x & y positions as you move forward ie where to start & move to & end
* HTML5 canvas arc() method.
* You don’t have to clear the entire canvas just a portion of the canvas.
* Organizing/refactoring the code.
* Organizing/refactoring the code: “Programs must be written for people to read, & only incidentally that machines also read it.” What it means
  * your code should be well structured & organized, broken into parts(smaller functions), files.
  * use meaningful variable & function names
  * documentation: stating the purpose of major variable & function
* I tried my best to make the animation section run alongside the logic section of the code. This didn’t work, then i found out I needed to learn [Callbacks & async](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)
* Why Callback is needed:
  * Javascript will keep executing. It doesn’t wait for anything (eg user input, response etc).
  * Because JS doesn’t wait for anything before executing, if funcA shows up in code before funcB but funcA has to wait for user input. JS will execute funcB then execute funcA when the delay is over (user has input sth). But what if you want funcA to execute before funcB? This is where callback comes in. One major use of callbacks is to stop certain code from executing until other code has finished executing. in my case I used it to ensure the logic part to wait for the animation to execute before moving on to the next round.
* setInterval() & requestAnimationFrame() are similar. They are both asynchronous. requestAnimationFrame is well optimized/better version of setInterval().
  * requestAnimationFrame() It’s simply a way to tell the browser “before drawing the next frame on the screen, execute this logic/animation processing”. The browser is in charge of choosing the best moment to execute the code, which results in a more efficient use of resources whereas with setinterval() you have to decide on the interval/time (in milisec) to run the logic/animation,
* I learn’t various array helper functions such as push(), unshift(), splice() & slice()
* I learnt about traversing the DOM to find any object (element) you want.
* My personal Opinion on When to create a function
  * when a task comprises of a comprehensive number of other tasks.
  * when a task is/will-be used by multiple function.
  * when 1 task is too long. *not sure about this*

### Challenges
***
* Difficulty writing the pseudocode for a puzzle which i’ve already solved.
* Difficulty selecting which data structure to use: Array or Objects.
* Difficulty debugging the code - tracking the state of variables.
* I find myself changing variable names a lot, during coding.
* Sometimes, it takes me a while to come up with the right comparison statements . *I thought this will be one of the easiest part* :worried:
* Difficulty in structuring the peg & discs objects in a way that’s easily accessible by both canvas & logic.
* Got really frustrated as I couldn’t get the animation to run alongside the logic section of the code for long while.
  * after solving it. i still couldn’t get the animation to work. *i need to try another method.*
* I wanted to run the logic, pause it, run the animation, then continue with the logic. ie move 1 & pause, animate it then continue ie move 2, animate it but I just couldn’t do it.
* I wanted to animate the discs as they move from 1 disc to another during the round but I just couldn't do it. I had to do it after each round.

### My Thoughts
***
* Breaking things down into functions & giving them meaningful names helps me read/understand code better. This also helps in debugging since all you have to do is follow the functions (& variables)
* Ways to make coding easy: write pseudocode, break everything into function.
* I realized a basic routine with programming is deciding which data structures to use, knowing the return types of functions, writing code to access the data you want.
* I think I spend too much time making the code look good.
* I feel I could’ve / should’ve refactored the code better. I was trying to organize the code according to the Delegation-Oriented Design method (OOLO). but i think i need a better understanding of Design Patterns to do that.
* The Data Structures you use really determine how you write your logic. because a big part coding is accessing data.
* I like the method of predefining classes then changing them as the script runs to apply new styles/characteristics to elements.
* I really like bootstrap. Now I don’t have to worry too much about the CSS details. Bootstrap is a life saver. :laughing:


### Attribution
***
  * [Effective Thinking Through Mathematics: Week 2](https://courses.edx.org/courses/course-v1:UTAustinX+UT.9.10x+3T2016/course/): Tower of Hanoi
  * [Chris Courses](https://www.youtube.com/watch?v=EO6OkltgudE&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL): HTML5 Canvas Tutorial
  * [Eduonix Learning Solutions](https://www.youtube.com/watch?v=XccOs0tWngg&index=18&list=PLDmvslp_VR0wkiclky6vj6SSDx-N2QE9z): Snake Game Tutorial Project
  * [Drew Ryan](https://www.youtube.com/watch?v=9cKsq14Kfsw): Bootstrap Tutorial Project
