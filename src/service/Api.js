const URL = "https://api.myidea.fr/v1/"

const globalParams = {
    cache: 'default',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
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
