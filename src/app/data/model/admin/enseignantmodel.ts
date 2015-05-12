//enseignantmodel.ts
//
import {UserInfo} from '../userinfo';
import {PersonViewModel} from './personmodel';
import {Enseignant} from '../../domain/enseignant';
import {Person} from '../../domain/person';
//
export class EnseignantModel extends PersonViewModel<Enseignant, Person> {
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Enseignants';
    }// constructor
    protected create_person(): Person {
        let p = new Person({ roles: ['prof'] });
        return p;
    }
    protected create_item(): Enseignant {
        let p = new Enseignant({ departementid: this.departementid });
        return p;
    }
}// class EnseignantModel

