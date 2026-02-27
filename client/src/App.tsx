import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { STYLES } from './styles/global'
import { FormPage } from './pages/FormPage'

function App() {
  return (
    <>
      <style>{STYLES}</style>
      <Router>
        <Routes>
          <Route path="/form" element={<FormPage />} />
          <Route path="/" element={<Navigate to="/form" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
