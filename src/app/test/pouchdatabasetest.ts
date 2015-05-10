//pouchdatabasetest.ts
/// <reference path="../../../typings/qunit/qunit.d.ts" />
/// <reference path='../../../typings/bluebird/bluebird.d.ts' />
//
import * as  QUnit  from 'QUnit';
import {PouchDatabase} from "../data/services/pouchdb/pouchdatabase";
import {Person} from "../data/domain/person";
import {EtudiantPerson} from "../data/domain/etudperson";
//
class PouchDatabaseTest {
  private base:PouchDatabase = new PouchDatabase();
  constructor(){}
  public run():void {
    QUnit.test("PouchDatabase online", (assert) => {
        var done = assert.async();
        this.base.isOnline().then((b: boolean) => {
            assert.ok(b, 'Database is online');
            done();
        }).catch((err) => {
            assert.ok(false, (err)? err.toString(): 'Exception');
            done();
        });
    });
    //
    QUnit.test("PouchDatabase checkAdmin", (assert) => {
        var done = assert.async();
        this.base.check_admin().then((b) => {
            assert.ok(true, 'check_admin OK');
            done();
        }).catch((err) => {
          assert.ok(false, (err)? err.toString(): 'Exception');
            done();
        });
    });
    //
    QUnit.test("PouchDatabase get all persons", (assert) => {
        var done = assert.async();
        let model = new Person();
        this.base.get_all_items(model).then((pp) => {
            assert.ok(pp !== undefined,'result is not undefined');
            assert.ok(pp !== null,'result is not null');
            for (let p of pp){
              console.log(p.toString());
            }
            done();
        }).catch((err) => {
          assert.ok(false, (err)? err.toString(): 'Exception');
            done();
        });
    });
    //

  }// run
}// class PouchDatabaseTest
export var main = new PouchDatabaseTest();
