import './App.css'
import CurrentWeather from './components/CurrentWeather'
import Sidebar from './components/Sidebar'
import { useGlobalContext } from './context/context'

function App() {

  const { backgroundImage } = useGlobalContext()

  return (
    <div style={{ background: `url(${backgroundImage}) no-repeat`, height: "100vh" }}>
      <div className="container">
        <div className='main'>
          <CurrentWeather />
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

export default App
