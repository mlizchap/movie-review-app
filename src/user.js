const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = require('./movie');

const UserSchema = new Schema({
    name: {
        type: String
    },
    movies: [MovieSchema],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }]
})

UserSchema.virtual('movieCount').get(function() {
    // this keyword will refer to the instance of the model we're working on
    return this.movies.length;
})

// removes a user's reviews when that user is deleted from the db 
UserSchema.pre('remove', function(next) {
    const Review = mongoose.model('review');
    // this.review ==== an array of an instance's reviews, $in: if the ID is in the array, the review is removed 
    Review.remove({_id: { $in: this.reviews }})
        .then(() => next());
})

const User = mongoose.model('user', UserSchema);

module.exports = User;