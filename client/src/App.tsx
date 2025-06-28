import { Route, Routes } from "react-router-dom"
import { Home } from "@/pages/Home"
import NavBar from "./components/NavBar"
import StarBackground from "./components/StarBackground"
import MarsRoverPage from "./pages/MarsRoverPage"
import NearEarthObjectPage from "./pages/NearEarthObjectPage"


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <StarBackground />
      <NavBar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/MRP" element={<MarsRoverPage />} />
        <Route path="/NeoWs" element={<NearEarthObjectPage /> } />
        <Route path="*"/>
      </Routes>
    </div>
  )
}

export default App
