const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

async function getAllPlanets() {
  return await habitablePlanets.find({}, {
    '_id': 0, '__v': 0,
  });
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {

  fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
  .pipe(parse({
    comment: '#',
    columns: true,
    delimiter: ','
  }))
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
    reject(err);
  })
  .on('end', () => {
    console.log(`There are ${habitablePlanets.length} habitable planets.`);
    console.log('done');
    resolve();
  }
  );
    });
}


module.exports = {
  loadPlanetsData,
  getAllPlanets,
  planets: habitablePlanets
}