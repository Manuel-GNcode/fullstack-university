const Country = ({ country }) => {
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
    </div>
  )
}

export default Country