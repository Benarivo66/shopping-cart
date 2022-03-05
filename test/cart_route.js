const { expect } = require('chai');
const dotenv = require('dotenv');
const request = require('supertest');

dotenv.config();
const db = require('../dist/config/database').default;
const testDB = new db(process.env.MONGO_URI);
const app = require('../dist/src/server').default;

process.env.NODE_ENV = 'test';

let id;

describe('Cart operations', () => {
    before(async() => {
        await testDB.init();
    });
    after(async() => {
        await testDB.closeDatabase();
    });

    describe('POST /product', () => {
        it('should create product', (done) => {
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
    describe('POST /cart', () => {
        it('should create cart', (done) => {
            const fields = {quantity: 1}
            request(app)
            .post(`/cart/${id}`)
            .send(fields)
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .end((err, res) => {
                expect(res.status).to.be.equal(200)
                if(err) return done(err);
                return done()
            })
            
            
        })
    })
    describe(`GET /cart`, () => {
        it('should get cart', (done) => {
            request(app)
            .get('/cart')
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(200, done)
        })
    })
    describe('DELETE /cart}', () => {
        it('should delete a cart', (done) => {
            request(app)
            .delete('/cart')
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.body.status).to.be.equal('Success');
                expect(res.status).to.be.equal(200);
                return done();
            })
        })
    })
    
})


