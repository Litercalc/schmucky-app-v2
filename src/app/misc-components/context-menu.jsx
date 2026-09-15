import { forwardRef } from "react"


export default forwardRef (function ContextMenu(props, ref) {


    return (
        <div ref={ref} className="w-10 h-10 bg-black fixed hidden">
            
        </div>
    )
})