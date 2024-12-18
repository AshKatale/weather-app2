import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temperature: number;
    feelslike: number;
    humidity: number;
    wind_speed: number;
    wind_dir: string;
    pressure: number;
    visibility: number;
    weather_descriptions: string[];
    observation_time: string;
  };
}

interface SearchRecord {
  id: number;
  city: string;
  weather: WeatherData;
  timestamp: string;
}

export default function History() {
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [username, setUsername] = useState();
  const [selectedSearch, setSelectedSearch] = useState<WeatherData | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const decodeToken = ()=>{
    const token = localStorage.getItem('token');
    if(!token) return;

    try {
      const decoded: any = jwtDecode(token);
      setUsername(decoded.username); 
      console.log(username)
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  useEffect(() => {
    const fetchSearches = async () => {
      if (!username) return; 
      try {
        const response = await axios.get(`http://localhost:8080/searches?username=${username}`);
        setSearches(response.data);
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

    decodeToken(); 
    fetchSearches();
  }, [username]);

  const handleSearchClick = (weatherData: WeatherData) => {
    setSelectedSearch(weatherData); 
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedSearch(null);
  };

  return (
    <div className="bg-gradient-to-r from-sky-400 to-cyan-300 rounded-2xl h-full w-[300px] p-5">
      <h1 className="text-3xl text-center">History</h1>
      <ul className="mt-4">
        {searches.length > 0 ? (
          searches.map((search) => (
            <li key={search.id} className="p-2 border-b border-gray-200 cursor-pointer" onClick={() => handleSearchClick(search.weather)}>
              <div className="font-bold">{search.city}</div>
              <div className="text-sm text-gray-600">{new Date(search.timestamp).toLocaleString()}</div>
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-600">No search history available.</li>
        )}
      </ul>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl font-bold">Details</h2>
            <p>City: {selectedSearch?.location.name}</p>
            <p>Country: {selectedSearch?.location.country}</p>
            <p>Temperature: {selectedSearch?.current.temperature}°C</p>
            <p>Feels Like: {selectedSearch?.current.feelslike}°C</p>
            <p>Humidity: {selectedSearch?.current.humidity}%</p>
            <p>Wind Speed: {selectedSearch?.current.wind_speed} km/h</p>
            <p>Wind Direction: {selectedSearch?.current.wind_dir}</p>
            <p>Pressure: {selectedSearch?.current.pressure} hPa</p>
            <p>Visibility: {selectedSearch?.current.visibility} km</p>
            <p>Weather Description: {selectedSearch?.current.weather_descriptions.join(', ')}</p>
            <p>Observation Time: {selectedSearch?.current.observation_time}</p>
            
            <button onClick={closePopup} className="mt-4 bg-blue-500 text-white p-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
