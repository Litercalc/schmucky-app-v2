
export default function ErrorMessage({errorObject}) {
    console.log(errorObject)
    return (
         <p className="text-red-500 text-s font-jersey">{Object.values(errorObject.errors[0])[0]}</p>
    )
}