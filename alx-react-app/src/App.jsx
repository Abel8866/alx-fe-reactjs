import Footer from './Footer'
import MainContent from './MainContent'
import Header from './Header'
import WelcomeMessage from './components/WelcomeMessage'
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
      <WelcomeMessage />
    </>
  )
}

export default App
