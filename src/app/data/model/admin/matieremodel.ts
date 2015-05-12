//matieremodel.ts
//
import {UserInfo} from '../userinfo';
import { DepChildViewModel} from './depchildmodel';
import {Matiere} from '../../domain/matiere';
import {InfoRoot} from '../../utils/inforoot';
import {EMPTY_STRING} from '../../utils/infoconstants';
//
export class MatiereModel extends DepChildViewModel<Matiere> {
    //
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Matières';
    }// constructor
    protected create_item(): Matiere {
        let p = new Matiere({
            departementid: this.departementid,
            uniteid: this.uniteid
        });
        return p;
    }
    protected is_refresh(): boolean {
        return (this.modelItem.uniteid !== null);
    }
    protected post_change_unite(): Promise<any> {
        let self = this;
        return super.post_change_unite().then((r) => {
            self.modelItem.uniteid = self.uniteid;
            self.modelItem.departementid = this.departementid;
            self.refreshAll();
        });
    }// post_change_departement
    public get genre(): string {
        let x = this.currentItem;
        return (x !== null) ? x.genre : EMPTY_STRING;
    }
    public set genre(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.genre = s;
        }
    }
    public get mat_module(): string {
        let x = this.currentItem;
        return (x !== null) ? x.mat_module : EMPTY_STRING;
    }
    public set mat_module(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.mat_module = s;
        }
    }
    public get coefficient(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.number_to_string(x.coefficient) : null;
    }
    public set coefficient(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            let d = InfoRoot.string_to_number(s);
            x.coefficient = ((d !== null) && (d > 0)) ? d : null;
        }
    }
    public get ecs(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.number_to_string(x.ecs) : null;
    }
    public set ecs(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            let d = InfoRoot.string_to_number(s);
            x.ecs = ((d !== null) && (d > 0)) ? d : null;
        }
    }
}// class Matieres

