import Header from "../reusable-components/header.jsx"
import SubmitButton from "../reusable-components/submit-button.jsx"
import Loading from "../../assets/loading.gif"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { useQuery, useMutation } from "@tanstack/react-query"
import { useEffect } from "react"


export default function Note(){
    const noteQuery = useQuery({
        queryKey: ['note'],
        queryFn: () => window.electron.getNote()
    })

    const editor = useEditor({
    content: '<p>Sample text</p>',
    extensions: [StarterKit],
    autofocus: 'start'
})

    useEffect(() => {
        if (!editor || noteQuery.data === undefined) return
        editor.commands.setContent(noteQuery.data.noteJSON)
    }, [editor, noteQuery.data])

    const noteMutation = useMutation({
        mutationFn: ({noteJSON}) => window.electron.saveNote(noteJSON),

        onSuccess: () => window.electron.sendMessageToMain("Saved Note!"),
        
        onError: (error) => window.electron.sendMessageToMain(catchError(error))
    })

    function noteMain(e) {
        e.preventDefault()

        noteMutation.mutate({noteJSON: editor.getJSON()})
         console.log("hi")
        e.currentTarget.reset()


    }

    if (noteMutation.isPending) window.electron.setAnimationToMain('WRITE')

    return (
        <form onSubmit={noteMain} className=" origin-bottom-right animate-expand [-webkit-app-region:drag] w-60 h-80 flex flex-col items-center bg-linear-to-br from-[#294d4d]/90 via-[#2e6161] to-[#294d4d]/90 overflow-hidden border-4 border-gray-900 rounded-xl">
            
            <Header title="Note"/>

            <div className={`border-2 ${noteQuery.isPending && 'flex items-center justify-center'} [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent overflow-y-scroll -mt-2 border-black w-55 h-47  bg-white font-jersey leading-none [-webkit-app-region:no-drag] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:px-1`}>
                {noteQuery.isPending ? <img src={Loading} alt="" /> :<EditorContent name="editor" editor={editor}/>}
 
            </div>

            <hr className="border-white bg-white border w-40 mt-1"/>

            <div className="flex gap-2 mt-1 items-center justify-center">
                {noteMutation.isPending ? <img src={Loading} alt="" /> : <SubmitButton label="Save" />}
            </div>
    
        </form>
    )
}