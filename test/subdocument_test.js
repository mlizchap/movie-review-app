const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', (done) => {
    it('can create a sub document', (done) => {
        const jane = new User({
            name: 'Jane',
            movies: [{ title: 'Titanic' }]
        });

        jane.save()
            .then(() =>User.findOne({ name: 'Jane' }))
            .then((user) => {
                assert(user.movies[0].title === 'Titanic');
                done();
            })
    })

    it('can add subdocs to an existing record', (done) => {
        const jane = new User({
            name: 'Jane',
            movies: []
        })
        jane.save() 
            .then(() => User.findOne({ name: 'Jane'}))
            .then((user) => {
                user.movies.push({ title: 'Titanic' })
                return user.save();
            })
            .then(() => User.findOne({ name: 'Jane' }))
            .then((user) => {
                assert(user.movies[0].title === 'Titanic')
                done()
            })
    })

    it('can remove an existing document', (done) => {
        const jane = new User({
            name: 'Jane',
            movies: [{ title: 'Titanic' }]
        })
        jane.save()
            .then(() => User.findOne({ name: 'Jane' }))
            .then((user) => {
                user.movies[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Jane' }))
                .then((user) => {
                    assert(user.movies.length === 0);
                    done();
                })
    })
})