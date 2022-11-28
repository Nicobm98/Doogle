require('dotenv').config();
const axios = require('axios');
const { API_KEY, API_URL } = process.env;
const { Dog, Temperament } = require('../db.js');

//________________ API Dogs ________________
const getApiDogs = async () => {
  try {
    const dogs = await axios.get(`${API_URL}?api_key=${API_KEY}`)
    const allDogsFormated = await dogs.data.map(dog => {
      return {
        id: dog.id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        lifetime: dog.life_span,
        image: dog.image.url,
        temperaments: dog.temperament,
        function: dog.bred_for,
        group: dog.breed_group
      }
    })
    return allDogsFormated
  } catch (error) {
    console.log(" ~ file: getDogs.js ~ line 25 ~ getApiDogs ~ error", error)
    return [];
  }

}
//_________________________________________

//________________ DB Dogs ________________

const getDbDogs = async () => {
  try {
    const dbDog = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] }
      }
    });
    const response = await dbDog.map(dog => {
      return {
        id: dog.id,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        lifetime: dog.lifetime,
        temperaments: dog.temperaments ? dog.temperaments.map(e => e.name).join(", ") : "Loyal, Independent, Intelligent, Brave",
        image: dog.image
      }
    })
    return response
  } catch (error) {
    console.log(" ~ file: getDogs.js ~ line 56 ~ getDbDogs ~ error", error)
    return [];
  }

}
//_________________________________________

//________________ Get both together ________________

const getAllDogs = async () => {
  try {
    const infoApi = await getApiDogs()
    const infoDb = await getDbDogs()
    const data = infoDb.concat(infoApi)
    return data
  } catch (error) {
    console.log(" ~ file: getDogs.js ~ line 72 ~ getAllDogs ~ error", error)
  }

}

//_________________________________________


module.exports = {
  getApiDogs,
  getDbDogs,
  getAllDogs
}