import { useState, useEffect } from 'react'
import './App.css'
import 'daisyui/dist/full.css'
import backgroundImage from '../public/images/fon.jpeg'

interface WeatherData {
  name: string
  main: {
    temp: number
  }
  weather: Array<{
    description: string
  }>
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [city, setCity] = useState<string>('Tashkent')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0243b5f32e492f41aaa7f8c7a3a0607&units=metric`)
        
        if (!response.ok) {
          throw new Error('Xatolik kelyapti shahar nomini kiriting!')
        }

        const data: WeatherData = await response.json()
        setWeather(data)
        setError(null)
      } catch (err) {
        setWeather(null)
        setError((err as Error).message)
      }
    }

    fetchWeather()
  }, [city])

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-blue-100 border-black" 
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Ob-havo malumotlar!</h1>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Shahar nomini kiriting" 
        className="input input-bordered w-80 mb-4 focus:outline-none focus:ring focus:ring-blue-500"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weather && (
        <div className="card bg-white shadow-lg rounded-lg p-6 w-80 text-center">
          <h2 className="text-3xl font-semibold">{weather.name}</h2>
          <p className="text-xl">Harorat: {weather.main.temp} °C</p>
          <p className="text-lg">Havo: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default App
