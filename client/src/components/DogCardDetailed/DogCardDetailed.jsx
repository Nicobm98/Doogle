import React, { useEffect, useState } from 'react';
import { idSearch } from '../../redux/actions/actionsIndex';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Loading from '../Loading/Loading';
import s from './dogcarddetailed.module.css'
import back from '../../images/backarrow.svg'

export default function DogCardDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector(state => state.dogsDetails);
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1090);
  const history = useHistory()

  
  useEffect(() => {
    dispatch(idSearch(id))
  }, [id, dispatch])

  function handleBack() {
    history.goBack()
  }

  /* 
__Ruta de detalle de raza de perro__: debe contener

- [✔️] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
- [✔️] Altura
- [✔️] Peso
- [✔️] Años de vida
  */
  return (
    <div className={s.maincontainer}>
      <NavBar></NavBar>
      <div className={s.backbutton}>
        <img src={back} alt="" onClick={handleBack} />
      </div>
      {
        loading
          ? <Loading />
          : dog.message ? <h1>{dog.message}</h1>
            : <div className={s.container}>

              <div className={s.dogimage}>
                <img src={dog.image} alt="" />
              </div>
              <div className={s.contentcontainer}>
                <div className={s.content}>
                  <h3>{dog.name}</h3>
                  <div className={s.characteristics}>
                    <h6 className={s.about}>About:</h6 >
                    <p>
                      Weight: {dog.weight}
                    </p>
                    <p>
                      Height: {dog.height}
                    </p>
                    <p>
                      Life span: {dog.lifetime}
                    </p>
                    <p>
                      Temperament/s: {dog.temperaments}
                    </p>
                    <p>
                      *Weight and height metrics are expressed in <b>kg</b> and <b>cm</b>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
      }
    </div>
  )
}