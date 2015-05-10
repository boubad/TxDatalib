//pouchdatabase.ts
//
/// <reference path='../../../../../typings/bluebird/bluebird.d.ts' />
/// <reference path='../../../../../typings/pouchdb/pouchdb.d.ts' />
/// <reference path='../../../../../typings/infodata/infodata.d.ts' />
//
import * as Promise from 'bluebird';
import PouchDB = require('pouchdb');
import {DATABASE_NAME} from '../../utils/infoconstants';
import {IBaseItem} from 'infodata';
//
//declare var PouchDB: any;
//
export class PouchDatabase {
    //
    private _db: PouchDB = null;
    //
    constructor() { }
    //
    public get db(): Promise<PouchDB> {
        console.log('PouchDatabase db 0');
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
        let xdb = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
        });
    }// maintains_attachment
    public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
        let xdb = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            return xdb.removeAttachment(p._id, attachmentId, p._rev);
        });
    }// maintains_attachment
}// class PouchDatabase
//
