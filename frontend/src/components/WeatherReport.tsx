interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    wind_speed: number;
    humidity: number;
  };
}

const ReportCard = ({ weatherData }: { weatherData: WeatherData | null }) => {
  return (
    <div className="mt-5 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 p-6 sm:p-10 rounded-2xl w-full text-white">
      {weatherData ? (
        <div className="text-2xl font-semibold flex justify-between">
          <div>
          <h2>{weatherData.location.name},{weatherData.location.region},<br/> {weatherData.location.country}</h2>
          <p>{weatherData.location.localtime}</p>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>Condition: {weatherData.current.weather_descriptions[0]}</p>
          <p>Wind: {weatherData.current.wind_speed} km/hr</p>
          <p>Humidity: {weatherData.current.humidity}</p>

          </div>
          <div>
            <img className="w-32" src={weatherData.current.weather_icons[0]} alt="Weather Icon" />
          </div>
          
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default ReportCard;
