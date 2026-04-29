import { useEffect, useState } from "react"
import axios from "axios"



const Country = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_KEY
  const latLong = country.capitalInfo.latlng


  const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0]}&lon=${latLong[1]}&appid=${apiKey}&units=metric`

  useEffect(() => {
    axios
      .get(urlApi)
      .then(response => {
        setCapitalWeather(response.data)
      })
  }, [urlApi])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([clave, valor]) => <li key={clave}>{valor}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />

      {
        capitalWeather !== null
          ? <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature {capitalWeather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/payload/api/media/file/${capitalWeather.weather[0].icon}.png`} alt="" />
            <p>Wind {capitalWeather.wind.speed} m/s</p>
          </div>
          : null
      }
    </div>
  )
}

export default Country