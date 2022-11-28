const express = require('express')
const router = express.Router()
const { getApiDogs } = require('../controllers/getDogs')
const { Temperament } = require('../db.js');


/* GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/

router.get('/', async (req, res) => {
    try {
        const infoApi = await getApiDogs();
        const apiTemperaments = infoApi.map(dog => dog.temperaments).join().split(',');
        const dbTemperaments = apiTemperaments.map(e => e.trim());
        dbTemperaments.forEach(e => {
            if (e) {
                Temperament.findOrCreate({
                    where: {
                        name: e
                    }
                });
            }
        });
    
        const allTemperaments = await Temperament.findAll()
        res.status(200).send(allTemperaments)
    } catch (error) {
        res.status(400).send({ msg: "ERROR: Unexpected error getting temperaments at file ~ temperamentsRouter.js ~ line 31" })
    }
})






module.exports = router