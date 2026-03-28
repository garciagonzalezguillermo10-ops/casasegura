import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AnalyzeListing from './pages/AnalyzeListing'
import AnalyzeLease from './pages/AnalyzeLease'
import YourRights from './pages/YourRights'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/listing" element={<AnalyzeListing />} />
      <Route path="/lease" element={<AnalyzeLease />} />
      <Route path="/rights" element={<YourRights />} />
    </Routes>
  )
}
