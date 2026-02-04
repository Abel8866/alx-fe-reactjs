import Footer from './components/Footer'
import MainContent from './components/MainContent'
import Header from './components/Header'
import WelcomeMessage from './components/WelcomeMessage'
import UserProfile from './components/UserProfile'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
      <WelcomeMessage />
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography." />
    </>
  )
}

export default App
