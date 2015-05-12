//departementmodel.ts
//

import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {Departement} from '../../domain/departement';
import {InfoRoot} from '../../utils/inforoot';
//
export class DepartementModel extends SigleNameViewModel<Departement> {
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Départements';
    }// constructor
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.person;
        return (px !== null) && (px.is_super || px.is_admin);
    }// activate
    protected create_item(): Departement {
        return new Departement();
    }
    public get canAdd(): boolean {
        if (this.isSuper){
            return (!this.addMode);
        }
        return false;
    }
    public set canAdd(s: boolean) { }
    public refreshAll(): Promise<any> {
        if (this.isSuper){
            return super.refreshAll();
        }
        this.prepare_refresh();
        let self = this;
        this.userInfo.departements.then((dd) => {
            let ii: string[] = [];
            if ((dd !== undefined) && (dd !== null) && (dd.length > 0)) {
                for (let x of dd) {
                    ii.push(x.id);
                }// x
            }// dd
            self.allIds = ii;
            self.pagesCount = (ii.length > 0) ? 1 : 0;
            return true;
        });
    }// refreshAll
    public refresh(): Promise<any> {
        if (this.isSuper){
            return super.refresh();
        }
        this.addMode = false;
        if (this.items.length > 0) {
            for (let elem of this.items) {
                let x = elem.url;
                if (x !== null) {
                    InfoRoot.revokeUrl(x);
                    elem.url = null;
                }
            }// elem
        }
        let self = this;
        this.items = [];
        this.currentItem = null;
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        this.userInfo.departements.then((dd: Departement[]) => {
            self.items = dd;
            let pSel = InfoRoot.sync_array(self.items, oldid);
            self.currentItem = pSel;
            return true;
        });
    }// refresh
}// class DepartementModel