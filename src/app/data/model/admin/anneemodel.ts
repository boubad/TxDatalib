//anneemodel.ts
//
import {UserInfo} from '../userinfo';
import { IntervalViewModel} from './intervalmodel';
import {Annee} from '../../domain/annee';
//
export class AnneeModel extends IntervalViewModel<Annee> {
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Années';
    }// constructor
    protected create_item(): Annee {
        let p = new Annee({ departementid: this.departementid });
        return p;
    }
}// class AnneeModel

