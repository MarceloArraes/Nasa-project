const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: 'Kepler exploration something',
  rocket: 'Falcon 1',
  launchDate: new Date('2021-05-09'),
  target: 'Kepler-442b',
  customes: ['ZTM', 'SpaceX'],
  upcoming: true,
  sucess:true
}

let latestFlightNumber = launch.flightNumber;
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  console.log('getAllLaunches');
  return Array.from(launches.values());
}

function addLaunch(launch) {
  console.log('addLaunch');

  launches.set(latestFlightNumber + 1, Object.assign(launch, {
    flightNumber: latestFlightNumber + 1,
    customers: ['MAT', 'SpaceX'],
    upcoming: true,
    sucess:true
  }));
  latestFlightNumber++;
}

function removeLaunch(launch) {
  console.log('removeLaunch');
  const abortedLaunch = launches.get(launch.flightNumber)
  //return launches.delete(launch.flightNumber);
  abortedLaunch.upcoming = false;
  abortedLaunch.sucess = false;

  return true;

}

module.exports = {
  getAllLaunches,
  addLaunch,
  removeLaunch
}