Levelsliderm
============
Here is a level slider component for mithril.js : [Example page](http://strainer.github.io/Fdrandom.js/)

### Features

* Simple configuration.   
* Horizontal or vertical option.

Usage
-----
```javascript 
// run or import levelsliderm.js, then suppose:
let foo = 1, hoo = x, volume = 23 
// ...
// mithril mount this wherever:
m( levelsliderm, { 
    stateobj:this 
   ,statekey:"volume"
   ,min:0 ,max:100 
} )

//more option properties available:

m( levelsliderm, { 
	 /* required parameters */
    stateobj: ... //(scope)
   ,statekey: ... //(property/variable)
   ,min:0 ,max:100 //set range
   /* optional parameters 8/
   ,steps:100       //snap steps
   ,horizontal:true //this is default anyway
   ,vertical:true   //this makes vertical
   ,elstyle:{  //css on element to set size, bgcolor, margin etc
	   margin:"1px" ,width:"2em" ,height:"10em" 
	 }
	 ,elstring:"#id.class" //add string to tag for id or class
	 ,thick:14 //change thickness of rail (a percentage)
	 ,railcolora:"red"      //change color values for parts 
	 ,railcolorb:"#101010"  //... 
	 ,knobcolor:"#999"
	 ,knobholdcolor:"aaa"
	 //,onclickextra:doACustom //custom function to call on clicking knob
} )
```
