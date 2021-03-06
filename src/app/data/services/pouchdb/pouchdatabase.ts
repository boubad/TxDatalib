//pouchdatabase.ts
//
/// <reference path='../../../../../typings/bluebird/bluebird.d.ts' />
/// <reference path='../../../../../typings/pouchdb/pouchdb.d.ts' />
/// <reference path='../../../../../typings/pouchdb/gql.d.ts' />
/// <reference path='../../../../../typings/infodata/infodata.d.ts' />
//
import * as Promise from 'bluebird';

//import {PouchDB,PouchError,PouchUpdateResponse,PouchGetOptions,
//PouchAllDocsOptions}  from 'pouchdb';
import PouchDB = require('pouchdb');
//import GQL = require('gql');

//
import {Person} from '../../domain/person';
import {IBaseItem, IItemFactory, IPerson, IWorkItem,
IProfAffectation, IEtudAffectation, IGroupeEvent, IEtudEvent,
IDatabaseManager} from 'infodata';
import {EtudAffectation} from '../../domain/etudaffectation';
import {EtudEvent} from '../../domain/etudevent';
import {GroupeEvent} from '../../domain/groupeevent';
import {EtudiantPerson} from '../../domain/etudperson';
import {ItemFactory} from '../../domain/itemfactory';
//
import {DATABASE_NAME, PERSON_KEY, SUPER_USERNAME, SUPER_LASTNAME,
SUPER_FIRSTNAME, ROLE_SUPER, ROLE_ADMIN} from '../../utils/infoconstants';
//
//PouchDB.debug.enable('*');
//PouchDB.plugin(GQL);
//declare var PouchDB: any;
//
export class PouchDatabase implements IDatabaseManager {
    //
    private _db: PouchDB = null;
    private _gen: IItemFactory = null;
    //
    constructor() {

    }
    //
    public get itemFactory(): IItemFactory {
        if (this._gen === null) {
            this._gen = new ItemFactory();
        }
        return this._gen;
    }
    //
    public get db(): Promise<PouchDB> {
        if (this._db !== null) {
            return Promise.resolve(this._db);
        }
        let self = this;
        return new Promise((resolve: (r: PouchDB) => Promise<PouchDB>, reject) => {
            try {
                let xx = new PouchDB(DATABASE_NAME, (err: PouchError, xdb: PouchDB) => {
                    if ((err !== undefined) && (err !== null)) {
                        reject(err.reason);
                    } else {
                        self._db = xdb;
                        resolve(self._db);
                    }
                });
            } catch (e) {
                console.log('ERROR: ' + e.toString());
                reject(new Error(e.toString()));
            }

        });
    }// db
    //
    protected maintains_doc(doc: any): Promise<PouchUpdateResponse> {
        if ((doc === undefined) || (doc === null)) {
            throw new Error('Invalid argument');
        }
        if ((doc._id === undefined) || (doc._id === null)) {
            throw new Error('Invalid document _id');
        }
        let xdb: PouchDB = null;
        return this.db.then((dx) => {
            xdb = dx;
            return xdb.get(doc._id, { attachments: true });
        }).then((pOld) => {
            doc._rev = pOld._rev;
            if ((pOld._attachments !== undefined) && (pOld._attachments !== null)) {
                doc._attachments = pOld._attachments;
            }
            return xdb.put(doc);
        }, (ex) => {
                if (ex.status == 404) {
                    return xdb.put(doc);
                } else {
                    throw new Error(ex.reason);
                }
            });
    }// maintains_doc
    public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null)) {
            throw new Error('Invalid argument(s)');
        }
        return this.db.then((xdb) => {
            return xdb.getAttachment(docid, attachmentId);
        }).then((p) => {
            return p;
        }, (err) => {
                if (err.status == 404) {
                    return null;
                } else {
                    throw new Error(err.reason);
                }
            });
    }// find_attachment
    public maintains_attachment(docid: string, attachmentId: string,
        attachmentData: Blob, attachmentType: string): Promise<PouchUpdateResponse> {
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null) || (attachmentData === undefined) ||
            (attachmentData === null) || (attachmentType === undefined) ||
            (attachmentType === null)) {
            throw new Error('Invalid argument(s)');
        }
        let xdb = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
        });
    }// maintains_attachment
    public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
        if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
            (attachmentId === null)) {
            throw new Error('Invalid argument(s)');
        }
        let xdb = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            return xdb.removeAttachment(p._id, attachmentId, p._rev);
        });
    }// maintains_attachment
    public isOnline(): Promise<boolean> {
        let self = this;
        return this.db.then((xdb) => {
            return ((xdb !== undefined) && (xdb !== null));
        });
    }// isOnline
    public check_item(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            throw new Error('Item is null');
        }
        let id = item.id;
        if (id === null) {
            id = item.create_id();
            if (id === null) {
                throw new Error('Item has null id');
            }
            item.id = id;
        }
        if (!item.is_storeable()) {
            throw new Error('Item is not storeable');
        }
        let options: PouchGetOptions = { attachments: true };
        let xdb: PouchDB = null;
        let generator = this.itemFactory;
        return this.db.then((dx) => {
            xdb = dx;
            return xdb.get(id, options);
        }).then((pOld) => {
            return { ok: true, id: pOld._id, rev: pOld._rev };
        }, (ex: PouchError) => {
                if (ex.status != 404) {
                    throw new Error(ex.reason);
                }
                let oMap: any = {};
                item.to_map(oMap);
                return xdb.put(oMap);
            }).then((oz) => {
            return xdb.get(id, options);
        }).then((rz) => {
            return generator.create(rz);
        });
    }// check_item
    public check_admin(): Promise<any> {
        let xdb: PouchDB = null;
        let pPers = new Person({
            username: SUPER_USERNAME,
            firstname: SUPER_FIRSTNAME,
            lastname: SUPER_LASTNAME,
            type: PERSON_KEY,
            roles: [ROLE_SUPER, ROLE_ADMIN]
        }
            );
        pPers.reset_password();
        let id = pPers.create_id();
        pPers.id = id;
        return this.db.then((dx) => {
            xdb = dx;
            return xdb.get(id);
        }).then((pOld) => {
            return { ok: true, id: pOld._id, rev: pOld._rev };
        }, (ex) => {
                if (ex.status != 404) {
                    throw new Error(ex.reason);
                }
                let oMap: any = {};
                pPers.to_map(oMap);
                return xdb.put(oMap);
            });
    }// check_admin
    public find_item_by_id(id: string, bAttach?: boolean): Promise<IBaseItem> {
        if ((id === undefined) || (id === null)) {
            throw new Error('Invalid id');
        }
        let options: PouchGetOptions = {};
        if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)) {
            options.attachments = true;
        }
        let gen = this.itemFactory;
        return this.db.then((dx) => {
            return dx.get(id, options);
        }).then((pOld) => {
            return gen.create(pOld);
        }, (err) => {
                if (err.status == 404) {
                    return null;
                } else {
                    throw new Error(err.reason);
                }
            });
    }//find_item_by_id
    public find_items_array(ids: string[]): Promise<IBaseItem[]> {
        if ((ids === undefined) || (ids === null)) {
            return Promise.resolve([]);
        }
        if (ids.length < 1) {
            return Promise.resolve([]);
        }
        let generator = this.itemFactory;
        let options: PouchAllDocsOptions = { keys: ids, include_docs: true };
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            let bOk = true;
                            if ((r.value !== undefined) && (r.value !== null)) {
                                let val = r.value;
                                if ((val.deleted !== undefined) && (val.deleted !== null)) {
                                    bOk = false;
                                }
                                if ((val.error !== undefined) && (val.error !== null)) {
                                    bOk = false;
                                }
                            }
                            if ((r.doc === undefined) || (r.doc === null)) {
                                bOk = false;
                            }
                            if (bOk) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }
                        }// r
                    }// data
                }// rr
                return oRet;
            });
        });
    }//get_items_array
    public get_items(item: IBaseItem, startKey?: any, endKey?: any): Promise<IBaseItem[]> {
        if ((item === undefined) || (item === null)) {
            throw new Error('Invalid argument.');
        }
        let options: PouchGetOptions = { include_docs: true };
        if ((startKey !== undefined) && (startKey !== null)) {
            options.startkey = startKey;
        } else {
            options.startkey = item.start_key();
        }
        if ((endKey !== undefined) && (endKey !== null)) {
            options.endkey = endKey;
        } else {
            options.endkey = item.end_key();
        }
        let generator = this.itemFactory;
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            if ((r.doc !== undefined) && (r.doc !== null)) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }// val
                        }// r
                    }// data
                }// rr
                if (oRet.length > 1) {
                    let x = oRet[0];
                    let func = x.sort_func;
                    oRet.sort(func);
                }
                return oRet;
            });
        });
    }// get_items
    public get_all_items(item: IBaseItem): Promise<IBaseItem[]> {
        if ((item === undefined) || (item === null)) {
            throw new Error('Invalid argument.');
        }
        let options: PouchGetOptions = {
            include_docs: true, startkey: item.start_key(), endkey: item.end_key()
        };
        let generator = this.itemFactory;
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            if ((r.doc !== undefined) && (r.doc !== null)) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }// val
                        }// r
                    }// data
                }// rr
                if (oRet.length > 1) {
                    let x = oRet[0];
                    let func = x.sort_func;
                    oRet.sort(func);
                }
                return oRet;
            });
        });
    }// get_all_items
    public get_ids(startKey: string, endKey: string): Promise<string[]> {
        if ((startKey === undefined) || (startKey === null) ||
            (endKey === undefined) || (endKey === null)) {
            throw new Error('Invalid argument(s)');
        }
        let options: PouchGetOptions = {
            startkey: startKey, endkey: endKey
        };
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: string[] = [];
                if ((rr !== undefined) && (rr !== null) && (rr.rows !== undefined) &&
                    (rr.rows !== null)) {
                    for (let r of rr.rows) {
                        if (r.id !== undefined) {
                            let id = r.id;
                            oRet.push(id);
                        }
                    }// r
                }
                return oRet;
            });
        });
    }//get_ids
    public remove_all_items(startKey: string, endKey: string): Promise<any> {
        if ((startKey === undefined) || (startKey === null) ||
            (endKey === undefined) || (endKey === null)) {
            throw new Error('Invalid argument(s)');
        }
        let self = this;
        let docs: any[] = [];
        let options: PouchGetOptions = {
            startkey: startKey, endkey: endKey, include_docs: true
        };
        let rdb: PouchDB = null;
        return this.db.then((xdb) => {
            rdb = xdb;
            return rdb.allDocs(options);
        }).then((dd) => {
            for (let x of dd.rows) {
                let d = x.doc;
                docs.push(d);
            }// x
            if (docs.length > 0) {
                return rdb.bulkDocs(docs);
            } else {
                return [];
            }
        });
    }//remove_all_items
    protected internal_maintains_one_item(xdb: PouchDB, item: IBaseItem): Promise<IBaseItem> {
        let oMap: any = {};
        item.to_map(oMap);
        if ((item.id === undefined) || (item.id === null)) {
            oMap._id = item.create_id();
        }
        let id = oMap._id;
        let generator = this.itemFactory;
        return xdb.get(id, { attachments: true }).then((p) => {
            oMap._rev = p._rev;
            if ((p._attachments !== undefined) && (p._attachments !== null)) {
                oMap._attachments = p._attachments;
            }
            return xdb.put(oMap);
        }, (err) => {
                if (err.status != 404) {
                    throw new Error(err.reason);
                }
                return xdb.put(oMap);
            }).then((z) => {
            return xdb.get(id, { attachments: true });
        }).then((pk) => {
            return generator.create(pk);
        });
    }// maintains_one_item
    public maintains_item(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            throw new Error('Invalid argument.');
        }
        if (!item.is_storeable()) {
            throw new Error('Not storeable item.');
        }
        let generator = this.itemFactory;
        let xdb: PouchDB = null;
        let oMap: any = {};
        let id: string = null;
        return this.db.then((rdb) => {
            xdb = rdb;
            item.to_map(oMap);
            if ((item.id === undefined) || (item.id === null)) {
                oMap._id = item.create_id();
            }
            id = oMap._id;
            return xdb.get(id, { attachments: true });
        }).then((p) => {
            oMap._rev = p._rev;
            if ((p._attachments !== undefined) && (p._attachments !== null)) {
                oMap._attachments = p._attachments;
            }
            return xdb.put(oMap);
        }, (err) => {
                if (err.status != 404) {
                    throw new Error(err.reason);
                }
                return xdb.put(oMap);
            }).then((z) => {
            return xdb.get(id, { attachments: true });
        }).then((pk) => {
            return generator.create(pk);
        });
    }// maintains_one_item
    public maintains_items(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            throw new Error('Invalid argument(s)');
        }
        let self = this;
        return this.db.then((xdb) => {
            let pp = [];
            for (let item of items) {
                var p = self.internal_maintains_one_item(xdb, item);
                pp.push(p);
            }// item
            return Promise.all(pp);
        });
    }// maintains_items
    public remove_item(item: IBaseItem): Promise<PouchUpdateResponse> {
        if ((item === undefined) || (item === null)) {
            throw new Error('Invalid argument(s)');
        }
        let id = item.id;
        if (id === null) {
            throw new Error('Invalid argument(s)');
        }
        let xdb: PouchDB = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(id);
        }).then((p) => {
            return xdb.remove(p);
        });
    }// remove_one_item
    public maintains_workitem(item: IWorkItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            throw new Error('Invalid argument(s)');
        }
        if ((item.personid === undefined) || (item.personid === null)) {
            return this.maintains_item(item);
        }
        let pid = item.personid;
        let self = this;
        return this.find_item_by_id(pid).then((pPers: IPerson) => {
            if (pPers === null) {
                throw new Error('unknown person.');
            }
            if (item.id === null) {
                item.id = item.create_id();
            }
            item.update_person(pPers);
            return self.maintains_item(pPers);
        }).then((x) => {
            return self.maintains_item(item);
        });
    }// maintains_workitem
}// class PouchDatabase
//
