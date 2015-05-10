define(["require", "exports", 'QUnit', 'bluebird', '../data/services/pouchdb/pouchdatabase'], function (require, exports, QUnit, Promise, pouchdatabase_1) {
    function test_func() {
        return Promise.resolve('Hello World!');
    }
    var DummyTest = (function () {
        function DummyTest() {
        }
        DummyTest.prototype.run = function () {
            QUnit.test("hello test", function (assert) {
                assert.ok(1 === 1, "Passed!");
            });
            QUnit.test("Promise test", function (assert) {
                var done = assert.async();
                test_func().then(function (r) {
                    assert.ok(true, 'text is ' + r);
                    done();
                }).catch(function (err) {
                    assert.ok(false, err.toString());
                    done();
                });
            });
            QUnit.test("PouchDatabase test", function (assert) {
                var done = assert.async();
                var base = new pouchdatabase_1.PouchDatabase();
                base.db.then(function (xdb) {
                    assert.ok((xdb !== undefined) && (xdb !== null), "db OK!");
                    done();
                }, function (ex) {
                    assert.ok(false, ex.toString());
                    done();
                }).catch(function (err) {
                    assert.ok(false, err.toString());
                    done();
                });
            });
        };
        return DummyTest;
    })();
    exports.main = new DummyTest();
});
