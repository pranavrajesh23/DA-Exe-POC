import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout/Layout'
import { Home } from './pages/Home'
import { FilterProvider } from './context/FilterContext/FilterContext'
import './App.css'

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  )
}

export default App