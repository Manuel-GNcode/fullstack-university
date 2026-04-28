const Country = ({ name, showCountry }) => {
  return (
    <li>{name} <button onClick={() => showCountry(name)}>Show</button></li>
  )
}

const CountriesList = ({ countries, showCountry }) => {
  return (
    <ul>
      {countries.map(mc => <Country key={mc.name.common} name={mc.name.common} showCountry={showCountry} />)}
    </ul>
  )
}

export default CountriesList