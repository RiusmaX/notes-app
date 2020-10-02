import jwt_decode from "jwt-decode"

const URL = "https://api.myidea.fr/v1/"

const globalParams = {
    cache: 'default',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
}

/*
* Une promesse a 3 statuts : Pending, Resolved (Fullfilled) et Rejected
*/

export function getProfile () {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwt_decode(token)
    
            console.log(decoded)

            // test de l'expiration du token 
            if (decoded.exp >= new Date().getMilliseconds()) {
                console.log('TOKEN VALIDE')
            } else {
                console.log('TOKEN INVALIDE')
            }

            const userId = decoded.sub
    
            var params = {
                ...globalParams, // Annotation d'inclusion
                method: 'GET',
                headers: {
                    ...globalParams.headers,
                    'Authorization': 'Bearer ' + token
                }
            }

            console.log(params)
    
            fetch(URL + 'users/' + userId, params)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                resolve(result)
            })
        } else {
            console.error('NO TOKEN')
        }

    })
}

export function login (credentials) {
    return new Promise((resolve, reject) => {
        if (credentials.email && credentials.password) {
            var body = {
                email: credentials.email,
                password: credentials.password
            }

            var params = {
                ...globalParams, // Annotation d'inclusion
                method: 'POST',
                body: JSON.stringify(body)
            }

            fetch(URL + 'auth/login', params)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response && 
                    response.tokens && 
                    response.tokens.access && 
                    response.tokens.access.token) {
                        console.log(response.tokens.access.token)
                        localStorage.setItem('token', response.tokens.access.token)
                        resolve(response)
                    }
            })

        } else {
            reject('Informations manquantes')
        }
    })
}

export function register (user) {
    return new Promise((resolve, reject) => {
        if (user.username && user.email && user.password) {
            var body = {
                name: user.username,
                password: user.password,
                email: user.email
            }
    
            var params = {
                ...globalParams, // Annotation d'inclusion
                method: 'POST',
                body: JSON.stringify(body)
              }
    
            fetch(URL + 'auth/register', params)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                resolve(response)
            })
            .catch(error => reject(error))
        } else {
            reject('Informations manquantes')
        }
    })
}

export function getNotes () {
    return new Promise((resolve, reject) => {
        window.fetch(URL + 'notes')
        .then(response => response.json())
        .then(result => {
            console.log('Réponse API getNotes', result)
            resolve(result)
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

export function createNote (note) {
    return new Promise((resolve, reject) => {
        if (note.title && note.description) {
            var body = {
                title: note.title,
                description: note.description
            }
    
            var params = {
                ...globalParams, // Annotation d'inclusion
                method: 'POST',
                body: JSON.stringify(body)
              }
    
            fetch(URL + 'notes', params)
            .then(response => {
                console.log(response)
                resolve()
            })
            .catch(error => reject(error))
            
        } else {
            reject('Informations manquantes')
        }
    })
}

export function deleteNote (noteId) {
    return new Promise((resolve, reject) => {
        if (noteId) {
            var params = {
                ...globalParams,
                method: 'DELETE',
            }
    
            fetch(URL + 'notes/' + noteId, params)
            .then(response => {
                console.log(response)
                resolve()
            })
            .catch(error => reject(error))
            
        } else {
            reject('ID manquant')
        }
    })
}

export function updateNote (note) {
    console.log(note)
    return new Promise((resolve, reject) => {
        if (note) {
            var noteId = note.id
            delete note.id
            delete note.isOpen

            var params = {
                ...globalParams,
                method: 'PATCH',
                body: JSON.stringify(note)
            }
    
            fetch(URL + 'notes/' + noteId, params)
            .then(response => {
                console.log(response)
                resolve()
            })
            .catch(error => reject(error))
            
        } else {
            reject('Note manquante')
        }
    })
}
