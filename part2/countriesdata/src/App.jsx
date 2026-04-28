import { useState, useEffect } from "react"
import axios from 'axios'
import Country from "./components/Country"
import CountriesList from "./components/CountriesList"

const App = () => {
  const [countries, setCountries] = useState([])
  const [matchCountries, setMatchCountries] = useState([])
  const [filter, setFilter] = useState('')

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilter = e => {
    const newFilter = e.target.value
    setFilter(newFilter)

    setMatchCountries(countries.filter(c => c.name.common.includes(capitalizeWords(newFilter))))
  }

  const showCountry = countryName => {
    setFilter(countryName)
    setMatchCountries(countries.filter(c => c.name.common.includes(capitalizeWords(countryName))))
  }

  return (
    <div>
      <label>
        Find countries: <input value={filter} onChange={handleFilter} type="text" placeholder="colombia" />
      </label>
      {
        filter.length === 0
          ? <p>Write to find countries</p>
          : matchCountries.length > 10
            ? <p>Too many matches, specify another filter</p>
            : matchCountries.length > 1
              ? <CountriesList countries={matchCountries} showCountry={showCountry} />
              : matchCountries.length === 1
                ? <Country country={matchCountries[0]} />
                : <p>No countries for that filter</p>
      }
    </div>
  )
}

export default App