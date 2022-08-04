const API_URL ='https://gold-expensive-bream.cyclic.app'
//const API_URL ='http://localhost:8000'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  const data = await response.json();
  console.log("PLANETS: ", data);
  return data
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  console.log('ENTERED GET LAUNCHES');
  const response = await fetch(`${API_URL}/launches`);
  const data = await response.json();
  console.log("PLAUNCHES: ", data);
  if(data.length > 0) return data.sort((a, b) => a.flightNumber - b.flightNumber)
  return data
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};