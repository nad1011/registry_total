import React from 'react'

function CarBox({car}) {
  return (
    <div>
        <h2>{car.name}</h2>
        <img src={car.img} alt={car.title}/>
        <p>{car.status}</p>
        <div>
            <h4>Renew: </h4>
            <p>{car.status}</p>
        </div>
    </div>
  )
}

export default CarBox