const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planets.mongo')

//const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

async function getAllPlanets() {
  return await planets.find({});
}

async function savePlanet(planet) {
  try{
    await planets.updateOne({
        keplerName: planet.kepler_name,
      }, {
        keplerName: planet.kepler_name,
      },
        {
          upsert: true
      });
  } catch (err) {
    console.log("could not sabe planet ", err);
  }
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {

  fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
  .pipe(parse({
    comment: '#',
    columns: true,
    delimiter: ','
  }))
  .on('data', async (data) => {
    if (isHabitablePlanet(data)) {
      // TODO: insert + update = upsert
      savePlanet(data);
      //habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
    reject(err);
  })
    .on('end', async () => {
    const countPlanetsFound = (await getAllPlanets()).length;
    console.log(`There are ${countPlanetsFound} habitable planets.`);
    console.log('done');
    resolve();
  }
  );
    });
}


module.exports = {
  loadPlanetsData,
  getAllPlanets,
  planets
}