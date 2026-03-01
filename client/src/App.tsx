import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { EventContextProvider } from './contexts/EventContext'
import { FormPage } from './pages/FormPage'
import { SuccessPage } from './pages/SuccessPage'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  return (
    <Router>
      <EventContextProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/form" element={<FormPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/" element={<Navigate to="/form" replace />} />
          </Routes>
        </ErrorBoundary>
      </EventContextProvider>
    </Router>
  )
}

export default App
