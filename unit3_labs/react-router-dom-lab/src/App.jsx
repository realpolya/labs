import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

// components
import NavBar from './components/NavBar.jsx';
import Form from './components/Form.jsx';
import List from './components/List.jsx';
import Item from './components/Item.jsx';

// css
import './App.css'


function App() {
  const [mailboxes, setMailboxes] = useState([])

  return (
    <>
      <h1>React Router DOM Lab</h1>
      < NavBar />
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />

        <Route path='/list' element={< List />} />

        <Route path='/new' element={< Form />} />

      </Routes>
    </>
  )
}

export default App
