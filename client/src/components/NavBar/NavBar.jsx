import React, { useState } from "react";
import s from './navbar.module.css';
import logo from '../../images/logo.png';
import SearchInput from "../SearchInput/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import { filterByTemperaments, filterByOrigin, alphabetSort, weightSort, sortyByLs } from "../../redux/actions/actionsIndex";
import { deleteRepeatedTemps } from '../Home/handleRepeatedTemperaments'
//import home from '../../images/home.png';
//import homeB from '../../images/home-100.png'
//import homeS from '../../images/home-50.png'
import weight2 from '../../images/weight.png'
import up from '../../images/up.svg'
import down from '../../images/down.svg'
import az from '../../images/az.svg'
import za from '../../images/za.svg'


export default function Navbar({ setPage }) {

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments)
  const [alphabet, setAlphabet] = useState(true);
  const [weight, setWeight] = useState(true);

  function filterTemperaments(el) {
    setPage(1)
    dispatch(filterByTemperaments(el.target.value))
  }

  function filterOrigin(el) {
    setPage(1)
    dispatch(filterByOrigin(el.target.value))
  }

  function changeAlphabet() {
    setAlphabet(!alphabet)
    dispatch(alphabetSort(alphabet))
    setPage(1)
  }

  function sortByWeight() {
    setWeight(!weight);
    dispatch(weightSort(weight));
    setPage(1);
  }


  if (window.location.pathname === '/home') {
    return (
      <nav className={s.nav}>
        <a href="/home">
          <img src={logo} alt="" className={s.logo} />
        </a>
         <div className={s.search}>
          <SearchInput setPage={setPage}></SearchInput>
        </div> 
        <div className={s.createbutton}>
          <a href="/create">
            <button>¡Create my dog!</button>
          </a>
        </div>
        <div className={s.filters}>
          <p>Filter by</p>
          <div className={s.temps}>
            <select name='filterByTemperament' onChange={(el) => filterTemperaments(el)} >
              <option value='All'>All temperaments</option>
              {deleteRepeatedTemps(temperaments).map((temp) => {
                return (
                  <option key={temperaments.id} value={temp}>
                    {temp}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={s.origin}>
            <select name='filterByOrigin' onChange={(el) => filterOrigin(el)}>
              <option value='All'>Any origin</option>
              <option value='API'>API</option>
              <option value='DB'>Database</option>
            </select>
          </div>
        </div>
        <div className={s.sorts}>
          <p>Sort by</p>
          <div className={s.weightcontainer}>
            <img src={alphabet ? az : za} alt="" onClick={changeAlphabet} className={s.weightimage} />
            <img src={weight2} alt="" onClick={sortByWeight} className={s.weightimage} />
            <img src={weight ? up : down} alt="" className={s.arrow} />
            {/* <button onClick={sortLs}>LS SORT</button> */}
          </div>
        </div>

      </nav>
    )
  }
  if (window.location.pathname === '/create'){
    return (
    <nav className={s.navcreate}>
      <a href="/home">
        <img src={logo} alt="" className={s.logo} />
      </a>
      <div className={s.search}>
        <p>Creating dog...</p>
      </div>
    </nav>
  )}
  return (
    <nav className={s.nav}>
      <a href="/home">
        <img src={logo} alt="" className={s.logo} />
      </a>
    </nav>
  )
}