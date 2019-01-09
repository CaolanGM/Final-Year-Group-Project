var assert = require('assert');

describe('testing index page', function() {
    it('check title', function () {
        browser.url('/');
        var title = browser.getTitle();
        assert.equal(title, 'Event Planning');
    });
});