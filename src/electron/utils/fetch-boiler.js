export async function fetchFunc(endpoint, method,token, data) {
    const response = await fetch(`${process.env.URL}/${endpoint}`, {
        method: method,
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return response
}

export async function responseHandler(response) {
    if (!response.ok) {
            const errorBody = await response.json()
            console.log(JSON.stringify({ status: errorBody.statusCode, errors: errorBody.errors }))
            throw new Error(JSON.stringify({ status: errorBody.statusCode, errors: errorBody.errors }))
        }
}