import React, { useState } from "react";

const App: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
      );
      if (!response.ok) {
        throw new Error("Joy nomi noto'g'ri yoki ma'lumot topilmadi!");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setWeather(null);
      setError(err.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Iltimos, joy nomini kiriting!");
      return;
    }
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Ob-Havo Ma'lumotlari
        </h1>
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Joy nomini kiriting..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
          >
            Qidirish
          </button>
        </form>
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        {weather && (
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-600">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-4xl font-bold text-gray-800">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-gray-600">{weather.weather[0].description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-sm text-gray-500">Namlik</p>
                <p className="font-bold">{weather.main.humidity}%</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-sm text-gray-500">Shamol tezligi</p>
                <p className="font-bold">{weather.wind.speed} m/s</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-sm text-gray-500">Maksimal Temp</p>
                <p className="font-bold">{Math.round(weather.main.temp_max)}°C</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-sm text-gray-500">Minimal Temp</p>
                <p className="font-bold">{Math.round(weather.main.temp_min)}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
