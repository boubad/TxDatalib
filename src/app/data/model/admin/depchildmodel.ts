//depchildmodel.ts
//
import {UserInfo} from '../userinfo';
import {InfoRoot} from '../../utils/inforoot';
import {SigleNameViewModel} from './siglenamemodel';
import {IDepSigleNameItem} from 'infodata';
//
export class DepChildViewModel<T extends IDepSigleNameItem> extends SigleNameViewModel<T> {
    //
    constructor(userinfo?: UserInfo) {
        super(userinfo);
    }// constructor
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.refreshAll();
        });
    }// post_change_departement
    protected is_refresh(): boolean {
        return (this.modelItem.departementid !== null);
    }
}// class DepChildViewModel
