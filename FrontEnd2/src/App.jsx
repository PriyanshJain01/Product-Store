import React from 'react'
import Navbar from './components/navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import './index.css'
import { useThemeStore } from './Store/useThemeStore.js'
import { Toaster } from 'react-hot-toast'
import CustomFooter from './components/CustomFooter.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

function App() {
  const { theme, setTheme } = useThemeStore() // Access the theme and setTheme from the store
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300 overflow-x-hidden" data-theme={theme}>

      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      <CustomFooter />

      <Toaster />

    </div>

  )
}

export default App
