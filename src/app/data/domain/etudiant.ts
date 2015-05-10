//etudiant.ts
//
import {DepartementPerson} from './depperson';
import {IPerson, IEtudiant} from 'infodata';
import {InfoRoot} from '../utils/inforoot';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX, ROLE_ETUD} from '../utils/infoconstants';
//
export class Etudiant extends DepartementPerson implements IEtudiant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return  ETUDIANT_TYPE;
    }
    public base_prefix(): string {
        return ETUDIANT_PREFIX;
    }
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont: string[] = pPers.etudiantids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.etudiantids = cont;
            if (!pPers.has_role(ROLE_ETUD)){
              pPers.roles = [ROLE_ETUD];
            }
        }// pPers
    }// update_person
}// class Etudiant
