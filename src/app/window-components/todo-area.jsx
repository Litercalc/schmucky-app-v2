import { useTabStore } from "../reusable-components/tabs.jsx"

export default function ToDoArea() {

    const getCurrentTab = useTabStore(state => Object.entries(state.todoTabs).find( ([key, value]) => value === true)[0] )


    return (
        <div className="border-2 border-white w-55 h-41 flex items-center justify-center">
            
            <p className=" font-jersey text-white ">
                {`${getCurrentTab}: currently empty`}
            </p>

        </div>
    )
}