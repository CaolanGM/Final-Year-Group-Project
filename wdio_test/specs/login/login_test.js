var assert = require('assert');
var config = require('../../../wdio.conf.js').config;

//define user login details
var TEST_USERNAME = 'admin';
var TEST_PASSWORD = 'admin';

describe('testing login functionality', function() {
    it('check login', function () {
        //navigate to register page
        browser.url('/login');
        //fill form
        browser.setValue('[name="username"]', TEST_USERNAME);
        browser.setValue('[name="password"]', TEST_PASSWORD);
        //login
        browser.click('input[value=Login]');
        //assert now on dashboard
        assert.equal(browser.getUrl(), config.baseUrl+'/dashboard');

    });

});