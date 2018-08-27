Levelsliderm
============
Here is a level slider component for mithril.js : [Example page](http://strainer.github.io/levelsliderm/)

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

//more properties are arranged:

m( levelsliderm, { 
	 /* required parameters */
    stateobj: ... //scope of the slaved variable
   ,statekey: ... //name of the slaved variable
   ,min:0 ,max:100 //range of slaved variable
   /* optional parameters */
   ,steps:100       //snap steps
   ,reverse:false   //reverse the direction of control
   ,vertical:true   //this makes vertical
   ,horizontal:true //this is default
   ,elstring:"#id.class" //add a string to tag for id or classes
   ,elstyle:{            //css on element for size, bgcolor etc
	   margin:"1px" ,width:"2em" ,height:"10em" 
	 }
   ,railcolora:"red"      //color of rail before knob
   ,railcolorb:"#101010"  //color of rail after knob
   ,thick:14          //thickness of rail (a percentage of svgs size)
   ,horizontal:false
   ,strokewidth:"0.8%"
   ,strokecolor:"dimgrey"
   ,knobstrokewidth:"0.8%"
   ,knobstrokecolor:"#171757"
   ,knobsize:"4.9%"
   ,knobcolor:"#02b"   
   ,knobholdcolor:"#aaa"
   ,onclickextra:fnc  //custom function to call on clicking knob
} )
```

Version 1.0.0-beta