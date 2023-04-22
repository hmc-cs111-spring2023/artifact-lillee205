// Initialize text editor
var quill = new Quill('#editor', {
    theme: 'snow'
  });

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
var hashmap = new Map()
const parser = peggy.generate(grammar)
console.log(grammar)
// Get text file and read it
const inputElement = document.getElementById("input")

$("#identifier").on("submit",function(e) {
    tab.reset()
    artist.reset()
    e.preventDefault()
    textObj = quill.getContents()
    text = processText(textObj)
    console.log("input is")
    console.log(text)
    parseInput(text)
})

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
        parseInput(taikoInput)
        
    }
}, false)

function parseInput(input) {
    try { // Try parsing
        const output = parser.parse(input.trim())
        console.dir(output, {depth: null}) // print taiko lang input
        data = output[0] + "\n" // setting up header
        music = output.splice(1) // notes
        music.forEach( m => {
            data += m + "\n"
        })
        console.log("Vex tab translation")
        console.log(data)
        // Create vextab
        tab.parse(data)
        artist.render(renderer)

    } catch(e) { // If parsing fails, print error
        console.log(e)
    }
}

function processText(textObj) {
    var text = ""
    textObj.forEach( entry => {
        if ("attributes" in entry && entry["attributes"]["bold"] == true ) {
            text += "<bold>" + entry["insert"] + "</bold>"
        } else {
            text += entry["insert"]
        }
    })
    return text
}
