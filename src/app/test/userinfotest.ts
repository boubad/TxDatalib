//userinfotest.ts
//
/// <reference path="../../../typings/qunit/qunit.d.ts" />
//
import * as  QUnit  from 'QUnit';
import {PouchDatabaseTest} from './pouchdatabasetest';
import {UserInfo} from '../data/model/userinfo';
//
import {IDataService, IPerson, IDepartement, IGroupe, IUnite, IAnnee, IMatiere, ISemestre,
IEnseignant, IEtudiant, IAdministrator,
IEtudAffectation, IProfAffectation, IGroupeEvent, IEtudEvent} from 'infodata';
//
export class UserInfoTest extends PouchDatabaseTest {
    //
    private _userinfo: UserInfo = null;
    //
    constructor() {
        super();
    }
    public get userInfo(): UserInfo {
        if (this._userinfo === null) {
            this._userinfo = new UserInfo();
        }
        return this._userinfo;
    }
    //
    public test_userinfo_constructor(): void {
        let self = this;
        QUnit.test("UserInfoTest dataservice", (assert) => {
            let service = self.dataService;
            assert.ok((service !== undefined) && (service !== null), 'got dataService');
        });
    }// test_user_info_constructor
    //
    public test_super_userinfo(): void {
        let self = this;
        let info = this.userInfo;
        QUnit.test("UserInfoTest super user", (assert) => {
            let done = assert.async();
            assert.ok((info !== undefined) && (info !== null));
            self.get_admin_person().then((pPers: IPerson) => {
                assert.ok((pPers !== undefined) && (pPers !== null));
                assert.ok(pPers.is_super);
                info.person = pPers;
                assert.ok(info.person !== null);
                assert.ok(info.personid !== null);
                assert.ok(info.fullname !== null);
                assert.ok(info.is_connected);
                assert.ok(!info.is_notconnected);
                assert.ok(info.is_super);
                assert.ok(info.is_admin);
                assert.ok(!info.is_etud);
                assert.ok(!info.is_prof);
                info.departements.then((dd) => {
                    assert.ok((dd !== undefined) && (dd !== null));
                    assert.ok(dd.length > 0);
                    let d = dd[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.departementid = d.id;
                    assert.ok(info.departementid == d.id);
                    return info.groupes;
                }).then((gg) => {
                    assert.ok((gg !== undefined) && (gg !== null));
                    assert.ok(gg.length > 0);
                    let d = gg[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.groupeid = d.id;
                    assert.ok(info.groupeid == d.id);
                    return info.unites;
                }).then((uu) => {
                    assert.ok((uu !== undefined) && (uu !== null));
                    assert.ok(uu.length > 0);
                    let d = uu[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.uniteid = d.id;
                    assert.ok(info.uniteid == d.id);
                    return info.annees;
                }).then((aa) => {
                    assert.ok((aa !== undefined) && (aa !== null));
                    assert.ok(aa.length > 0);
                    let d = aa[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.anneeid = d.id;
                    assert.ok(info.anneeid == d.id);
                    return info.matieres;
                }).then((mm) => {
                    assert.ok((mm !== undefined) && (mm !== null));
                    assert.ok(mm.length > 0);
                    let d = mm[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.matiereid = d.id;
                    assert.ok(info.matiereid == d.id);
                    return info.semestres;
                }).then((ss) => {
                    assert.ok((ss !== undefined) && (ss !== null));
                    assert.ok(ss.length > 0);
                    let d = ss[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.semestreid = d.id;
                    assert.ok(info.semestreid == d.id);
                    done();
                });
            }).catch((err) => {
                assert.ok(false, (err) ? JSON.stringify(err) : 'Exception');
                done();
            });
        });
    }// test_super_userinfo
    public test_admin_userinfo(): void {
        let self = this;
        let info = this.userInfo;
        QUnit.test("UserInfoTest admin user", (assert) => {
            let done = assert.async();
            assert.ok((info !== undefined) && (info !== null));
            self.get_administrator().then((pp) => {
                assert.ok((pp !== undefined) && (pp !== null));
                assert.ok((pp.personid !== undefined) && (pp.personid !== null));
                let service = info.dataService;
                return service.find_item_by_id(pp.personid);
            }).then((pPers: IPerson) => {
                assert.ok((pPers !== undefined) && (pPers !== null));
                assert.ok(pPers.is_admin);
                info.person = pPers;
                assert.ok(info.person !== null);
                assert.ok(info.personid !== null);
                assert.ok(info.fullname !== null);
                assert.ok(info.is_connected);
                assert.ok(!info.is_notconnected);
                assert.ok(!info.is_super);
                assert.ok(info.is_admin);
                assert.ok(!info.is_etud);
                assert.ok(!info.is_prof);
                info.departements.then((dd) => {
                    assert.ok((dd !== undefined) && (dd !== null));
                    assert.ok(dd.length > 0);
                    let d = dd[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.departementid = d.id;
                    assert.ok(info.departementid == d.id);
                    return info.groupes;
                }).then((gg) => {
                    assert.ok((gg !== undefined) && (gg !== null));
                    assert.ok(gg.length > 0);
                    let d = gg[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.groupeid = d.id;
                    assert.ok(info.groupeid == d.id);
                    return info.unites;
                }).then((uu) => {
                    assert.ok((uu !== undefined) && (uu !== null));
                    assert.ok(uu.length > 0);
                    let d = uu[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.uniteid = d.id;
                    assert.ok(info.uniteid == d.id);
                    return info.annees;
                }).then((aa) => {
                    assert.ok((aa !== undefined) && (aa !== null));
                    assert.ok(aa.length > 0);
                    let d = aa[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.anneeid = d.id;
                    assert.ok(info.anneeid == d.id);
                    return info.matieres;
                }).then((mm) => {
                    assert.ok((mm !== undefined) && (mm !== null));
                    assert.ok(mm.length > 0);
                    let d = mm[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.matiereid = d.id;
                    assert.ok(info.matiereid == d.id);
                    return info.semestres;
                }).then((ss) => {
                    assert.ok((ss !== undefined) && (ss !== null));
                    assert.ok(ss.length > 0);
                    let d = ss[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.semestreid = d.id;
                    assert.ok(info.semestreid == d.id);
                    done();
                });
            }).catch((err) => {
                assert.ok(false, (err) ? JSON.stringify(err) : 'Exception');
                done();
            });
        });
    }// test_admin_userinfo
    public test_prof_userinfo(): void {
        let self = this;
        let info = this.userInfo;
        QUnit.test("UserInfoTest prof user", (assert) => {
            let done = assert.async();
            assert.ok((info !== undefined) && (info !== null));
            self.get_enseignant().then((pp) => {
                assert.ok((pp !== undefined) && (pp !== null));
                assert.ok((pp.personid !== undefined) && (pp.personid !== null));
                let service = info.dataService;
                return service.find_item_by_id(pp.personid);
            }).then((pPers: IPerson) => {
                assert.ok((pPers !== undefined) && (pPers !== null));
                info.person = pPers;
                assert.ok(info.person !== null);
                assert.ok(info.personid !== null);
                assert.ok(info.fullname !== null);
                assert.ok(info.is_connected);
                assert.ok(!info.is_notconnected);
                assert.ok(!info.is_super);
                assert.ok(!info.is_admin);
                assert.ok(!info.is_etud);
                assert.ok(info.is_prof);
                info.departements.then((dd) => {
                    assert.ok((dd !== undefined) && (dd !== null));
                    assert.ok(dd.length > 0);
                    let d = dd[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.departementid = d.id;
                    assert.ok(info.departementid == d.id);
                    return info.groupes;
                }).then((gg) => {
                    assert.ok((gg !== undefined) && (gg !== null));
                    if (gg.length > 0) {
                        let d = gg[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.groupeid = d.id;
                        assert.ok(info.groupeid == d.id);
                    }
                    return info.unites;
                }).then((uu) => {
                    assert.ok((uu !== undefined) && (uu !== null));
                    if (uu.length > 0) {
                        let d = uu[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.uniteid = d.id;
                        assert.ok(info.uniteid == d.id);
                    }
                    return info.annees;
                }).then((aa) => {
                    assert.ok((aa !== undefined) && (aa !== null));
                    if (aa.length > 0) {
                        let d = aa[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.anneeid = d.id;
                        assert.ok(info.anneeid == d.id);
                    }
                    return info.matieres;
                }).then((mm) => {
                    assert.ok((mm !== undefined) && (mm !== null));
                    if (mm.length > 0) {
                        let d = mm[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.matiereid = d.id;
                        assert.ok(info.matiereid == d.id);
                    }
                    return info.semestres;
                }).then((ss) => {
                    assert.ok((ss !== undefined) && (ss !== null));
                    if (ss.length > 0) {
                        let d = ss[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.semestreid = d.id;
                        assert.ok(info.semestreid == d.id);
                    }
                    done();
                });
            }).catch((err) => {
                assert.ok(false, (err) ? JSON.stringify(err) : 'Exception');
                done();
            });
        });
    }// test_prof_userinfo
     public test_etud_userinfo(): void {
        let self = this;
        let info = this.userInfo;
        QUnit.test("UserInfoTest etud user", (assert) => {
            let done = assert.async();
            assert.ok((info !== undefined) && (info !== null));
            self.get_etudiant().then((pp) => {
                assert.ok((pp !== undefined) && (pp !== null));
                assert.ok((pp.personid !== undefined) && (pp.personid !== null));
                let service = info.dataService;
                return service.find_item_by_id(pp.personid);
            }).then((pPers: IPerson) => {
                assert.ok((pPers !== undefined) && (pPers !== null));
                info.person = pPers;
                assert.ok(info.person !== null);
                assert.ok(info.personid !== null);
                assert.ok(info.fullname !== null);
                assert.ok(info.is_connected);
                assert.ok(!info.is_notconnected);
                assert.ok(!info.is_super);
                assert.ok(!info.is_admin);
                assert.ok(info.is_etud);
                assert.ok(!info.is_prof);
                info.departements.then((dd) => {
                    assert.ok((dd !== undefined) && (dd !== null));
                    assert.ok(dd.length > 0);
                    let d = dd[0];
                    assert.ok((d !== undefined) && (d !== null));
                    assert.ok((d.id !== undefined) && (d.id !== null));
                    info.departementid = d.id;
                    assert.ok(info.departementid == d.id);
                    return info.groupes;
                }).then((gg) => {
                    assert.ok((gg !== undefined) && (gg !== null));
                    if (gg.length > 0) {
                        let d = gg[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.groupeid = d.id;
                        assert.ok(info.groupeid == d.id);
                    }
                    return info.unites;
                }).then((uu) => {
                    assert.ok((uu !== undefined) && (uu !== null));
                    if (uu.length > 0) {
                        let d = uu[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.uniteid = d.id;
                        assert.ok(info.uniteid == d.id);
                    }
                    return info.annees;
                }).then((aa) => {
                    assert.ok((aa !== undefined) && (aa !== null));
                    if (aa.length > 0) {
                        let d = aa[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.anneeid = d.id;
                        assert.ok(info.anneeid == d.id);
                    }
                    return info.matieres;
                }).then((mm) => {
                    assert.ok((mm !== undefined) && (mm !== null));
                    if (mm.length > 0) {
                        let d = mm[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.matiereid = d.id;
                        assert.ok(info.matiereid == d.id);
                    }
                    return info.semestres;
                }).then((ss) => {
                    assert.ok((ss !== undefined) && (ss !== null));
                    if (ss.length > 0) {
                        let d = ss[0];
                        assert.ok((d !== undefined) && (d !== null));
                        assert.ok((d.id !== undefined) && (d.id !== null));
                        info.semestreid = d.id;
                        assert.ok(info.semestreid == d.id);
                    }
                    done();
                });
            }).catch((err) => {
                assert.ok(false, (err) ? JSON.stringify(err) : 'Exception');
                done();
            });
        });
    }// test_etud_userinfo
    //
    public run(): void {
        super.run();
        //
        this.test_userinfo_constructor();
        this.test_super_userinfo();
        this.test_admin_userinfo();
        this.test_prof_userinfo();
        this.test_etud_userinfo();
        //
    }// run
}// class UserInfoTest
//
export var main = new UserInfoTest();
