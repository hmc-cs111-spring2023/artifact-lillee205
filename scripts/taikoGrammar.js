
var grammar = `
Score 
	= measures:Measure|.., __| {
    	var arr = ["tabstave notation=true tablature=false clef = percussion"]
    	measures.forEach(meas => {arr.push(meas)})
    	return arr
        }
Measure 
    = notes:Note|.., _ | bar:Bar {
    var arr = [] 
    notes.forEach( b => {arr.push(b + " $.a./bottom.$")})
   	return arr.join(" ") + " " + bar
   }

Note
   = beat:Beat _ 
   
Beat
	= PlayedCenterBeat
    / PlayedRimBeat
    / Rest
 
PlayedCenterBeat
	= "don" {return ":q C/4"}
    / "do" {return ":8 C/4"}
    
PlayedRimBeat
	= "ka" {return ":q C/5"}
    / "kara"{return ":8 C/5"}

Rest
	= "tsu" {return "##"}
    
Bar 
	= "|"
    / "=|="
   
_ "whitespace"
    = [ \\t\\n\\r]*

__ "mandatory whitespace"
	= [ \\t\\r\\n]+

`
let f = 
`
BeatMod
    = "[" BeatScale "]"
    / ""
    
BeatScale 
	= "1"
    / "2" 
    / "4"
    / "1/2"
    / "1/4"
`