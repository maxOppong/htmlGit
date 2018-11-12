#### *NOTE: This was previously done as the second project using p1xt's guide. I've made minor changes to fit FCC's test suite.*

# Project Two: [Porfolio](https://www.freecodecamp.org/challenges/build-a-personal-portfolio-webpage) from frontend section of FCC.

## Content
* [Overview](#overview)
* [*minified* Documentation](#minified-documentation)
* [Major Decisions on the Project](#major-decisions-on-the-project)
* [What I Learnt](#what-i-learnt)
* [Challenges](#challenges)
* [My Thoughts](#my-thoughts)

### Overview
***
* This is the Second Project from [P1xt’s guide](https://github.com/P1xt/p1xt-guides).
* I completed the project in 10 working days
* I was focused, effective & efficient when i worked but i wasn't consistent. I Could've finished in a shorter timespan if i 
flowed consistently.  [January](https://github.com/intOppong/software_engineer_journey/blob/master/journey/january_2018.md) 
was a bad month.
* This project gave me more confidence in my process for creating websites.

### minified Documentation
***
* Objectives
	* Build a Personal Portfolio Website that fufills the following user stories
		* I can access all of the portfolio webpage's content just by scrolling.
		* I can click different buttons that will take me to the portfolio creator's different social media pages.
		*  I can see thumbnail images of different projects the portfolio creator has built (if you haven't built any websites before, use placeholders.)
		*  I navigate to different sections of the webpage by clicking buttons in the navigation.
* Project Summary
	* It's a Single page website with Nav, Header, Portfolio Section, Footer.
		* Nav: page navigation buttons.
		* Header: contains information about the portfolio creator
		* Portfolio Section: contains thumbnail images of different projects developed by the portfolio creator
		* Footer: contains links to creator’s social media pages 
* Dev Environment
  * [Atom Editor](https://atom.io/)
  * Chrome DevTools

### Major Decisions on the Project 
***
  * I used a 12-col grid without defined margins for the site as a whole but I turned to a 12-col grid with defined margins for 
the portfolio section. i.e. ```.col-4``` is 32%, but for the portfolio section ```.col-4``` is 31.33%, the rest is taken up by margin.
  * Making the width of an element responsive
    * Using a grid system, an element already has it’s width specified in the assigned *col-#* class. eg: ```<div class=“col-6”>```.
    *Changing the width property of ```.col-6``` to a diff size is semantically wrong.*
    * Also, I couldn’t write the logic to change the col width class of an element when the viewport size changes. i.e. 
      * when viewport is 960px, ```<div class=“col-6>```
      * when viewport is 460px, ```<div class=“col-12>```
    * So I created a generic ```.col-width``` class where the width property can be changed with respect to viewport size. i.e.
      * when viewport is 960px, ```<div class=“col-width>```, ```.col-width {width: 33.33%;}```
      * when viewport is 960px, ```<div class=“col-width>```, ```.col-width {width: 100%;}```


### What I Learnt
***
* I found great techniques to [vertically center text/box](https://stackoverflow.com/questions/8865458/how-do-i-vertically-center-text-with-css) 
in another element. 
* I learnt techniques to fill parent element’s space with the child element. They include:
  * One: add absolute position to child element & give it an offset of 0 for all the sides. This sets the element to be as 
  wide & as tall as the parent element & also makes sure it’s sits above the parent element in stacking order. it will fill all available space in its offset parent.
	  ```css
      .fill {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
      }
	  ```
  * Two: use width & height of 100% on child element to make it fill it’s parent element’s space. then add position absolute, 
  top & left of 0 to make sure it doesn’t overflow the parent element.
	  ```css
      .fill {
        position: absolute;
        width: 100%; height: 100%;
        top: 0; left: 0;
      }
    ```
* I also learnt a few new things about margin: auto;
  * margin: auto; dsthe remaining available space as margin for the specified side.
  * margin: auto; on opposing sides. 
    * left & right: means share the remaining space among them.
    * top & bottom: in NDF it’s always set to 0.
    * top & bottom: when absolutely positioned, it’s not part of NDF so the Browser shares any available space between top & 
    bottom.
  * margin auto doesn’t work on images.
* I discovered more about css selectors.
  * CSS element + element selector adds to the specificity of the selector and hence will overrule less specific selectors.
  * Pseudo-class selectors such as *:first-child* has the same specificity as class selectors. 
  * Element & pseudo-elements have the same specificity.
  
    | selector | ID | classes | elements | specificity
    | --- | --- | --- | --- | --- |
    | div | 0 | 0 | 1| 1 |
    | div + div | 0 | 0 | 2 | 2 |
    | div:first-child | 0 | 1 | 1 | 11 |
    | .div-class | 0 | 1 | 0| 10 |
    | p:first-line | 0 |  0 | 2 | 2 |
* Relative & Absolute positioned elements stack on top of Fixed element.
* For fixed positioned elements, if an explicit width is not set, the width is as wide as it’s content/children. 

### Challenges
***
* Making responsive design decisions were generally difficult.
* I had a problem using grids with predefined classes as i wanted to change an element's width from say 4 cols to 6 cols for
an element when it falls in a certain media query but had already applied the ```col-4``` class to the element. i.e. ```div``` 
should have the ```.col-4``` class when width is 960px && it should be ```.col-6``` when width is 768px;
* How do I make the height responsive to viewport/width size?

### My Thoughts
***
* Focus on the essentials. ie the user stories, so i can move faster through projects.
* I'll need a way (through js i think) to change the class of an element depending on various factors. eg: Class A applies 
when width is 960px & Class B applies in 760px. 

### Attribution
***
I’d like to acknowledge the following for providing free, amazing & useful tools to the community. I used the these tools in this project
* Google's Free web Fonts contributor [Łukasz Dziedzic for the Lato](https://fonts.google.com/specimen/Lato) font
* [Font-awesome](http://fontawesome.io/)
* Design Inspiration
	* html5up's Phamtom [template](https://html5up.net/phantom).
	* Justin Sane's [FCC Personal Portfolio Page](https://codepen.io/freeCodeCamp/full/YqLyXB).
