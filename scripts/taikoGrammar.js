var grammar = `
Score 
	= blocks:MeasureBlocks|.., __| {
    	var arr = ["tabstave notation=true tablature=false clef = percussion"]
    	blocks.forEach(b => {arr.push(b)})
    	return arr
        }
        
MeasureBlocks
	= Measure
    / PatternDef
    / PatternCall
 
Measure 
    = notes:Notes|.., _| _ bar:Bar {return "notes " + notes.join(" ") + " " + bar}

PatternDef 
	= "\`" _ "{" _ name:PatternName _ "}" __ measure:Measure|.., __| _ "\`" {
		hashmap.set(name, measure) 
        return ""
	}
PatternCall
    = "{" _ name:PatternName _ "}" {return hashmap.get(name)}

PatternName 
    = "\\"" _ name:[a-z, _, A-Z]* _ "\\"" {return name.join("")}

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
   = beat:Beat _ beatMod:BeatMod? {
   		var note = ":" + (beat[0] * (beatMod == "" ? 1 : beatMod)) + " " + beat[1]
		return [note]
   }
   
Beat
	= PlayedCenterBeat
    / PlayedRimBeat
    / Rest
 
PlayedCenterBeat
	= "don" {return [4, "C/4"]}
    / "do" {return [8, "C/4"]}
    
PlayedRimBeat
	= "ka" {return [4, "C/5"]}
    / "kara"{return [8, "C/5"]}

Rest
	= "tsu" {return [4, "##"]}
    
BeatMod
    = "[" _ b:BeatScale _ "]" {return b}
    / ""
    
BeatScale 
	= "1" {return 1}
    / "2" {return 2}
    / "4" {return 4}
Bar 
	= "|"
    / "=|="

_ "whitespace"
    = [ \\t\\n\\r]*

__ "mandatory whitespace"
	= [ \\t\\r\\n]+

`