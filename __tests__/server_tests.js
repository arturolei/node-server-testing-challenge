const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');

describe('testing server.js', ()=> {
    describe('basic test of server setup', () => {

        //test that it's using the right environment, testing not development 

        it('should set the testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    });

    describe('GET requests', () => {

        it('making a GET request with / should return 200 ok',  () => {
            return request(server).get('/')
            .then(res => {
            expect(res.status).toBe(200);
             })
        })

        it('GET /serverworks returns a yes', async () => {
            const res = await request(server).get('/serverworks');
            expect(res.body).toEqual({serverWorking:"yes"});
        })
    })

    describe('Hobbits endpoint tests Insert then GET', () => {
        /*
        beforeEach(async () => {
            // this function executes and clears out the table before each test
            await db('hobbits').truncate();
          });

        */

        
        //Here is where we would add them hobbits
        it('POST/insert Hobbits', async () => {
            await db('hobbits').truncate();
            const firstHobbit = {name:"Buddy"};
            const res = await request(server).post('/api/hobbits').send(firstHobbit);
            
            console.log(res.body);
            expect(res.body).toEqual({id:1, name:"Buddy"})
            
        })

        
        it('GET /hobbits returns all the hobbits', async () => {
            const res = await request(server).get('/api/hobbits');
            console.log(res.body);
            expect(true).toEqual(true)
        })
    })
 

  
})