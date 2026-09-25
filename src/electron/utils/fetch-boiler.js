export async function fetchFunc(endpoint, method,token, data) {

    const isGet = method ==="GET"

    const response = await fetch(`${process.env.URL}/${endpoint}`, {
        method: method,
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        ...((!isGet && data !== null) && {body: JSON.stringify(data)})
    })

    return response
}

export async function responseHandler(response) {
    if (!response.ok) {
            const errorBody = await response.json()
            console.log(errorBody)
            // console.log(JSON.stringify({ status: errorBody.statusCode, errors: errorBody.errors }))
            throw new Error(JSON.stringify({ status: errorBody.statusCode, errors: errorBody.errors }))
        }
}