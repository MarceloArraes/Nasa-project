const launches = new Map();

const launch = {
  flightNumber:100,
  mission: 'Kepler exploration something',
  rocket: 'Falcon 1',
  launchData: new Date('2021-05-09'),
  destination: 'Kepler-442b',
  customer: ['ZTM', 'SpaceX'],
  upcoming: true,
  sucess:true
}

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  console.log('getAllLaunches');
  return Array.from(launches.values());
}

module.exports = {
  getAllLaunches,
}