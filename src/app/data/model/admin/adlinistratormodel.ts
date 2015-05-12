//administratormodel.ts
//
import {UserInfo} from '../userinfo';
import {PersonViewModel} from './personmodel';
import {Administrator} from '../../domain/administrator';
import {Person} from '../../domain/person';
//
export class AdministratorModel extends PersonViewModel<Administrator, Person> {
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Opérateurs';
    }// constructor
    protected create_person(): Person {
        let p = new Person({ roles: ['admin'] });
        return p;
    }
    protected create_item(): Administrator {
        let p = new Administrator({ departementid: this.departementid });
        return p;
    }
}// class AdministratorModel

