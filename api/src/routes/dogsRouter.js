const express = require('express')
const router = express.Router()
const {
  getAllDogs,
  getApiDogs,
  getDbDogs
} = require('../controllers/getDogs')
const { Dog, Temperament } = require('../db.js');

/*
GET /dogs:
  Obtener un listado de las razas de perro
  Debe devolver solo los datos necesarios para la ruta principal
GET /dogs?name="...":
  Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
  Si no existe ninguna raza de perro mostrar un mensaje adecuado
*/
router.get('/', async (req, res) => {
  const dogName = req.query.name;
  try {
    const dogs = await getAllDogs();
    if (dogName) {
      var queryDog = dogs.filter((dog) => dog.name.toLowerCase().includes(dogName.toLowerCase()));
      queryDog.length ? res.status(200).json(queryDog) : res.status(404).json({ msg: `Can't find dog with name: ${dogName}` })
    }
    else res.status(200).send(dogs)
  } catch (error) {
    res.status(400).send({ msg: "ERROR: Unexpected error getting dogs at file ~ dogsRouter.js ~ line 25" })
  }
})

/* 
GET /dogs/{idRaza}:
  Obtener el detalle de una raza de perro en particular
  Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  Incluir los temperamentos asociados
*/

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const dogs = await getAllDogs()

  const dog = dogs.find(dog => dog.id == id)

  try {
    if (!dog) return res.json({ message: `Can't find dog with id:${id}` })
    res.json(dog)

  } catch (error) {
    res.status(400).send({ msg: "ERROR: Unexpected error getting dogID at file ~ dogsRouter.js ~ line 47" })
  }

})
/*
POST /dogs:
  Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  Crea una raza de perro en la base de datos relacionada con sus temperamentos
*/

router.post("/", async (req, res) => {
  const { name, height, weight, image, lifetime, temperaments } = req.body;
  if (!name || !height || !weight || !image) res.status(404).send("Missing some required values")
  if (name.length > 25 || name.length < 4) res.status(400).send(`Name must be more than 4 characters or less than 25`)
  if (name.search(/[^{};*@>!<]*$/) !== 0) res.status(400).send("Name can't have special characters")

  try {
    const info = { name, height, weight, lifetime, image }
    const newDog = await Dog.create(info)

    let newDogTemperament = await Temperament.findAll({
      where: {
        name: temperaments
      }
    })
    newDog.addTemperament(newDogTemperament)
    return res.status(201).send("the dog was successfully created")

  } catch (error) {
    return res.status(400).send({ msg: "ERROR: Unexpected error creating dog at file ~ dogsRouter.js ~ line 76" })
  }
})

router.get('/dogsFromApi', async (req, res) => {
  try {
    const dogs = await getApiDogs();
    res.status(200).send(dogs)
  } catch (error) {
    res.status(400).send({ msg: "ERROR: Unexpected error getting api dogs at file ~ dogsRouter.js ~ line 89" })
  }
})

router.get('/dogsFromDb', async (req, res) => {
  try {
    const dogs = await getDbDogs();
    res.status(200).send(dogs)
  } catch (error) {
    res.status(400).send({ msg: "ERROR: Unexpected error getting api dogs at file ~ dogsRouter.js ~ line 98" })
  }
})





module.exports = router