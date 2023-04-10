
Score 
	= (Measure _)*
Measure 
	= Notes|4| _ "/"
    
Notes 
	= (Beats _ BeatMod)*
   
Beats
	= PlayedCenterBeats 
    / PlayedRimBeats
    / Rest
 
PlayedCenterBeats
	= "don"
    / "do"
    
PlayedRimBeats 
	= "ka"
    / "kara"

Rest
	= "tsu"
    
BeatMod
    = "[" BeatScale "]"
    / ""
    
BeatScale 
	= "1"
    / "2"
    / "4"
    / "1/2"
    / "1/4"
	