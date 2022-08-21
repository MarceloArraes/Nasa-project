const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')
const axios = require('axios');

const DEFAULT_FLIGHT_NUMBER = 100;
/* const launches = new Map();

const launch = {
  flightNumber: 100, //flight_number on spacex api
  mission: 'Kepler exploration something', //name
  rocket: 'Falcon 1', //rocket.name
  launchDate: new Date('2021-05-09'), // date_local
  target: 'Kepler-442 b', // not applicable
  customers: ['ZTM', 'SpaceX'], // payload.customers for each payload
  upcoming: true, // upcoming
  success:true // success
} */

//launches.set(launch.flightNumber, launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchesData() {
  console.log('Downloading launches data laodLaunchesData');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [
      {
        path: 'rocket',
        select: {
          name: 1,
        }
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          }
        }
      ]
    }
  });

  console.log('response data', response.data);
}


async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase
    .findOne({})
    .sort('-flightNumber');
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  console.log('getAllLaunches');
  const launchesD = await launchesDatabase.find({}, {
    '_id': 0, '__v': 0
  });
  return launchesD;
}

async function addLaunch(launch) {
  console.log('addLaunch');
  const latestFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = {
    ...launch,
    success: true,
    upcoming: true,
    customers: ['MAT', 'SpaceX'],
    flightNumber: latestFlightNumber,
  };
  await saveLaunch(newLaunch);

//local saving
/*   launches.set(latestFlightNumber + 1, Object.assign(launch, {
    flightNumber: latestFlightNumber + 1,
    customers: ['MAT', 'SpaceX'],
    upcoming: true,
    sucess:true
  }));
  latestFlightNumber++; */
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target
  });
  if (!planet) {
    throw new Error('Planet not found');
  }
  try {
    await launchesDatabase.updateOne({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true
    });
  }
  catch (err) {
    console.log("could not sabe launch ", err);
  }

}

async function removeLaunch(launch) {
  console.log('removeLaunch');
/*   const abortedLaunch = launches.get(launch.flightNumber)
  //return launches.delete(launch.flightNumber);
  abortedLaunch.upcoming = false;
  abortedLaunch.sucess = false; */

  const deleteLaunch = await launchesDatabase.updateOne({
    flightNumber: launch.flightNumber
  }, {
    upcoming: false,
    success: false
  });
  console.log('deleteLaunch', deleteLaunch);
  return deleteLaunch.modifiedCount === 1;

}

module.exports = {
  loadLaunchesData,
  getAllLaunches,
  addLaunch,
  removeLaunch
}