const dotenv = require('dotenv');
const request = require('supertest');

dotenv.config();
const db = require('../dist/config/database').default;
const testDB = new db(process.env.MONGO_URI);
const app = require('../dist/src/server').default;


process.env.NODE_ENV = 'test';




describe('User operations', () => {
    before(async() => {
        await testDB.init();
    });
    after(async() => {
        await testDB.closeDatabase();
    });

    describe('POST /users', () => {
        it('should create user', (done) => {
            request(app)
            .post('/users')
            .send({email:'test@example.com', password:'password'})
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if(err) return done(err);
                return done();
            })
        })
    })
    describe('GET /users', () => {
        it('should get user', (done) => {
            request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(200, done)
        })
    })
    
    

})


