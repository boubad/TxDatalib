"use strict";
require.config({
    paths: {
        'QUnit': '../lib/qunit/qunit-1.18.0',
        'bluebird': '../lib/bluebird/bluebird',
        'pouchdb': '../lib/pouchdb/pouchdb.min',
        'gql': '../lib/pouchdb/pouchdb.gql',
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
      },
      'gql': {
        depends:['pouchdb'],
        exports:'GQL',
        init: function(){
          PouchDB.plugin(GQL);
        }
      }
    }
});
// require the unit tests.
require(
    ['bluebird','pouchdb','gql','QUnit','test/pouchdatabasetest'],
    function(Promise,PouchDB,GQL,QUnit, Mytest) {
        PouchDB.debug.enable('*');
        PouchDB.plugin(GQL);
        // run the tests.
        //dummyTest.run();
        Mytest.main.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
