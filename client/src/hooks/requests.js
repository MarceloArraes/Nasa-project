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
}

async function httpSubmitLaunch(launch) {
  console.log('ENTERED SUBMIT LAUNCH');
  try{
  return await fetch(`${API_URL}/launches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(launch)
  });
  }
  catch(err){
    console.log(err);
  }
}

async function httpAbortLaunch(id) {
  return await fetch(`${API_URL}/launches/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};