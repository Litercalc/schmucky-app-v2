import RegisterWindow from "./windows/register.jsx"
import LoginWindow from "./windows/login.jsx"
import ToDoListWindow from "./windows/todolist.jsx"
import SchmuckyWindow from "./windows/schmucky.jsx"
import NoteWindow from "./windows/note.jsx"
import ChatWindow from "./windows/chat.jsx"
import TimeWindow from "./windows/timer.jsx"

export default function App() {
  const allWindows = {
    register: RegisterWindow,
    login: LoginWindow,
    todolist: ToDoListWindow,
    note: NoteWindow,
    chat: ChatWindow,
    time: TimeWindow
  }
  const params = new URLSearchParams(window.location.search)
  const windowParam = params.get('window')

  if (!windowParam) return <SchmuckyWindow/>

  const CurrentWindow = allWindows[windowParam]
  
  return <CurrentWindow/>
}