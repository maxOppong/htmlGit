# Project One: Clone [this](https://creativemarket.com/ikonome/686585-Material-Resume-Blue/screenshots/#screenshot2) Online Resume

## Content
* [Overview](#overview)
* [Dev Env](#dev-env)
* [What I Learnt](#what-i-learnt)
* [Challenges](#challenges)
* [My Thoughts](#my-thoughts)

### Overview
***
* This is the First Project from [P1xt’s guide](https://github.com/P1xt/p1xt-guides).
* I completed the project in 7 working days
* Overall it was an exciting experience having to plan the details of the layout & bringing it to life with CSS.

### Dev Env
***
* Atom
* Google Chrome Browser

### What I Learnt
***
* I learnt about grid systems & created a basic 12-col-grid. I followed [this](https://www.sitepoint.com/understanding-css-grid-systems/) simple tutorial
	* I think creating grids with paddings is better than with margins because the padding is factored into the width (i.e. using “box-size: border box:” of course). So modifying paddings/width automatically adjusts the other to keep the same total width. On the other hand, you have to constantly keep an eye on the total width when working with margins because it's separated from the width.
* z-index lets you control the stacking order of positioned elements (absolute or relative).
* when using box shadow, you have to look out for the stacking order. It determines whether or not the box shadow appears on top or behind other elements.
	* Child elements stack on top of parent element.
	* For child elements on same level, lower elements stack on top of upper elements. Hence the box shadow of the lower element appears above the upper element. i.e. The box shadow of ```div class=“two”``` appear above ```div class=“one”```. You can use z-index to explicitly control the stacking order.
		```html
		<section>
			<div class=“one”></div>
			<div class=“two”></div>
		</section>
		```
* Calculating percentage values for child elements
	* Using box-sizing: border-box has the following effects on width
		* Total Width = Width + Margins
		* Width = cssWidth + Padding + Border.
	* Paddings & Margins are calculated based on the Parent Element’s Width
* Creating columns of equal heights. To do this I used a hack I saw on a forum somewhere.
	* Add huge padding & - margin of the same size (eg: 1000em and -1000em respectively) to clip the content at the desired height.
	* Set the parent element to hide overflow
* One thing to note when using a property shorthand is, every value that’s not explicitly set keeps it's default value.

### Challenges
***
* The biggest challenge i faced was calculating percentage values for child elements. I mostly wanted to understand how layouts work & it took me a while to understand how to find the right percentage values.
* I couldn’t come up with a way to implement the circular progress bar so i used the implementation by [jumpifzero](https://www.cssscript.com/circular-progress-bar-plain-html-css). Also it’s not really a crucial topic to learn based on my [goals](https://github.com/intOppong/software_engineer_journey/blob/master/README.md#my-goal).

### My Thoughts
***
* You gotta plan EVERYTHING. At the onset, it was difficult having to do everything on my own without a tutorial, especially the CSS.
* It’s better to prototype your layouts on paper with known measurements else you’ll waste more time when coding the css.
* I should get the styles to work before thinking about organizing the css file.
* Using a grid system increases productivity in the sense that you don’t have to worry too much about layouts when styling your site.
* I prefer to use **px** for height, **em** for fonts, **%** for width
* Keep calm, let the code make sense to you before running it. It’s easier to find the bugs this way
* Be simple in your design, it shows you really understand & know how to use stuff. I think i wanted to show my skills in writing complex selectors, so i ignored ids even when they make sense. If ids or classes make sense somewhere, use it.

### Tools i used
***
I’d like to acknowledge the following for providing free, amazing & useful tools to the community. I used the these tools in this project
* Google's Free web Fonts contributor [Łukasz Dziedzic for the Lato](https://fonts.google.com/specimen/Lato) font
* [Font-awesome](http://fontawesome.io/)
