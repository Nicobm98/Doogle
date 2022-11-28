import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAllTemperaments, createDogs } from "../../redux/actions/actionsIndex";
import NavBar from '../NavBar/NavBar';
import validateInputs from './validateInputs.js'
import { deleteRepeatedTemps } from '../Home/handleRepeatedTemperaments'
import s from './createdog.module.css';
import close from '../../images/closeh.png'

export default function CreateDog() {
  const dispatch = useDispatch()
  const history = useHistory()
  const dogs = useSelector((state) => state.dogs)
  const allTemperaments = useSelector((state) => state.temperaments)
  const [formError, setFormError] = useState({})
  const [creationForm, setCreationForm] = useState({
    name: "",
    image: "",
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temperaments: []
  })

  useEffect(() => {
    dispatch(getAllTemperaments())
  }, [dispatch])

  function handleChange(el) {
    el.preventDefault()

    setCreationForm({
      ...creationForm,
      [el.target.name]: el.target.value
    })

    //Validate
    setFormError(validateInputs({
      ...creationForm,
      [el.target.name]: el.target.value
    }))
  }

  function handleTemps(el) {
    if (creationForm.temperaments.includes(el.target.value)) {
      formError.select = "Remember you can't add the same temperament!";
      return formError
    }
    if (creationForm.temperaments.length < 6) {
      return setCreationForm({
        ...creationForm,
        temperaments: [...creationForm.temperaments, el.target.value]
      })
    }
  }

  function deleteTemp(temp) {
    setCreationForm({
      ...creationForm,
      temperaments: creationForm.temperaments.filter((temperament) => temperament !== temp)
    })
  }

  function handleSubmit(el) {
    el.preventDefault()

    // const takenName = dogs.find(dog => dog.name === creationForm.name)
    // if (takenName) {
    //   setCreationForm({ ...creationForm, name: "" })
    //   return alert(`Name "${creationForm.name}" is already taken, try with a different one.`)
    // }

    setFormError(creationForm)
    dispatch(createDogs(creationForm))
    alert("Your dog was successfully created")

    setCreationForm({
      name: "",
      image: "",
      minWeight: "",
      maxWeight: "",
      minHeight: "",
      maxHeight: "",
      minLifeSpan: "",
      maxLifeSpan: "",
      temperaments: []
    })
    setFormError({})

    history.push("/home")
  }

  return (
    <div className={s.container}>
      <NavBar />
      <div className={s.formtitle}>
        <h3 className={s.title}>¿Want to live the experiencie of creating your own dog?</h3>
        <p><strong>¡Just complete the form!</strong></p>
      </div>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.formcontent}>
          <div className={s.nameinput}>
            <label className={s.formlabel}>Name: </label>
            <input
              type='text'
              placeholder='Name you dog!'
              name='name'
              value={creationForm.name}
              required
              onChange={(el) => handleChange(el)}
            />
            <span> {formError.name}</span>
          </div>

          <div className={s.weights}>
            <div className={s.minweight}>
              <label className={s.formlabel}>Min Weight: </label>
              <input
                type='number'
                min="1"
                maxLength='3'
                placeholder='Insert dog´s minimum weight'
                name='minWeight'
                value={creationForm.minWeight}
                required
                onChange={(el) => handleChange(el)}
              />
              <span> {formError.minWeight}</span>
            </div>

            <div className={s.maxweight}>
              <label className={s.formlabel}>Max weight: </label>
              <input
                type='number'
                min="1"
                maxLength='3'
                placeholder='Insert dog´s maximum weight'
                name='maxWeight'
                value={creationForm.maxWeight}
                required
                onChange={(el) => handleChange(el)}
              />
              <span> {formError.maxWeight}</span>
            </div>
          </div>

          <div className={s.heights}>
            <div className={s.minheight}>
              <label>Min height: </label>
              <input
                type='number'
                min="1"
                maxLength='3'
                placeholder='Insert dog´s minimum height'
                name='minHeight'
                value={creationForm.minHeight}
                required
                onChange={(el) => handleChange(el)}
              />
              <span> {formError.minHeight}</span>
            </div>

            <div className={s.maxheight}>
              <label className={s.formlabel}>Max height: </label>
              <input
                type='number'
                min="1"
                maxLength='3'
                placeholder='Insert dog´s maximum height'
                name='maxHeight'
                value={creationForm.maxHeight}
                required
                onChange={(el) => handleChange(el)}
              />
              <span> {formError.maxHeight}</span>
            </div>
          </div>

          <div className={s.ls}>
            <div className={s.minls}>
              <label className={s.formlabel}>Min life span: </label>
              <input
                type='number'
                min="1"
                maxLength='3'
                placeholder='Insert dog´s minimum life expectation'
                name='minLifeSpan'
                value={creationForm.minLifeSpan}
                required
                onChange={(el) => handleChange(el)}
              />
              <span> {formError.minLifeSpan}</span>
            </div>

            <div className={s.maxls}>
              <label className={s.formlabel}>Max life span: </label>
              <input
                type='number'
                min="1"
                maxLength='3'
                placeholder='Insert dog´s maximum life expectation'
                name='maxLifeSpan'
                value={creationForm.maxLifeSpan}
                required
                onChange={(el) => handleChange(el)}
              />
              <span> {formError.maxLifeSpan}</span>
            </div>
          </div>

          <div className={s.imageinput}>
            <label className={s.formlabel}>Image: </label>
            <input
              type="URL"
              placeholder='Insert your dogs image!'
              name='image'
              value={creationForm.image}
              required
              onChange={(el) => handleChange(el)}
            />
            <span> {formError.image}</span>
          </div>

          <div className={s.formtemps}>
            <div className={s.tempsinput}>
              <label >Temperament/s: </label>
              <select
                multiple={true}
                name='temperaments'
                value={creationForm.temperaments}
                onChange={(el) => handleTemps(el)}
              >
                {
                  deleteRepeatedTemps(allTemperaments).map((temp) => {
                    return (
                      <option className={s.temps} value={temp} name={temp}>
                        {temp}
                      </option>
                    )
                  })
                }
              </select>
              <div className={s.deletetemps}>
                {
                  creationForm.temperaments?.map((temp) => {
                    return (
                      <div className={s.contentdelete}>
                        <div className={s.closeico}>
                          <img src={close} alt="" onClick={() => deleteTemp(temp)} />
                        </div>
                        <div className={s.deletetext}>
                          <p>{temp}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>



            <div className={s.formbutton}>
              <div className={s.errortemps}>
                {formError.select && <p>{formError.select}</p>}
              </div>
              {(
                creationForm.name.length > 0 &&
                !formError.name &&
                !formError.minHeigh &&
                !formError.maxHeight &&
                !formError.minWeight &&
                !formError.maxWeight &&
                !formError.maxLifeSpan &&
                !formError.minLifeSpan &&
                !formError.image &&
                creationForm.image.length > 0
              ) ? <button className={s.submit} type="submit" name="submit" onClick={(e) => handleSubmit(e)}>
                create dog
              </button> : <button className={s.submit} type="submit" name="submit" disabled={true} >
                create dog
              </button>}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}