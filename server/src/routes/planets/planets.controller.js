const { getAllPlanets, planets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
  return res.status(200).json(planets);
}
module.exports = {
  httpGetAllPlanets
};