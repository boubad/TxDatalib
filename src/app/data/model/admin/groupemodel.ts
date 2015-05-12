//groupemodel.ts
//
import {UserInfo} from '../userinfo';
import { DepChildViewModel} from './depchildmodel';
import {Groupe} from '../../domain/groupe';
//
export class GroupeModel extends DepChildViewModel<Groupe> {
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Groupes';
    }// constructor
    protected create_item(): Groupe {
        let p = new Groupe({ departementid: this.departementid });
        return p;
    }
}// class GroupeModel

