const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const jane = new User({ name: 'Jane' })

        jane.save()
            .then(() => {
                assert(!jane.isNew);
                done();
            })
    })
})