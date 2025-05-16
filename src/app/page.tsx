'use client';
import { useState, useEffect } from 'react';

// const weatherData: { [city: string]: string } = {
//   London: 'Temperature: 15°C, Cloudy',
//   Paris: 'Temperature: 18°C, Sunny',
//   Tokyo: 'Temperature: 20°C, Rainy',
//   Delhi: 'Temperature: 35°C, Sunny',
//   NewYork: 'Temperature: 22°C, Windy',
// };

export default function Home() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  async function getWeather() {
    if (!location.trim()) {
      setWeather('Please enter a city name.');
      return;
    }
    const apiKey = '378af5f584194504efe4d557ecf18a36';
    const city = location.trim();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        setWeather('City not found.');
        return;
      }
      const data = await response.json();
      setWeather(`Temperature: ${data.main.temp}°C, ${data.weather[0].description}`);
    } catch (error) {
      setWeather('Error fetching weather.');
      console.log(error);
    }
  }



  useEffect(() => {
    if (weather !== null) {
      setIsDark(prev => !prev);
    }
  }, [weather]);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "black" : "white";
    document.body.style.color = isDark ? "white" : "black";

    return () => {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [isDark])



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >



      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px',
          marginBottom: '8px',
          outline: 'none'
        }}
      />
      <br />
      <button onClick={getWeather}
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          background: isDark ? '#444' : '#007bff',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '12px'
        }}
      >
        Get Weather
      </button>
      <div>
        {weather && <p>{weather}</p>}
      </div>
    </div>
  );
}