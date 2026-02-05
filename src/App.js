import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Upload from './pages/upload/Upload'
import Security from './pages/security/Security'
import Dangerous from './pages/dangerous/Dangerous'
import Identify from './pages/identify/Identify'
import Report from './pages/report/Report'
import Dashboard from './pages/dashboard/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Navigate to="/upload" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/security" element={<Security />} />
        {/* <Route path="/dangerous" element={<Dangerous />} />
        <Route path="/identify" element={<Identify />} />
        <Route path="/report" element={<Report />} /> */}
      </Route>
    </Routes>
  )
}

export default App
