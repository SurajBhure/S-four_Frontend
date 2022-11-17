import { Route, Routes } from 'react-router-dom'
import './App.css'
import Blanklayout from './layout/blanklayout/Blanklayout'
import Fulllayout from './layout/fulllayout/Fulllayout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Blanklayout />} />
        <Route path="secured/*" element={<Fulllayout />} />
      </Routes>
    </div>
  )
}

export default App

//app heading removed keleli ahe
