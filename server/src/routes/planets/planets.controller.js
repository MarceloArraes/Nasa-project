const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
  console.log("ENTERED httpGetAllPlanets");
  return res.status(200).json({'message':"sucesso"});
}
module.exports = {
  httpGetAllPlanets
};