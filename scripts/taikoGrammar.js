
var grammar = `
Score 
	= measures:Measure|.., __| {return ["tabstave notation=true tablature=false clef = percussion \\n", measures]}
Measure 
	= notes:Notes _ "|" {return "notes " + notes + "|"}
    / notes:Notes _ "=|=" {return "notes " + notes + "=|="}
    
Notes 
   = Beats|.., _| 
Beats
	= PlayedCenterBeats 
    / PlayedRimBeats
    / Rest
 
PlayedCenterBeats
	= "don" {return ":q C/4"}
    / "do" {return ":8 C/4"}
    
PlayedRimBeats 
	= "ka" {return ":q G/4"}
    / "kara"{return ":8 G/4"}

Rest
	= "tsu" {return "##"}
	
_ "whitespace"
    = [ \\n\\r]*

__ "mandatory whitespace"
	= [ \\r\\n]+
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