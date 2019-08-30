const db = require('../data/dbConfig.js');
const Hobbits = require('../hobbits/hobbitsModel.js');

describe ('hobbit', () => {
    describe('initial test  make sure all okay; ', () => {
        beforeEach(async () => {
            // this function executes and clears out the table before each test
            await db('hobbits').truncate();
          });
        it('should pass', () => {
            expect(true).toBe(true);
        })

        //Testing creating a resource
    

    })
    describe('killing and adding hobbitses works', () => {
        it('adding hobbitses', async () => {
            
            //Test hobbits added
            await Hobbits.insert({name:"Buddy"});
            await Hobbits.insert({name:"Mindy"});

            const hobbits_db = await Hobbits.getAll();
            expect(hobbits_db).toHaveLength(2);
        });

        it('killing hobbitses', async () => {
            //Test hobbit murdered, let's kill Buddy!
            await Hobbits.remove(1);

            const hobbits_db = await Hobbits.getAll();
            expect(hobbits_db).toHaveLength(1);
        })
    })
    
}) 