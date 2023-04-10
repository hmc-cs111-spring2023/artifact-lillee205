const vf = new Factory({ renderer: { elementId: 'output' } });
const score = vf.EasyScore();
const system = vf.System();

score = 
    measure* 

measure =
    notes * 

notes = 
    playedBeats beatAdjustment
    \ rests beatAdjustment

playedBeats = 
    "don" 
    \ "do" 
    \ "ka" 
    \ "kara"

rests = 
    "tsu"
    \ "su"
    \ "rest"

beatAdjustment = 
    "" 
    \ "[frac]"

frac = 
    ""
    \ "1"
    \ "2"
    \ "4"
    \ "1/2"
    \ "1/4"