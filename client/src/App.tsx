import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { EventContextProvider } from './contexts/EventContext'
import { FormPage } from './pages/FormPage'
import { SuccessPage } from './pages/SuccessPage'

function App() {
  return (
    <Router>
      <EventContextProvider>
        <Routes>
          <Route path="/form" element={<FormPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/" element={<Navigate to="/form" replace />} />
        </Routes>
      </EventContextProvider>
    </Router>
  )
}

export default App
