import React from 'react'
import apiConfig from '../../../apiKeys'
import DisplayWeatherInfo from './DisplayWeatherInfo'
import { MDBBtn } from 'mdbreact';

export default class WeatherApi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: [],
            weatherAtDestination: '',
            weatherSum: ''
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
        .then(this.parseWeatherInfo())
        .catch(error => console.error(error))
    }
    
    sendTextMessage = () => {
        console.log(this.state.weather.hourly.summary)
        let alertMessage;
        this.state.weather.alerts ? alertMessage = this.state.weather.alerts : alertMessage = "No Alerts/Warnings :)"
        const messageObj = {
          description: `
            Summary: ${this.state.weather.hourly.summary}
Destination Temp: ${this.state.weatherAtDestination} degrees Fahrenheit
WARNINGS: ${alertMessage}
          `,
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
        let tripTimeHourOnly = this.props.totalTripTime.split(' ')[0];
        let newWeather =  ( this.state.weather.hourly.data[tripTimeHourOnly].apparentTemperature )
        let weatherSummary = this.state.weather.hourly.summary
        this.setState({
            weatherAtDestination: newWeather,
            weatherSum: weatherSummary,
            hoursToDestination: tripTimeHourOnly

        })
    }

    render() {
        return(
            <div>
                <MDBBtn onClick={this.fetchWeather} color="amber">Calculate Weather</MDBBtn>
                <MDBBtn onClick={this.sendTextMessage} color="cyan">Text Myself Weather Info</MDBBtn>
                <DisplayWeatherInfo 
                    futureWeather={this.state.weatherAtDestination} 
                    alerts={this.state.weather.alerts}
                    weatherSummary={this.state.weather.hourly}
                />
            </div>
        )
    }
}