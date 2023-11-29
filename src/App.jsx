import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './assets/components/header/Header'
import Home from './assets/components/home/Home'

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App