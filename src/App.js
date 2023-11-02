import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// http://api.weatherapi.com/v1/forecast.json?key=2bd35b79c8ba469a8dc44714230111&q=yangon


function App() {

  const apiKey = "226fe0a0126c4802ad475200230111"
  const [city, setCity] = useState("")
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [isNotFound, setIsNotFound] = useState(false)

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }
  const handleOnClick = () => {
    setCity(input)
  }

  useEffect(() => {
    if (city) {
      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`)
        .then(response => {
          console.log(response.data)
          setResult(response.data)
          setIsNotFound(false)
        }).catch(error => {
          // console.error("Error fetching weather data:", error);
          // console.log(error.response.status)
          if (error.response.status === 400) {
            setIsNotFound(true)
          }
        })
    }
  }, [city]);

  return (
    <div class="">
      <div class="header h1 p-5 strong text-center text-info">Weather check</div>

      <div class="container d-flex justify-content-center align-items-center mt-5">
        <div class="result-box text-center p-5 bg-dark text-white">
          <div class="p-5 text-center h5">
            <input id="input" class="p-3" placeholder='Type Region...' value={input} onChange={handleInputChange}></input>
            <button type="button" class="button btn text-info p-3 ms-2" onClick={handleOnClick}>Search</button>
          </div>
          {
            !isNotFound ? (
              result && (
                <div>
                  <h2>Weather in {result.location.name}</h2>
                  <p>Temperature: {result.current.temp_c}°C</p>
                  <p>Temperature: {result.current.temp_f}°F</p>
                  <p>Condition: {result.current.condition.text} <img src={result.current.condition.icon} alt='icon' width="30px"></img> </p>
                </div>
              )
            ) : (
              <p>City not found</p>
            )
          }
        </div>
      </div>
    </div>
  );

}

export default App;

// const handleInputChange = (event) => {
//   setInputTitle(event.target.value)
// }
