define(["require", "exports", 'QUnit', "../data/services/pouchdb/pouchdatabase", "../data/domain/person"], function (require, exports, QUnit, pouchdatabase_1, person_1) {
    var PouchDatabaseTest = (function () {
        function PouchDatabaseTest() {
            this.base = new pouchdatabase_1.PouchDatabase();
        }
        PouchDatabaseTest.prototype.run = function () {
            var _this = this;
            QUnit.test("PouchDatabase online", function (assert) {
                var done = assert.async();
                _this.base.isOnline().then(function (b) {
                    assert.ok(b, 'Database is online');
                    done();
                }).catch(function (err) {
                    assert.ok(false, err.toString());
                    done();
                });
            });
            QUnit.test("PouchDatabase checkAdmin", function (assert) {
                var done = assert.async();
                _this.base.check_admin().then(function (b) {
                    assert.ok(true, 'check_admin OK');
                    done();
                }).catch(function (err) {
                    assert.ok(false, err.toString());
                    done();
                });
            });
            QUnit.test("PouchDatabase get all persons", function (assert) {
                var done = assert.async();
                var model = new person_1.Person();
                _this.base.get_all_items(model).then(function (pp) {
                    assert.ok(pp !== undefined, 'result is not undefined');
                    assert.ok(pp !== null, 'result is not null');
                    for (var _i = 0; _i < pp.length; _i++) {
                        var p = pp[_i];
                        console.log(p.toString());
                    }
                    done();
                }).catch(function (err) {
                    assert.ok(false, err.toString());
                    done();
                });
            });
        };
        return PouchDatabaseTest;
    })();
    exports.main = new PouchDatabaseTest();
});
