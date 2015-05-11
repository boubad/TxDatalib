//pouchdatabasetest.ts
/// <reference path="../../../typings/qunit/qunit.d.ts" />
//
import * as  QUnit  from 'QUnit';
import {BaseTestFixture} from './basefixture';
//
import {IDataService, IPerson, IDepartement, IGroupe, IUnite, IAnnee, IMatiere, ISemestre,
IEnseignant, IEtudiant, IAdministrator,
IEtudAffectation, IProfAffectation, IGroupeEvent, IEtudEvent} from 'infodata';
//
class PouchDatabaseTest extends BaseTestFixture {
    //
    constructor() {
        super();
    } // constructor
    public test_getetudevent(): void {
        QUnit.test("PouchDatabaseTest get_etudevent", (assert) => {
            var done = assert.async();
            this.get_etudevent().then((p: IEtudEvent) => {
                assert.ok((p !== undefined) && (p !== null), 'Get etudevent : ' + p.text);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getetudevent
     public test_getgroupeevent(): void {
        QUnit.test("PouchDatabaseTest get_groupeevent", (assert) => {
            var done = assert.async();
            this.get_groupeevent().then((p: IGroupeEvent) => {
                assert.ok((p !== undefined) && (p !== null), 'Get groupeevent : ' + p.text);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getgroupeevent
    public test_getetudaffectation(): void {
        QUnit.test("PouchDatabaseTest get_etudaffectation", (assert) => {
            var done = assert.async();
            this.get_etudaffectation().then((p: IEtudAffectation) => {
                assert.ok((p !== undefined) && (p !== null), 'Get etudaffectation : ' + p.text);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getprofaffectation
    public test_getprofaffectation(): void {
        QUnit.test("PouchDatabaseTest get_profaffectation", (assert) => {
            var done = assert.async();
            this.get_profaffectation().then((p: IProfAffectation) => {
                assert.ok((p !== undefined) && (p !== null), 'Get profaffectation : ' + p.text);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getprofaffectation
    public test_getetudiant(): void {
        QUnit.test("PouchDatabaseTest get_etudiant", (assert) => {
            var done = assert.async();
            this.get_etudiant().then((p: IEtudiant) => {
                assert.ok((p !== undefined) && (p !== null), 'Get enseignant : ' + p.fullname);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getetudiant
    public test_getenseignant(): void {
        QUnit.test("PouchDatabaseTest get_enseignant", (assert) => {
            var done = assert.async();
            this.get_enseignant().then((p: IEnseignant) => {
                assert.ok((p !== undefined) && (p !== null), 'Get enseignant : ' + p.fullname);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getenseignant
    //
    public test_getadministrator(): void {
        QUnit.test("PouchDatabaseTest get_administrator", (assert) => {
            var done = assert.async();
            this.get_administrator().then((p: IAdministrator) => {
                assert.ok((p !== undefined) && (p !== null), 'Get administrator : ' + p.fullname);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getadministrator
    public test_getdepartement(): void {
        QUnit.test("PouchDatabaseTest get_departement", (assert) => {
            var done = assert.async();
            this.get_departement().then((p: IDepartement) => {
                assert.ok((p !== undefined) && (p !== null), 'Get departement : ' + p.sigle);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getdepartement
    public test_getgroupe(): void {
        QUnit.test("PouchDatabaseTest get_groupe", (assert) => {
            var done = assert.async();
            this.get_groupe().then((p: IGroupe) => {
                assert.ok((p !== undefined) && (p !== null), 'Get groupe : ' + p.sigle);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getgroupe
    public test_getunite(): void {
        QUnit.test("PouchDatabaseTest get_unite", (assert) => {
            var done = assert.async();
            this.get_unite().then((p: IUnite) => {
                assert.ok((p !== undefined) && (p !== null), 'Get unite : ' + p.sigle);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getunite
    public test_getannee(): void {
        QUnit.test("PouchDatabaseTest get_annee", (assert) => {
            var done = assert.async();
            this.get_annee().then((p: IAnnee) => {
                assert.ok((p !== undefined) && (p !== null), 'Get annee : ' + p.sigle);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getannee
    public test_getsemestre(): void {
        QUnit.test("PouchDatabaseTest get_semestre", (assert) => {
            var done = assert.async();
            this.get_semestre().then((p: ISemestre) => {
                assert.ok((p !== undefined) && (p !== null), 'Get semestre : ' + p.sigle);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getsemestre
    public test_getmatiere(): void {
        QUnit.test("PouchDatabaseTest get_matiere", (assert) => {
            var done = assert.async();
            this.get_matiere().then((p: IMatiere) => {
                assert.ok((p !== undefined) && (p !== null), 'Get matiere : ' + p.sigle);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_getmatiere
    //
    public test_online(): void {
        QUnit.test("PouchDatabase online", (assert) => {
            var done = assert.async();
            this.dataService.isOnline().then((b: boolean) => {
                assert.ok(b, 'Database is online');
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    } // test_online
    public test_checkadmin(): void {
        QUnit.test("PouchDatabase checkAdmin", (assert) => {
            var done = assert.async();
            this.dataService.check_admin().then((b) => {
                assert.ok(true, 'check_admin OK');
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    }
    //
    public test_finditembyid(): void {
        QUnit.test("PouchDatabase find_person_by_username", (assert) => {
            var done = assert.async();
            this.get_admin_person().then((p) => {
                assert.ok((p !== undefined) && (p !== null));
                assert.ok(p.id !== null);
                done();
            }).catch((err) => {
                assert.ok(false, (err) ? err.toString() : 'Exception');
                done();
            });
        });
    }
    //
    public run(): void {
        this.test_online();
        this.test_checkadmin();
        this.test_finditembyid();
        this.test_getdepartement();
        this.test_getgroupe();
        this.test_getunite();
        this.test_getannee();
        this.test_getsemestre();
        this.test_getmatiere();
        this.test_getadministrator();
        this.test_getenseignant();
        this.test_getetudiant();
        this.test_getprofaffectation();
        this.test_getetudaffectation();
        this.test_getgroupeevent();
        this.test_getetudevent();
    }// run
}// class PouchDatabaseTest
export var main = new PouchDatabaseTest();
