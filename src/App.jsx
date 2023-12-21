import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './assets/components/header/Header'
import Home from './assets/components/home/Home'
import Footer from './assets/components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default App