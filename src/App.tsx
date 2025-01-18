import { BrowserRouter,Routes, Route } from "react-router-dom"
import MainPage from "@/pages/index/index"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MainPage />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
