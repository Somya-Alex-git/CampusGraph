import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navigation from './pages/Navigation'
import MSTOptimizer from './pages/MSTOptimizer'
import AlgorithmLab from './pages/AlgorithmLab'
import Analytics from './pages/Analytics'
import CampusExplorer from './pages/CampusExplorer'
import AboutAlgorithms from './pages/AboutAlgorithms'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/mst" element={<MSTOptimizer />} />
        <Route path="/lab" element={<AlgorithmLab />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/explorer" element={<CampusExplorer />} />
        <Route path="/about" element={<AboutAlgorithms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
