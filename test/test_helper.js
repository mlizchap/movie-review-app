const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/movies_test');
    mongoose.connection
        .once('open', () =>  done() )
        .on('error', () => (error) => {
            console.warn('Warning', error);
        })
})

beforeEach((done) => {
    const { users, reviews, comments } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            reviews.drop(() => {
                done();
            })
        })
    })
})

