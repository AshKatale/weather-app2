import { Button, TextField } from "@mui/material";
import ReportCard from "../components/WeatherReport";
import { useState, useEffect } from "react";
import axios from "axios";
import History from "../components/History";
import Profile from "../components/Profile";
import { jwtDecode } from "jwt-decode";
 

export default function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [username, setUsername] = useState();
  

  const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token); // Decode the token
      setUsername(decoded.username); 
      console.log(decoded.username); // Log the decoded username
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  useEffect(() => {
    decodeToken(); // Call decodeToken when the component mounts
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/weather", {
        params: { city: location },
      });
      setWeatherData(response.data);
      console.log(response.data);

      // Ensure username is defined before making the POST request
      if (username) {
        await axios.post("http://localhost:8080/store-search", {
          city: location,
          weatherData: response.data,
          username: username, // Include username in the request
          timestamp: new Date().toISOString().replace("T", " ").replace("Z", ""), // Format timestamp
        });
      } else {
        console.error("Username is not defined. Cannot store search data.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="p-5 m-5 flex justify-evenly">
      <div>
        <div className="flex justify-center m-5">
          <h1 className="text-3xl font-semibold">
            Search Weather of any Location
          </h1>
        </div>
        <div className="mb-10 mx-3 gap-5">
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            className="border-8"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <div className="my-5">
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        <ReportCard weatherData={weatherData} />
      </div>
      <div>
        <History />
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
}
