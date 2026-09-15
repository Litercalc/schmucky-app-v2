import RegisterWindow from "./windows/register.jsx"
import LoginWindow from "./windows/login.jsx"
import ToDoListWindow from "./windows/todolist.jsx"
import SchmuckyWindow from "./windows/schmucky.jsx"
import SchmuckyAIWindow from "./windows/ai.jsx"
import ChatWindow from "./windows/chat.jsx"

export default function App() {
  const allWindows = {
    register: RegisterWindow,
    login: LoginWindow,
    todolist: ToDoListWindow,
    ai: SchmuckyAIWindow,
    chat: ChatWindow
  }
  const params = new URLSearchParams(window.location.search)
  const windowParam = params.get('window')

  console.log(params)

  console.log(windowParam)

  if (!windowParam) return <SchmuckyWindow/>

  const CurrentWindow = allWindows[windowParam]
  
  return <CurrentWindow/>
}