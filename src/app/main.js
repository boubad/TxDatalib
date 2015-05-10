"use strict";
require.config({
    paths: {
        'QUnit': '../lib/qunit/qunit-1.18.0',
        'bluebird': '../lib/bluebird/bluebird',
        'pouchdb': '../lib/pouchdb/pouchdb.min',
        'domain':'./data/domain'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       },
       'bluebird': {
         exports: 'Promise'
       },
       'pouchdb':{
        depends:['bluebird'],
        exports: 'PouchDB'
       }
    }
});
// require the unit tests.
require(
    ['bluebird','pouchdb','QUnit','test/pouchdatabasetest'],
    function(Promise,PouchDB,QUnit, Mytest) {
        PouchDB.debug.enable('*');
        // run the tests.
        //dummyTest.run();
        Mytest.main.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
