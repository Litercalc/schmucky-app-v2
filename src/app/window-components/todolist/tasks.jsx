import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Task({taskName, status, id}) {

    const queryClient = useQueryClient()
    
    const todolistStateMutation = useMutation({
        mutationFn:({id, newStatus}) => window.electron.changeTaskStatus(id, newStatus),

        onMutate: async (newTask) => {
            await queryClient.cancelQueries({queryKey: ['todos']})

            queryClient.setQueryData(["todos"], oldTasks => {
                console.log(oldTasks)
                const updatedTasks = oldTasks[0].data.map(e => e.id === newTask.id ? {...e, status: newTask.newStatus} : e)

                return [{...oldTasks[0], data: updatedTasks}]
            })

            window.electron.sendMessageToMain(`Moved task to ${newTask.newStatus}`)
        },

        onSettled: () => { queryClient.invalidateQueries({queryKey: ['todos']})},

        onError: (error) => window.electron.sendMessageToMain(catchError(error))
    })

    const todolistDeleteMutation = useMutation({
        mutationFn:({id}) => window.electron.deleteTask(id),

        onMutate: async (newTask) => {
            await queryClient.cancelQueries({queryKey: ['todos']})

            queryClient.setQueryData(["todos"], oldTasks => {
                console.log(oldTasks)
                const updatedTasks = oldTasks[0].data.filter(e => e.id !== newTask.id)

                return [{...oldTasks[0], data: updatedTasks}]
            })

            window.electron.sendMessageToMain(`Deleted task!`)
        },

        onSettled: () => {queryClient.invalidateQueries({queryKey: ['todos']})},

        onError: (error) => window.electron.sendMessageToMain(catchError(error))
    })

    const leftArrowNewStatus = status === "DOING" ? "TODO" : "DOING"
    const rightArrowNewStatus = status === "DOING" ? "COMPLETED" : "DOING"

    return (
        <div className="w-full pl-1 h-10 flex justify-between font-jersey leading-none bg-[#e0d26f] border-[#944242] text-[#944242] border-2">
            <div className="w-45">
                <p>{taskName}</p>
            </div>
            <div className="w-6 flex flex-col items-center text-xs ">
                <button type="button" onClick={() => todolistDeleteMutation.mutate({id})} className="w-4 h-4 cursor-pointer text-red-600">x</button>
                <div className="flex">
                    {status !=="TODO" && <button type="button" onClick={() => todolistStateMutation.mutate({id, newStatus: leftArrowNewStatus})} className=" mt-1 w-3 h-3 cursor-pointer text-white">◄</button>}
                    {status !=="COMPLETED" && <button type="button" onClick={() => todolistStateMutation.mutate({id, newStatus: rightArrowNewStatus})} className=" mt-1 w-3 h-3 cursor-pointer text-white">►</button>}
                </div>
            </div>
        </div>
    )
}