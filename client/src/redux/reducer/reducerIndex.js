import {
  GET_DOGS,
  GET_DOG_BY_ID,
  GET_TEMPERAMENTS,
  CREATE_DOG,
  SEARCH_DOG,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  SORT_BY_ALPHABET,
  SORT_BY_WEIGHT,
  SORT_BY_LS
} from '../actions/actionsIndex';

const initialState = {
  dogs: [],
  arrToFilterDogs: [],
  dogsDetails: {},
  temperaments: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        arrToFilterDogs: action.payload,
      };

    case SEARCH_DOG:
      return {
        ...state,
        dogs: action.payload
      };

    case GET_DOG_BY_ID:
      return {
        ...state,
        dogsDetails: action.payload
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }

    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.arrToFilterDogs
      const filterDog = (action.payload === 'All') ? allDogs : allDogs.filter(dog => dog.temperaments?.includes(action.payload));
      return {
        ...state,
        dogs: filterDog
      };

    case FILTER_BY_ORIGIN:
      const allDogsOrigin = state.arrToFilterDogs
      const origin = action.payload === 'All'
        ? allDogsOrigin : action.payload === 'DB'
          ? allDogsOrigin.filter((dog) => dog.id.length > 3)
          : allDogsOrigin.filter((dog) => typeof dog.id == 'number')
      return {
        ...state,
        dogs: origin
      };
    case SORT_BY_ALPHABET:
      return {
        ...state,
        dogs: action.payload === true ? state.dogs.slice().sort((a, b) => b.name.localeCompare(a.name)) : state.dogs.slice().sort((a, b) => a.name.localeCompare(b.name))
      };
    case SORT_BY_WEIGHT:
      return {
        ...state,
        dogs: action.payload === true ? state.dogs.slice().sort((a, b) => parseInt(a.weight) - parseInt(b.weight)) : state.dogs.slice().sort((a, b) => parseInt(b.weight) - parseInt(a.weight))
      };
    case CREATE_DOG:
      return {
        ...state,
      };
    case SORT_BY_LS:
      //const lsFilter = state.arrToFilterDogs
      const sortLs = (action.payload === true) ? state.arrToFilterDogs.slice().sort((a, b) => parseInt(a.lifetime) - parseInt(b.lifetime)) : state.arrToFilterDogs.slice().sort((a, b) => parseInt(b.lifetime) - parseInt(a.lifetime))
      return{
        ...state,
        dogs: sortLs
      }
    default:
      return {
        ...state,
      };
  }
}


export default rootReducer;