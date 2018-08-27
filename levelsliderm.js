function ccomponent(vnode) {
  
  var ook
  
  
  return {	
    oninit: function(vnode) { ook=vnode.attrs.stateobj[vnode.attrs.statekey];vnode.state.ook=ook  },

    view: function(vnode) {
      return [
        m("div", {style: {height:"1em", width:2+vnode.attrs.stateobj[vnode.attrs.statekey]+"em", backgroundColor:"red"} } ),
        //m("div", {style: {display:"none"}},ook )
      ]
    }
    
  }
  
}


function levelsliderm(vnode) {

  var stateobj = vnode.attrs.stateobj //scope to access slaved variable
  var statekey = vnode.attrs.statekey //symbol name of slaved variable
  var callback = vnode.attrs.callback //symbol name of slaved variable

  var thick = vnode.attrs.thick||14  // thickness of rail
  var min = vnode.attrs.min        // min value of variable
  var max = vnode.attrs.max        // max value of variable
  var setting = (stateobj[statekey]-min)/(max-min) // current setting 
  var subfrac = vnode.attrs.steps||4294967296
  var xpos = (Math.round(subfrac*(5+setting*90))/subfrac)+"%"
  var mouseisdown = false
  var onclickextra = vnode.attrs.onclickextra
  var knobpos
 
  var knobstyle={ 
    border:"1px solid black",
    fill:"white",
    r:"4.5%"
  }
  
  var horizontal = vnode.attrs.horizontal||(!vnode.attrs.vertical)
  
  var elstyle = { 
    padding:0, border:"1px solid black"
   ,margin:"1em", position:"relative"
  }
    
  var railstylea ={ fill: 'darkgrey' }
  var railstyleb ={ fill: 'grey' }
    
  var railtagstringa, railtagstringb, railtagstringc, knobtagstring
   
  if(horizontal){ 
    
    railstylea.x      = "5%" //horizontal rail draws from 5% to 95% 
    railstylea.y      = railstyleb.y      = (50-thick/2)+"%" 
    railstylea.height = railstyleb.height = thick+"%" 

    railstylea.rx     = railstyleb.rx     = "1.1%"  //round edges of rectangle
    railstylea.ry     = railstyleb.ry     = "7.5%" 
    
    railtagstringa='rect[width="'
    railtagstringb='%"][x="'
    railtagstringc='%"]'
    knobstyle.cy='50%'
    knobtagstring ='circle[cx="'
    
    elstyle.width="10em"
    elstyle.height="2em"

  }else{
    
    railstylea.y      = "5%" //horizontal rail draws from 5% to 95% 
    railstylea.x      = railstyleb.x      = (50-thick/2)+"%" 
    railstylea.width = railstyleb.width   = thick+"%" 

    railstylea.ry     = railstyleb.ry     = "1.1%"  //round edges of rectangle
    railstylea.rx     = railstyleb.rx     = "7.5%" 
    
    railstylea.fill = 'grey'
    railstyleb.fill = 'darkgrey'
    
    railtagstringa='rect[height="'
    railtagstringb='%"][y="'
    railtagstringc='%"]'
    knobstyle.cx='50%'
    knobtagstring ='circle[cy="'
    
    elstyle.width="2.5em"
    elstyle.height="10em"
    var c=max ; max=min ; min=c
        
  }
  
  function mergeaintob(a,b){ for (var ky in a) { b[ky] = a[ky] } }
  
  mergeaintob( vnode.attrs.elstyle, elstyle )
  
  //https://stackoverflow.com/questions/3944122/detect-left-mouse-button-press 
  function detectLeftButton(evt) {
    evt = evt || window.event
    if ("buttons" in evt) return evt.buttons == 1
    var button = evt.which || evt.button
    return button == 1
  }

  function mousedown(e) {
    mouseisdown = true
    return adjust(e)
  }
  
  function onclickex(e) {
    return onclickextra(e)
  }
  
  function adjust(e) {
    
    if(!(mouseisdown||detectLeftButton(e))) return true
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
    
    if(cpos<-0.025||cpos>1.025) return true
    if(!(bpos>bborder&&bpos<1-bborder)) return true
    
    cpos=cpos<0?0:cpos>1?1:cpos
    
    if(callback && !callback(cpos)){
      return false //do callback and return if finnished
    }
    
    cpos=Math.round(subfrac*cpos)/subfrac
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
      
      if(horizontal){ 
        railstyleb.x = (knobpos+5)+"%"
      }else{
        railstyleb.y = (knobpos+5)+"%"
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
            railtagstringa+knobpos+'%"]"', 
            railstylea 
          ),
            
          m(railtagstringa +(90-knobpos)+'%"]"', 
            railstyleb ),
             
          m(knobtagstring+(5+knobpos)+'%"]"',
            knobstyle
          )
        ]
      )
    }
  }
}