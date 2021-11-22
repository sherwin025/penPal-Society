import { getUsers, getLetters, getTopics, getLettersTopics } from "./dataAccess.js"


export const lettersHtml = () => {
    const letters = getLetters()
    const authors = getUsers()
    const topics = getTopics()
    const chosentopics = getLettersTopics()

    const craftLetter = () => {

        return `${letters.map(
            (letter) => {
                const matchedauthor = authors.find(
                    (author) => {
                        return letter.authorId === author.id
                    }
                )
                const matchedrecip = authors.find(
                    (author) => {
                        return letter.recipientId === author.id
                    }
                )
                const matchedtopics = chosentopics.filter(
                    (topic) => {
                        return letter.id === topic.letterId
                    })
                    
                const topichtml = matchedtopics.map(
                    (eachtopic) => {
                        const thetopic = topics.find(
                            (topic) => eachtopic.topicId === topic.id
                        )
                        return `${thetopic.name} `
                    }
                ).join("")

                return `
                <div class="indvletter">
                    <div class="topletter">Dear ${matchedrecip.name}(${matchedrecip.email}) </div>
                    <div class="letterContent">${letter.letterContent} </div> 
                    <div class="letterclosing">Sincerely, ${matchedauthor.name}(${matchedauthor.email})</div>
                    <div class="date">sent on ${letter.date}</div>
                    <div class="chosentopics"> ${topichtml}</div>

                </div>
                `
                }
        ).join("")
            }`
        }
    let html = ""
    html += craftLetter()
    return html
    }
