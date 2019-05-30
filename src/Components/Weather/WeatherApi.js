import React from 'react'
import apiConfig from '../../../apiKeys'
import DisplayWeatherInfo from './DisplayWeatherInfo'


export default class WeatherApi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: [],
            weatherAtDestination: ''
        }
    }

    fetchWeather = () => {
        fetch(`https://dark-sky.p.rapidapi.com/${this.props.destLat},${this.props.destLon}`, {
            headers: {
                "X-RapidAPI-Key": apiConfig.darkSky
            }
        })
        .then(response => response.json())
        .then(weather => this.setState({weather}))
        .catch(error => console.error(error))
    }
    
    sendTextMessage = () => {
        const messageObj = {
          description: `The weather at your destination will be ${this.state.weatherAtDestination} degrees Fahrenheit`,
          phone: this.props.phone
        }
        fetch(`http://localhost:3001/messages`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(messageObj)
        })
        .catch(error => console.error(error))
      }

    parseWeatherInfo = () => {
        let tripTimeHourOnly = this.props.totalTripTime.split(' ')[0]
        this.setState({
            hoursToDestination: tripTimeHourOnly
        })
        let newWeather =  ( this.state.weather.hourly.data[tripTimeHourOnly].apparentTemperature )
        this.setState({
            weatherAtDestination: newWeather
        })
    
    }



    calculateWeatherAtDestination = () => {
        this.parseWeatherInfo()
    }


    render() {
        return(
            <div>
                My Weather API <br/>
                <button onClick={this.fetchWeather}>Fetch Weather</button> <br/>
                <button onClick={this.calculateWeatherAtDestination}>Calculate Weather</button>
                <button onClick={this.sendTextMessage}>Send Weather Text</button>
                <DisplayWeatherInfo futureWeather={this.state.weatherAtDestination} alerts={this.state.weather.alerts}/>
            </div>
        )
    }
}