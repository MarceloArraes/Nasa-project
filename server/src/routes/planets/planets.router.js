const express = require('express')

const {getAllPlanets} = require('./planets.controller')
const planetsRouter = express.Router()

planetsRouter.get('/planets', async (req, res) => {
  return await getAllPlanets(req, res);
})

module.exports = planetsRouter