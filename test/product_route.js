const { expect } = require('chai');
const dotenv = require('dotenv');
const request = require('supertest');

dotenv.config();
const db = require('../dist/config/database').default;
const testDB = new db(process.env.MONGO_URI);
const app = require('../dist/src/server').default;

// process.env.NODE_ENV = 'test';
// console.log(12, process.env.NODE_ENV)
let id;

describe('User operations', () => {
    before(async() => {
        await testDB.init();
    });
    after(async() => {
        await testDB.closeDatabase();
    });

    describe('POST /product', () => {
        it('should create user', (done) => {
            const fields = { name: 'mascolino', description: 'designers', category: 'perfumes',
            quantity: 3, price: 1850 };
            request(app)
            .post('/product')
            .send(fields)
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                id = res._body.data._id;
                if(err) return done(err);
                return done();
            })
        })
    })
    describe('GET /product', () => {
        it('should get user', (done) => {
            request(app)
            .get('/product')
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(200, done)
        })
    })
    describe(`GET /product/${id}`, () => {
        it('should get a single user', (done) => {
            request(app)
            .get(`/product/${id}`)
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(200, done)
        })
    })
    describe(`PUT /product/${id}`, () => {
        it('should update user', (done) => {
            const fields = {category: 'body spray'}
            request(app)
            .put(`/product/${id}`)
            .set('Accept', 'application/json')
            .send(fields)
            .expect('content-Type', /json/)
            .end((err, res) => {
                if(err) return done(err);
                expect(res._body.data.category).to.be.equal('body spray');
                expect(res.status).to.be.equal(200);
                return done();
            })
        })
    })
    describe(`DELETE /product/${id}`, () => {
        it('should delete a user', (done) => {
            request(app)
            .delete(`/product/${id}`)
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .end((err, res) => {
                if(err) return done(err);
                expect(res._body.data.deleted).to.be.equal(true);
                expect(res.status).to.be.equal(200);
                return done();
            })
        })
    })
    
})


