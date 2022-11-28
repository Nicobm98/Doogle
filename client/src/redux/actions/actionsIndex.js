import axios from 'axios';
export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const CREATE_DOG = 'CREATE_DOG';
export const SEARCH_DOG = 'SEARCH_DOG';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
export const SORT_BY_LS = 'SORT_BY_LS'
//export const LOADING = 'LOADING';
const URL = 'http://localhost:3001'


/*        
❌✔️DONE BUT NOT TESTED YET         
✔️DONE AND TESTED. 
__________________ ¿What do i need?___________________
------------------->Get all dogs<------------------- ✔️
------------------->Search a dog<------------------- ✔️
------------------->Get a dog by ID<-------------------✔️
------------------->Get all temperaments<-------------------✔️
------------------->Filter by temperament<-------------------✔️
------------------->Filter by origin<-------------------✔️
------------------->Order by alphabet<-------------------✔️
------------------->Order by weight<-------------------✔️
------------------->Create a dog<-------------------
______________________________________________________
*/

//------------EVERY GET I NEED --------------------------
export function getAllDogs() {
  return async function (dispatch) {
    return await axios.get(URL + '/dogs').then((response) => {
      dispatch({
        type: GET_DOGS,
        payload: response.data,
      })
    })
      .catch((err) => console.log(err))
  }
}

export function searchDogs(name) {
  return async function (dispatch) {
    return await axios.get(URL + `/dogs?name=${name}`).then((response) => {
      dispatch({
        type: SEARCH_DOG,
        payload: response.data,
      })
    })
      .catch((err) => {
        alert(`Dog not found with name: ${name}`)
      });
  }
}

export function idSearch(id) {
  return async function (dispatch) {
    return await axios.get(URL + `/dogs/${id}`).then((response) => {
      dispatch({
        type: GET_DOG_BY_ID,
        payload: response.data
      })
    })
      .catch((err) => console.log(err))
  }
}

export function getAllTemperaments() {
  return async function (dispatch) {
    return await axios.get(URL + '/temperaments').then((response) => {
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: response.data
      })
    })
      .catch((err) => console.log(err))
  }
}

/*_________________________________________________________________________________*/

//------------EVERY FILTER I NEED --------------------------
export function filterByTemperaments(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: payload,
  }
}


export function filterByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  }
}


/*_________________________________________________________________________________*/

//------------ SORTS --------------------------
export function alphabetSort(payload) {
  return {
    type: SORT_BY_ALPHABET,
    payload,
  }
}

export function weightSort(payload) {
  return {
    type: SORT_BY_WEIGHT,
    payload,
  }
}

export function sortyByLs(payload){
  return{
    type: SORT_BY_LS,
    payload,
  }
}
//_______________________________________________________________________________

export function createDogs({
  name,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  minLifeSpan,
  maxLifeSpan,
  image,
  temperaments,
}) {
  return async function () {
    try {
      var create = await axios.post('http://localhost:3001/dogs', {
        name,
        height: `${minHeight} - ${maxHeight}`,
        weight: `${minWeight} - ${maxWeight}`,
        lifetime: `${minLifeSpan} - ${maxLifeSpan} years`,
        image,
        temperaments,
      })
      return create
    } catch (error) {
      console.log("Create dog error at action: " + error)
    }
  }
}

  