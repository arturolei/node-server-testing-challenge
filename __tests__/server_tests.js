const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');

describe('testing server.js', ()=> {
    // beforeEach(async () => {
    //     // this function executes and clears out the table before each test
    //     await db('hobbits').truncate();
    //   });
      

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

    describe('Tests /api/hobbits endpoint 1) Insert 2) GET to verify insert', () => {
        
        //Here is where we would add them hobbits
        it('POST/insert Hobbits', async () => {
            //clear test db before we do anything, but we only want to clear it here
            await db('hobbits').truncate();        
            const firstHobbit = {name:"Buddy"};
            const res = await request(server).post('/api/hobbits').send(firstHobbit);    
            console.log(res.body);
            expect(res.body).toEqual({id:1, name:"Buddy"})
            
        })

        
        it('GET /hobbits returns all the hobbits', async () => {
            const res = await request(server).get('/api/hobbits');
            expect(res.body).toEqual([{id:1, name:"Buddy"}])
        })
    })

    describe('Tests /api/hobbits endpoint POST then GET, variant 2: combining Post and Delete in One Describe', () => {
        

        
        //Here is where we would add them hobbits
        it('Add two hobbits and then see that they show up in get request', async () => {
            //clear test db before we do anything, but we only want to clear it here
            await db('hobbits').truncate();
            
            
            const firstHobbit = {name:"Samwise"};
            const secondHobbit = {name: "Bubo"};

            await request(server).post('/api/hobbits').send(firstHobbit);
            await request(server).post('/api/hobbits').send(secondHobbit);
            

            const res = await request(server).get('/api/hobbits');
            

            //console.log should produce "[{"id": 1, "name": "Samwise"}, {"id": 2, "name": "Bubo"}]"
            console.log(res.body);
            
            expect(res.body).toEqual([{"id": 1, "name": "Samwise"}, {"id": 2, "name": "Bubo"}])
            
        })


    })


    describe('Tests /api/hobbits endpoint POST then DELETE then GET', () => {
        

        
        //Here is where we would add them hobbits
        it('Add two hobbits and then kill one', async () => {
            //clear test db before we do anything, but we only want to clear it here
            await db('hobbits').truncate();
            
            
            const firstHobbit = {name:"Samwise"};
            const secondHobbit = {name: "Bubo"};

            await request(server).post('/api/hobbits').send(firstHobbit);
            await request(server).post('/api/hobbits').send(secondHobbit);
            await request(server).delete('/api/hobbits/1');
            

            const res = await request(server).get('/api/hobbits');
            

            //console.log(res.body, "Killed Samwise")
            expect(res.body).toEqual([{"id": 2, "name": "Bubo"}])
            
        })


    })

 

  
})