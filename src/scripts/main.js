import {fetchUsers, fetchLetters, fetchLettersTopics, fetchTopics } from "./dataAccess.js"
import { siteHtml } from "./penpal.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchUsers()
        .then(
            () => {
                return fetchTopics()
            }
        )
        .then(
            () => {
                return fetchLetters()
            }
        )
        .then(
            () => {
                return fetchLettersTopics()
            }
        )
        .then(
            () => {
                mainContainer.innerHTML = siteHtml()
            }
        )

}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    })