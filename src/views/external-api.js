import React, { useState } from "react";
import MapContainer from "../components/Maps";
import "./maps.css";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import SearchBar from "../components/search-bar";

export const ExternalApi = () => {
  const [message, setMessage] = useState("");
  var requestOptions = {
    method: 'GET',
  };
  
  fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=e1690d731c6a4a7e8bc071f67a045952", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result.location))
    .catch(error => console.log('error', error));

  // Setting up weather API
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'e86c1061c4607ab4ccedac8030a718d2',
    lat: '30.6045',
    lon: '-96.3123',
    lang: 'en',
    unit: 'imperial',
  });
  return (
    <><ReactWeather
    isLoading={isLoading}
    errorMessage={errorMessage}
    data={data}
    lang="en"
    locationLabel="College Station"
    unitsLabels={{ temperature: 'F', windSpeed: 'm/h' }}
    showForecast />
    <div><pre>  </pre><SearchBar/></div>
    <pre>  </pre>
    </>
  );
};

export default ExternalApi;