import { Route, Routes } from "react-router-dom"
import { Home } from "@/pages/Home"
import NavBar from "./components/NavBar"
import StarBackground from "./components/StarBackground"
import { ThemeProvider } from "./contexts/ThemeContext"
import MarsRoverPage from "./pages/MarsRoverPage"


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <StarBackground />
      <NavBar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/MRP" element={<MarsRoverPage />} />
        <Route path="*"/>
      </Routes>
    </div>
  )
}

export default App
