var cmin=0,cmax=100
var phob={a:20}

m.mount(document.getElementById("domb2"), {
  view: function () {
    
    return m("div",
      [
        m( levelsliderm, { 
          stateobj:phob ,statekey:"a" 
         ,min:cmin ,max:cmax ,steps:100
         ,elstyle:{border:"1px solid black",width:"25em",height:"5em"} 
        } ),
        m( levelsliderm, { 
          stateobj:phob ,statekey:"a" 
         ,min:cmin ,max:cmax ,steps:100
         ,elstyle:{border:"1px solid black",width:"25em",height:"5em"} 
        } ),
        m( levelsliderm, { 
          stateobj:phob ,statekey:"a", vertical:true 
         ,min:cmin ,max:cmax ,steps:100
         ,elstyle:{border:"1px solid black"} 
        } ),
        
      ]
    )
  }
} )
