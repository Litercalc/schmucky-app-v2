import useCreateMessage, {useMessageStore} from "../custom-hooks/useCreateMessage";

export default function MessageBubble() {

    const message = useMessageStore(state => state.message)
    console.log(message)
    
    useCreateMessage()

    return (
        (message && <div className="absolute mr-25 mt-62 font-jersey text-m right-0 top-0">
            <div className="z-1relative w-auto max-w-38 max-h-15 h-auto leading-none px-2 bg-white border-3 border-black py-1 wrap-break-word">
                {message}
                
                {/* border-colored triangle, slightly bigger, sits behind */}
                <div className="absolute -right-[18px] top-0 w-0 h-0 z-2
                                border-y-[8px] border-y-transparent 
                                border-l-[20px] border-l-b
                                -rotate-10"/>
                
                {/* white triangle, slightly smaller, sits on top to hide the border's inner edge */}
                <div className="absolute -right-[13.25px] top-[3px] w-0 h-0 z-3
                                border-y-[6px] border-y-transparent 
                                border-l-[17px] border-l-white
                                -rotate-10"/>
            </div>
        </div>)
    )
}