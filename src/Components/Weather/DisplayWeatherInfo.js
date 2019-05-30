import React from 'react'

const DisplayWeatherInfo = props => {
    return(
        <div>
            <h2>Weather Info: {props.futureWeather}</h2>
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