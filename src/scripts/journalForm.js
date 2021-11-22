import { sendLetter, setTopics } from "./dataAccess.js"
import { authorDropdown, topicsRadio, recipientDropdown } from "./options.js"

const mainContainer = document.querySelector("#container")

let choseAuthor = 0
let choseRec = 0


document.addEventListener(
    "change", 
    event => {
        if(event.target.value.startsWith("auth") ){
            const [,id ] = event.target.value.split("--")
            choseAuthor = parseInt(id)
        }
        if (event.target.value.startsWith("rec")){
            const [,id ] = event.target.value.split("--")
            choseRec = parseInt(id)
        }
    }
)

document.addEventListener(
    "click",
    evt => {
        if (evt.target.type === "checkbox") {
            setTopics(parseInt(evt.target.id))
        }
    }
)


mainContainer.addEventListener("click", event =>{
    if(event.target.id === "sendLetter"){
        const letterContents = document.querySelector(".input").value
        const datesent = new Date().toISOString().slice(0, 10)

        const authorChoice = choseAuthor
        const recipientChoice = choseRec
        
        const APIletter = {
            authorId: authorChoice,
            recipientId: recipientChoice,
            date: datesent,
            letterContent: letterContents
        }
    sendLetter(APIletter)
    }
})
export const journalForm = () => {
    let html = `
        <div class="field">
            ${authorDropdown()}
        </div>
        <div class="field">
            <label class="label" for="letter">Letter</label>
            <textarea type="text" name="letter" class="input"></textarea>
        </div>
        <div class="field">
            ${topicsRadio()}
        </div>
        <div class="field">
            ${recipientDropdown()}
        </div>

        <button class="button" id="sendLetter">Send Letter</button>
    `

    return html
}