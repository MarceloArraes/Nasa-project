const {loadPlanetsData ,planets} = require('../../models/planets.model')

async function getAllPlanets(req, res) {
  await loadPlanetsData();
  return res.status(200).json(planets)
}
module.exports = {
  getAllPlanets
};