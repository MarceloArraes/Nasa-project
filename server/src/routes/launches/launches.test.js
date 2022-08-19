const request = require('supertest')
const { response } = require('../../app')
const app = require('../../app')
const {mongoConnect, mongoDisconnect} = require('../../services/mongo')

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/launches')
        .expect(200)
        .expect('Content-Type', /json/)
      //expect(response.statusCode).toBe(200);
    })
  })

  describe('Test POST /launch', () => {
    const completeLaunchData = {
      mission: 'USS ENTERPRISE',
      rocket: 'FALCON12',
      target: 'Kepler-1652 b',
      launchDate: 'May 5, 2024'
    }
    const LaunchDataWithoutDate = {
      mission: 'USS ENTERPRISE',
      rocket: 'FALCON12',
      target: 'Kepler-1652 b',
    }
    test('It should respond with 201 success', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201)
      expect(response.body.message == 'Launch added')
      console.log('test 201 response.body: ', response.body);
       expect(response.body.launch).toMatchObject({
        ...LaunchDataWithoutDate,
       // flightNumber: 101,
       //customers: ['MAT', 'SpaceX'],
       //success: true,
       // upcoming: true,
        launchDate: "2024-05-05T00:00:00.000Z"
      })
    })
    describe('It should catch missing properties', () => {
      const LaunchDataWithoutDate = {
        mission: 'BR ENTERPRISE',
        rocket: 'FALCON14',
        target: 'Kepler 62-f',
      }
      const LaunchDataWithErrorInDate = {
        mission: 'BR ENTERPRISE',
        rocket: 'FALCON14',
        target: 'Kepler 62-f',
        launchDate: 'nalgum tempo'
      }

      test('Missing date property', async () => {
        const response = await request(app)
          .post('/launches')
          .send(LaunchDataWithoutDate)
          .expect('Content-Type', /json/)
          .expect(400)
        const responseText = JSON.parse(response.text)
        expect(responseText.message).toBe('Missing required fields.')
        expect(response.body).toStrictEqual({ message: 'Missing required fields.' })
      })
      test('It should catch invalid dates', async () => {
        const response = await request(app)
          .post('/launches')
          .send(LaunchDataWithErrorInDate)
          .expect('Content-Type', /json/)
          .expect(400)
        const responseText = JSON.parse(response.text)
        expect(responseText.message).toBe('Invalid launch date.')
        expect(response.body).toStrictEqual({ message: 'Invalid launch date.' })
      })

    })

  })
})