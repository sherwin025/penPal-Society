import { journalForm } from "./journalForm.js"
import {lettersHtml} from "./letters.js"

export const siteHtml = () => {
    return `<h1>Pen Pal Society </h1>
    
    <div class="journalForm">
        ${journalForm()}
    </div>

    <h2> Letters </h2>
        ${lettersHtml()}
    
    `
}