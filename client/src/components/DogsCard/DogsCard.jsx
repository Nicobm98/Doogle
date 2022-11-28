import React from 'react';
import s from'./dogscard.module.css'

export default function Card({ id, image, name, temperaments, weight }) {
  return (
    <div className={s.container}>
      <div className={s.divimg}>
      <img className={s.dogimage} src={image} alt="" />
      </div>
      <div className={s.data}>
        <h3 className={s.name}>{name}</h3>
        <p className={s.weight}>
          <strong>Weight: </strong>
          {weight} kg
        </p>
        <p className={s.temperaments}>
          <strong>Temperament/s: </strong>
          {temperaments}
        </p>
      </div>
    </div>
  )
}