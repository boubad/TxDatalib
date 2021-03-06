//etudevent.ts
//
import {WorkItem} from './workitem';
import {IEtudEvent, IPerson} from 'infodata';
import {InfoRoot} from '../utils/inforoot';
import {ETUDEVENT_TYPE, ETUDEVENT_PREFIX} from '../utils/infoconstants';
//
export class EtudEvent extends WorkItem
    implements IEtudEvent {
    private _evtid: string = null;
    private _note: number = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.groupeeventid !== undefined) {
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.note !== undefined) {
                this.note = oMap.note;
            }
        } // oMap
    } // constructor
    public get groupeeventid(): string {
        return this._evtid ;
    }
    public set groupeeventid(s: string) {
        this._evtid = InfoRoot.check_string(s);
    }
    public get note(): number {
        return this._note;
    }
    public set note(s: number) {
        let d = InfoRoot.check_number(s);
        if ((d !== null) && (d >= 0)) {
            this._note = d;
        }
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.groupeeventid !== null) {
            oMap.groupeeventid = this.groupeeventid;
        }
        if (this.note !== null) {
            oMap.note = this.note;
        }
    } // toInsertMap
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont: string[] = pPers.eventids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.eventids = cont;
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.groupeeventid !== null) &&
            (this.genre !== null);
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.groupeeventid !== null)) {
            s = s + '-' + this.groupeeventid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.trim().toUpperCase();
        }
        return s;
    } // create_id
    public type(): string {
        return ETUDEVENT_TYPE;
    }
    public base_prefix(): string {
        return ETUDEVENT_PREFIX;
    }
}// class EtudEvent
