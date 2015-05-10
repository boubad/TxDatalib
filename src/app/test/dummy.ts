//dummy.ts
/// <reference path="../../../typings/qunit/qunit.d.ts" />
/// <reference path='../../../typings/bluebird/bluebird.d.ts' />
//
import * as  QUnit  from 'QUnit';
import * as Promise from 'bluebird';
import {PouchDatabase} from '../data/services/pouchdb/pouchdatabase';
//
function test_func(): Promise<string> {
    return Promise.resolve('Hello World!');
}
//
class DummyTest {
    constructor() { }
    public run(): void {
        QUnit.test("hello test", (assert) => {
            assert.ok(1 === 1, "Passed!");
        });
        //
        QUnit.test("Promise test", (assert) => {
            var done = assert.async();
            test_func().then((r: string) => {
                assert.ok(true, 'text is ' + r);
                done();
            }).catch((err) => {
                assert.ok(false, err.toString());
                done();
            });
        });
        //
        QUnit.test("PouchDatabase test", (assert) => {
            var done = assert.async();
            let base = new PouchDatabase();
            base.db.then((xdb) => {
                assert.ok((xdb !== undefined) && (xdb !== null), "db OK!");
                done();
            },(ex)=>{
                assert.ok(false, ex.toString());
                done();
                }).catch((err) => {
                assert.ok(false, err.toString());
                done();
            });
        });
    }// run
}// class DummyTest
export var main = new DummyTest();
