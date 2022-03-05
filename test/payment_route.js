const dotenv = require('dotenv');
const request = require('supertest');

dotenv.config();
const db = require('../dist/config/database').default;
const testDB = new db(process.env.MONGO_URI);
const app = require('../dist/src/server').default;


process.env.NODE_ENV = 'test';


describe('Payment operations', () => {
    before(async() => {
        await testDB.init();
    });
    after(async() => {
        await testDB.closeDatabase();
    });

    describe('POST /payment', () => {
        it('should create a payment gateway', (done) => {
            request(app)
            .post('/payment')
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                else{
                    return done();
                }
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


