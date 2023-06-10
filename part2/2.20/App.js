import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [newMatch, setNewMatches] = useState([])
  const [weatherData, setNewWeatherData] = useState(null)


  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    const getAllFiltered = () => {
      const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  
      return request.then(response => response.data.filter(function(country){
        return country.name.common.toLowerCase().includes(newFilter.toLowerCase())})
      )
    }
    getAllFiltered()
    .then(response => {
      console.log(response.length)
      if (response.length > 10){
        console.log("Too big")
        setNewMatches("Too many matches, specify another filter")
      } else {
        console.log("Under or equal to 10")
        setNewMatches(response)
      }
      console.log(response)
      })
  }, [newFilter])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleClick = (country) => () => {
    console.log("Button is pressed")
    console.log(country)
    setNewMatches([country])
  }

  useEffect(() => {
    console.log('effect 2 run')

    if (newMatch && newMatch.length === 1) {
      console.log('fetching weather...')
      const lat = newMatch.map(country => country.capitalInfo.latlng[0])
      const lng = newMatch.map(country => country.capitalInfo.latlng[1])
      console.log(lat, lng)
     axios
     .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        setNewWeatherData(response.data)})
    }
  }, [newMatch])

  return (
    <div>
      <Filtering newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Results weatherData={weatherData} api_key={api_key} handleClick={handleClick} matches={newMatch}/>
    </div>
  )
}


const Results = (props) => {
  if (typeof props.matches === 'string'){
    console.log("It's a string")
    console.log(props.matches)
    return (
      <div>
        {props.matches}
      </div>
      )
  } else if (props.matches.length === 1) {
    console.log("Showing info for " + props.matches.map(country => country.name.common))
    console.log(props.weatherData)
    return (
      <CountryInfo weatherData={props.weatherData} matches={props.matches}/>
    )
  } else {
    return (
      props.matches.map(country =>
    <div key={country.altSpellings[0]}>
      {country.name.common}
      <button onClick={props.handleClick(country)} type="submit" value={country}>show</button>
    </div>)
  )}
}



const CountryInfo = (props) => {
  console.log(props)
  if(props.weatherData === null){
    return
  }
  return (
    props.matches.map(country =>
  <div key={country.altSpellings[0]}>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h4>languages:</h4>
    <Languages languages={country.languages}/>
    <img src={country.flags.png} alt={country.flags.alt}></img>
    <h3>Weather in {country.capital}</h3>
    <div>temperature {(props.weatherData.main.temp-273.15).toFixed(2)} Celcius</div>
    <img src={`https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`} alt={country.flags.alt}></img>
    <div>wind {props.weatherData.wind.speed} m/s</div>
  </div>)
  )
}


const Languages = (props) => {
  console.log(Object.values(props.languages))
  return(
    <ul>
    {Object.values(props.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
  )
}


const Filtering = (props) => {
  return (
  <div>
    find coutries
    <input value={props.newFilter} onChange={props.handleFilterChange} />
  </div>
  )
}


export default App
