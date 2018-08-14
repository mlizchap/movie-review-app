const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('movieCount returns the number of reviews', (done) => {
        const jane = new User({
            name: 'Jane',
            movies: [{ title: 'Toy Story Review'}]
        })

        jane.save() 
            .then(() => User.findOne({ name: 'Jane' }))
            .then((user) => {
                assert(user.movies.length === 1);
                done();
            })
    })
})