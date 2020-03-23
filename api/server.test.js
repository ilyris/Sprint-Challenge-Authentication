require('dotenv').config();
const server = require('./server');
const {addUser, findUsersBy} = require('../api/models/users');
const db = require('../database/dbConfig');
const request = require('supertest');

describe('Jokes Route', () => {
    it('should return code 401', async () => {
        const response = await request(server).get('/api/jokes/');
        expect(response.status).toBe(422);
        });   


    it('should return JSON', async () => {
        const response = await request(server).get('/');
        expect(response.type).toBe('text/html');
    })

})

describe('User Register', () => {
    beforeEach(async () => {
        // this function executes and clears out the table before each test
        await db('users').truncate();
      });
    it('should insert a user', async () => {
        await addUser({username:'dsieren', password: '123123123'});

        const users = await db('users');
        expect(users).toHaveLength(1);
    });
    it('should return 404', async () => {
        const response = await request(server).get('/api/auth/login');
        expect(response.status).toBe(404);
}) 
});
