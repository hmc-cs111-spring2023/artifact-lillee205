var data = ""

// Create canvas for sheet music
const VF = Vex.Flow 
const renderer = new VF.Renderer($('#boo')[0],
	VF.Renderer.Backends.SVG)
    
// Initialize VexTab artist and parser.
const artist = new Artist(10, 10, 750, { scale: 0.8 })
const tab = new VexTab(artist)

// Generate parser
console.log("generating grammar")
const parser = peggy.generate(grammar)
console.log(grammar)
// Get text file and read it
const inputElement = document.getElementById("input");

// When file is selected, then parse file
inputElement.addEventListener("change", function() {
    console.log("reading file")
    // Read file
    var fr = new FileReader()
    fr.readAsText(this.files[0]);
    fr.onload = function() {
        const taikoInput = fr.result
        console.log("The file we're looking at:")
        console.log(taikoInput)
        try { // Try parsing
            const output = parser.parse(taikoInput.trim())
            console.dir(output, {depth: null})
            data = output[0] // setting up header
            music = output[1]
            music.forEach((measure) => {
                data += measure.replaceAll(",", " ") + "\n"
            })
            console.log(data)
            // Create vextab
            tab.parse(data)
            artist.render(renderer)

        } catch(e) { // If parsing fails, print error
            console.log(e)
        }
    }
}, false)




// Music component 
//renderer = new Vex.Flow.Renderer($('#music')[0], Vex.Flow.Renderer.Backends.SVG);
// const vf = new Factory({
//     renderer: { elementId: 'output', width: 500, height: 200 },
// });
// const score = vf.EasyScore();
// const system = vf.System();

// The grammar for parsing the user's input 
// We can declare this variable at the bottom because of JS' hoisting property
