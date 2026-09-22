export default function catchError(err) {
    const cleaned = err.message.replace(/^Error invoking remote method '.*?': Error: /, '')
    try {
        const { status, errors } = JSON.parse(cleaned)

        return Object.values(errors[0])[0]
    } catch {
        return cleaned 
    }


}