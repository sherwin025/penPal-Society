import {getUsers, getTopics} from "./dataAccess.js"

export const authorDropdown = () => {
    const authors = getUsers()
    const authorHtml = (author) => {
        return `<option class="authorinfo" name="author" value="auth--${author.id}"> ${author.name}</option>`
    }
    
    let html = ` <label class="label" for="author">Author</label>
    <select name="author" id="author">
                <option value="default"> Choose an Author...</option>`
    
                html +=` 
        ${authors.map(authorHtml).join("")}
    `

    html += `</select>`

return html
}

export const topicsRadio = () => {
    const topic = getTopics()
    const topicHtml = (each) => {
        return `<input type="checkbox" id="${each.id}" name="${each.name}"
        >
        <label for="${each.name}">${each.name}</label>`
    }


    let html =` ${topic.map(topicHtml).join("")} ` 
    return html
}

export const recipientDropdown = () => {
    const recipients = getUsers()
    const recipientHtml = (recipient) => {
        return `<option class="recipinfo" name="recipient" value="rec--${recipient.id}"> ${recipient.name}</option>`
    }
    
    let html = ` <label class="label" for="recipient">Recipient</label>
    <select name="recipient" id="recipient">
                <option value="default"> Choose Recipient...</option>`
    
                html +=` 
        ${recipients.map(recipientHtml).join("")}
    `

    html += `</select>`

return html
}