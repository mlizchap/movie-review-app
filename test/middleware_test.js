const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Review = require('../src/review');

describe('Middleware', () => {
    let jane, review;

    beforeEach((done) => {
        jane = new User({ name: 'Jane' });
        review = new Review({ title: 'Toy Story Review'});

        jane.reviews.push(review);

        Promise.all([jane.save(), review.save()])
            .then(() => done());
    })

    it('users clean up dangling blogpost on remove', (done) => {
        jane.remove()
            .then(() => Review.count())
            .then((count) => {
                assert(count === 0)
                done();
            })
    })
})