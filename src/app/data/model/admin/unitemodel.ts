//unitemodel.ts
//
import {UserInfo} from '../userinfo';
import { DepChildViewModel} from './depchildmodel';
import {Unite} from '../../domain/unite';
//
export class UniteModel extends DepChildViewModel<Unite> {
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Unités';
    }// constructor
    protected create_item(): Unite {
        let p = new Unite({ departementid: this.departementid });
        return p;
    }
}// class UniteModel

