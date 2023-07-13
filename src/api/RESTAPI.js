

const get = (api) => {
    return fetch(api)
}

const remove = (api, id) => {
    return fetch(`${api}/${id}`,{
        method: 'DELETE',
    })
}

const add = (api, data) => {
    return fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const update = (api, data) => {
    console.log(`${api}/${data.id}`)
    return fetch(`${api}/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export { get, remove, add, update }