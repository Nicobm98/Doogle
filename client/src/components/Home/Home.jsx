import React from "react";
import { Link } from 'react-router-dom';
import s from './home.module.css';
import {
  getAllDogs,
  getAllTemperaments,
} from '../../redux/actions/actionsIndex';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DogsCard from '../DogsCard/DogsCard';
import NavBar from '../NavBar/NavBar';
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";


export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1900);
console.log(allDogs)
  useEffect(() => {
    if(allDogs.length === 0) {
      dispatch(getAllDogs());
      dispatch(getAllTemperaments())
    }
  }, [dispatch])
  console.log(allDogs)

  // This is for the pagination
  const [page, setPage] = useState(1)
  const [dogsPerPage] = useState(8)
  const lastDogIndex = page * dogsPerPage
  const firstDogIndex = lastDogIndex - dogsPerPage
  const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex)
  const pagination = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0 });
  }
  // ___________________________________________________________
  return (
    <div className={s.bg}>
      <div className={s.content}>
        <NavBar setPage={setPage} />
        <div className={s.cards}>
          {loading ? <Loading /> : currentDogs?.map((el) => {
            return (
              <div className={s.dogscontainer}>
                <Link to={"/details/" + el.id} className={s.link}>
                  <DogsCard key={el.id} name={el.name} image={el.image} temperaments={el.temperaments} weight={el.weight} />
                </Link>
              </div>
            )
          })}
        </div>
        <div className={s.pagination}>
          {loading ? "" : <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            pagination={pagination}
            page={page}
          />}
        </div>
      </div>
    </div>
  )
}