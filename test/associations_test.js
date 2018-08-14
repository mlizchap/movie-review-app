const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const Review = require('../src/review');

describe('Associations', () => {
    let jane, review, comment;

    beforeEach((done) => {
        jane = new User({ name: 'Jane' });
        review = new Review({ title: 'Titanic is the best movie ever', content: 'OK maybe not'});
        comment = new Comment({ content: 'great post!' });

        jane.reviews.push(review);
        review.comments.push(comment);
        comment.user = jane;

        Promise.all([jane.save(), review.save(), comment.save()])
            .then(() => done())
    })

    it('saves a relation between a user and a review', (done) => {
        //console.log(jane);
        User.findOne({ name: 'Jane'})
            // 'reviews' corresponds to the property name
            .populate('reviews')
            .then(user => {
                assert(user.reviews[0].title === 'Titanic is the best movie ever');
                done();
            })
    })

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Jane'})
        .populate({
            path: 'reviews',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Jane')
            assert(user.reviews[0].title === 'Titanic is the best movie ever')
            assert(user.reviews[0].content === 'OK maybe not')
            assert(user.reviews[0].comments[0].user.name === 'Jane');
            done();
        })
    })
    
})