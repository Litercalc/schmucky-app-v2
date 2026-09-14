import RegisterWindow from "./windows/register"
import LoginWindow from "./windows/login"
import ToDoListWindow from "./windows/todollist"
import SchmuckyWindow from "./windows/schmucky"

export default function App() {
  const allWindows = {
    register: RegisterWindow,
    login: LoginWindow,
    todolist: ToDoListWindow
  }
  const params = new URLSearchParams(window.location.search)
  const windowParam = params.get('window')

  console.log(params)

  console.log(windowParam)

  if (!windowParam) return <SchmuckyWindow/>

  const CurrentWindow = allWindows[windowParam]
  
  return <CurrentWindow/>
}