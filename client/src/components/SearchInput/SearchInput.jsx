import React from 'react';
import s from "./searchinput.module.css"
import { useState } from 'react';
import { useDispatch } from "react-redux"
import { searchDogs } from "../../redux/actions/actionsIndex"
import searchicon from '../../images/search-icon.svg'
//import Loading from '../Loading/Loading'

export default function SearchInput({setPage}) {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  //const [loading, setLoading] = useState(true)
 // setTimeout(() => setLoading(false), 1900);

  function handleChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }
  
  function handleSearch() {
    dispatch(searchDogs(search))
    setPage(1)
  }

  function handleKeyPress(e){
    if (search) {
      if (e.key === "Enter") handleSearch();
    }
  }

  return (
    <div className={s.sInput}>
        <input className={s.input_box} placeholder='Find my dog...' type="text" onChange={(e) => handleChange(e)} onKeyPress={(e) => handleKeyPress(e)} />
        <div className={s.icon}>
          <img src={searchicon} alt="" onClick={handleSearch}></img>
        </div>  
    </div>
  )
}