import Footer from './components/Footer'
import MainContent from './components/MainContent'
import Header from './components/Header'
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
