const API = "http://localhost:8088"


const mainContainer = document.querySelector("#container")
const applicationState = {
    users: [],
    topics: [],
    letters: [],
    letterstopics: [],
    chosentopics: new Set()
}



export const setTopics = (id) => {
    applicationState.chosentopics.has(id)
        ? applicationState.chosentopics.delete(id)
        : applicationState.chosentopics.add(id)
    console.log(applicationState.chosentopics)

}

const createlettertopics = (newletterobj) => {
    const fetchArray = []

    applicationState.chosentopics.forEach(
        (chosenTopicId) => {
            fetchArray.push(
                fetch(`${API}/lettertopics`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        topicId: chosenTopicId,
                        letterId: newletterobj.id
                    })
                })
                    .then(response => response.json())
            )
        }
    )

    // This is where all the fetches (Promises) all run and resolve
    Promise.all(fetchArray)
        .then(
            () => {
                applicationState.chosentopics.clear()
            }
        )
}

export const fetchUsers = () => {
    return fetch(`${API}/users`)
    .then(response => response.json())
    .then(
        (request) => {
            applicationState.users = request
        }
    )
}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
    .then(response => response.json())
    .then(
        (request) => {
            applicationState.topics = request
        }
    )
}


export const fetchLetters = () => {
    return fetch(`${API}/letters`)
    .then(response => response.json())
    .then(
        (request) => {
            applicationState.letters = request
        }
    )
}

export const fetchLettersTopics = () => {
    return fetch(`${API}/lettertopics`)
    .then(response => response.json())
    .then(
        (request) => {
            applicationState.letterstopics = request
        }
    )
}

export const sendLetter = (letterA) => {
    return fetch(`${API}/letters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(letterA)
    })
    .then (response => response.json())
    .then(
        (newletterobj) => {
            createlettertopics(newletterobj)
        }
    )
    .then( 
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )

}


export const getUsers = () => {
    return applicationState.users.map((author) => ({...author}))
}

export const getTopics = () => {
    return applicationState.topics.map((topic) => ({...topic}))
}

export const getLetters = () => {
    return applicationState.letters.map((letter) => ({...letter}))
}

export const getLettersTopics = () => {
    return applicationState.letterstopics.map((letter) => ({...letter}))
}
