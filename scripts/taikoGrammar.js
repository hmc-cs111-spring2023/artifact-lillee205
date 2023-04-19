
var grammar = `
Score 
	= measures:Measure|.., __| {
    	var arr = ["tabstave notation=true tablature=false clef = percussion"]
    	measures.forEach(meas => {arr.push(meas)})
    	return arr
        }
Measure 
    = notes:Notes|.., _| _ bar:Bar {return "notes " + notes.join(" ") + " " + bar}

Notes
	= "<bold>" _ notes:Note|.., _| _ "</bold>" _ {
    	var arr = []
        notes.forEach(n => {
        	arr.push(n.join("") + " $.a./bottom.$ ")
        })
        return arr.join("")
    }
    / note:Note _ {return note}
Note
   = beat:Beat _ {return [beat]}
   
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