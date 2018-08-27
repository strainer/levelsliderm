var cmin=0,cmax=100
var phob={a:20}

var slength="2.75em",swide="20em"

var s ={ 
  stateobj:phob ,statekey:"a" 
 ,min:cmin ,max:cmax ,steps:100
 ,elstyle:{ border:"0px dashed black",width:slength,height:swide,float:"left" }
 ,horizontal:false
 ,knobsize:"4.9%"
 ,knobcolor:"#02b"
 ,strokecolor:"dimgrey"
 ,knobstrokecolor:"#171757"
 ,strokewidth:"0.8%"
 ,knobstrokewidth:"0.8%"

}

var d=document.getElementById("dash")
var b=document.createElement("div")
d.appendChild(b)

appendslider(s,b)
s.reverse=true
appendslider(s,b)
s.reverse=false
b=document.createElement("div")
d.appendChild(b)

s.horizontal=true
s.elstyle.width=swide;
s.elstyle.height=slength;
//slength;
for(var i=0;i<4;i++) appendslider(s,b)
s.reverse=true
s.elstyle.height="1.6em"
for(var i=0;i<12;i++) appendslider(s,b)
s.reverse=false
s.steps=1
for(var i=0;i<2;i++) appendslider(s,b)
s.steps=2
for(var i=0;i<2;i++) appendslider(s,b)
s.steps=8
for(var i=0;i<2;i++) appendslider(s,b)

function appendslider(s,e){ 
  var b = document.createElement("div")
  //d=e||d||document.body
  
  e.appendChild(b)
  m.mount(b, 
    {
      view: function () {
        return m("div",
          m( levelsliderm, s )
        ) 
      }
    }
  )
}


/*

m.mount(document.getElementById("domb3"), {
view: function () {
  
  return m("div",
    [ 
      m( ccomponent, { stateobj:phob ,statekey:"a" } )
    ]
  )
}
} )
*/