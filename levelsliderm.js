/*
m( levelsliderm, { 
   /// required parameters
    stateobj: ... //scope of the slaved variable
   ,statekey: ... //name of the slaved variable
   ,min:0 ,max:100 //range of slaved variable
   /// optional parameters
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
   ,knobcolor:"#999"
   ,knobholdcolor:"#aaa"
   ,thick:14          //thickness of rail (a percentage of svgs size)
   ,onclickextra:fnc  //custom function to call on clicking knob
} )

*/

function sswap(a,b,c){ var q=a[b];a[b]=a[c];a[c]=q }
function mergeaintob(a,b){ for (var ky in a) { b[ky] = a[ky] } }
 
function levelsliderm(vnode) {

  var stateobj = vnode.attrs.stateobj //scope to access slaved variable
  var statekey = vnode.attrs.statekey //symbol name of slaved variable
  var callback = vnode.attrs.callback //symbol name of slaved variable

  var thick = vnode.attrs.thick||16  // thickness of rail
  var min = vnode.attrs.min        // min value of variable
  var max = vnode.attrs.max        // max value of variable
  var steps = vnode.attrs.steps||4294967296
  var setting = (stateobj[statekey]-min)/(max-min) 
  var reverse = vnode.attrs.reverse 
  var horizontal = vnode.attrs.horizontal
  if (horizontal===undefined) horizontal=(!vnode.attrs.vertical)
  if(!horizontal) reverse=!reverse
  
  var onclickextra = vnode.attrs.onclickextra

  var strokecolor=vnode.attrs.strokecolor||"dimgrey"
  var knobstrokecolor=vnode.attrs.knobstrokecolor||strokecolor
  var strokewidth=vnode.attrs.strokewidth||"0.8%"
  var knobstrokewidth=vnode.attrs.knobstrokewidth||strokewidth
  var knobcolor=vnode.attrs.knobcolor||"LightSteelBlue"
  var knobsize=vnode.attrs.knobsize||"5.5%"
  
  var knobtribs={ fill:knobcolor,stroke:knobstrokecolor,"stroke-width":knobstrokewidth,r:knobsize }
  
  var elstyle = { width:"10em",height:"2.5em" }
  if(!horizontal) sswap(elstyle,'width','height')
   
  var railtribsa ={ fill: 'LightSeaGreen',stroke:strokecolor,"stroke-width":strokewidth }
  var railtribsb ={ fill: 'LightSKyBlue',stroke:strokecolor,"stroke-width":strokewidth }
    
  if(reverse) {
    var c=railtribsa.fill
    railtribsa.fill=railtribsb.fill ; railtribsb.fill= c
  }
  var railtagstringa, railtagstringb, railtagstringc, knobtagstring
   
  if(horizontal){ 
    
    railtribsa.x      = "5%" //horizontal rail draws from 5% to 95% 
    railtribsa.y      = railtribsb.y      = (50-thick/2)+"%" 
    railtribsa.height = railtribsb.height = thick+"%" 

    railtribsa.rx     = railtribsb.rx     = "1.1%"  //round edges of rectangle
    railtribsa.ry     = railtribsb.ry     = "7.5%" 
    
    railtagstringa='rect[width='
    knobtribs.cy='50%'
    knobtagstring ='circle[cx='

  }else{
    
    railtribsa.y      = "5%" //horizontal rail draws from 5% to 95% 
    railtribsa.x      = railtribsb.x      = (50-thick/2)+"%" 
    railtribsa.width  = railtribsb.width   = thick+"%" 

    railtribsa.ry     = railtribsb.ry     = "1.1%"  //round edges of rectangle
    railtribsa.rx     = railtribsb.rx     = "7.5%" 
        
    railtagstringa='rect[height='
    knobtribs.cx='50%'
    knobtagstring ='circle[cy='
    
    sswap(this,'min','max') 
  }
  
  mergeaintob( vnode.attrs.elstyle, elstyle )

  var xpos = (Math.round(steps*(5+setting*90))/steps)+"%"
  var mouseisdown = false
  var knobpos
  
  function detectleftbutton(evt) {
    evt = evt || window.event
    if ("buttons" in evt) return evt.buttons == 1
    return (evt.which || evt.button) == 1
  }

  function mousedown(e) {
    mouseisdown = true
    return adjust(e)
  }
  
  function onclickex(e) {
    return onclickextra(e)
  }
  
  function adjust(e) {
    
    if(!(mouseisdown||detectleftbutton(e))) return true
    mouseisdown = false
    
    var mx=e.clientX, my=e.clientY
    var domrect = vnode.dom.getBoundingClientRect()
    
    var xpos = (mx-domrect.left)/domrect.width
    var ypos = (my-domrect.top)/domrect.height
    
    var cpos,bpos,bborder=0.15
    if(horizontal){
      cpos=(xpos-0.04999999999)*1.1111111111111
      bpos=ypos
    }else{
      cpos=(ypos-0.04999999999)*1.1111111111111
      bpos=xpos
    }
    
    if(reverse) cpos=1-cpos
    if(cpos<-0.025||cpos>1.025) return true
    if(!(bpos>bborder&&bpos<1-bborder)) return true
    
    cpos=cpos<0?0:cpos>1?1:cpos
    
    if(callback && !callback(cpos)){
      return false //do callback and return if finnished
    }
    
    cpos=Math.round(steps*cpos)/steps
    stateobj[statekey]=(min+ cpos*(max-min))
    
    return false
  }
  
  function onmousemove(e){ var cx=e.clientX, cy=e.clientY }
  //~ function onmouseout(){}
  
  return {
    
    oninit: function(vnode) {
    },

    oncreate: function(vnode) {
      var domrect = vnode.dom.getBoundingClientRect()
      bheight = domrect.height
      bwidth  = domrect.width
    },
        
    view: function(vnode) {
      
      var knobpos=((stateobj[statekey]-min)/(max-min)*90)
      if(reverse) knobpos=90-knobpos
      
      if(horizontal){ 
        railtribsb.x = (knobpos+5)+"%"
      }else{
        railtribsb.y = (knobpos+5)+"%"
      }	

      return m('svg', 
        { 
          onclick:onclickextra,
          onmousedown:mousedown,
          onmousemove:adjust,
          ondragstart:()=>false,
          style:elstyle
        },
        [
          m(
            railtagstringa+knobpos+'%]', 
            railtribsa 
          ),
            
          m(railtagstringa +(90-knobpos)+'%]', 
            railtribsb ),
             
          m(knobtagstring+(5+knobpos)+'%]',
            knobtribs
          )
        ]
      )
    }
  }
}