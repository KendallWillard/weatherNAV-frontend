import React from 'react'

const DisplayWeatherInfo = props => {
    console.log(props)
    return(
        <div>
            <h2>Weather Temp: {props.futureWeather} degrees fahrenheit</h2>
            <h4>Weather Summary: {props.weatherSummary ? props.weatherSummary.summary : null}</h4> 
            <h1>ALERTS/WARNINGS: </h1>
            <ul>
                { props.alerts ? 
                    props.alerts.map( (alert, ndx) => {
                        return(
                            <li key={Date.now() + ndx}>{alert.title}</li>
                        ) 
                    }) 
                    : (<h5>No Alerts</h5>)
                }
            </ul>
        </div>
    )
}

export default DisplayWeatherInfo