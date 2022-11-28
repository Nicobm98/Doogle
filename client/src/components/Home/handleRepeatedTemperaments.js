function deleteRepeatedTemps(temperaments){
    const allTemperaments = []
    for (let i = 0; i < temperaments.length; i++) {
        allTemperaments.push(temperaments[i].name)
    }
    return [...new Set(allTemperaments)]
     
}

module.exports = {
    deleteRepeatedTemps
}