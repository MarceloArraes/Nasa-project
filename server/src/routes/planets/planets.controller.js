const { getAllPlanets, planets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
  console.log("ENTERED httpGetAllPlanets");
  return res.status(200).json(planets);
}
module.exports = {
  httpGetAllPlanets
};