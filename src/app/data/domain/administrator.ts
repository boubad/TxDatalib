//administrator.ts
//
import {DepartementPerson} from './depperson';
import {IPerson, IAdministrator} from 'infodata';
import {ADMINISTRATOR_TYPE, ADMINISTRATOR_PREFIX} from '../utils/infoconstants';
//
export class Administrator extends DepartementPerson implements IAdministrator {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ADMINISTRATOR_TYPE;
    }
    public base_prefix(): string {
        return ADMINISTRATOR_PREFIX;
    }
}// class Enseignant
