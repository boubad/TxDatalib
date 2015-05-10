//userinfo.ts
//
import {Person} from '../domain/person';
import {EtudiantPerson} from '../domain/etudperson';
import {IPerson, IDepartement, IAnnee, ISemestre, IUnite, IMatiere, IGroupe,IDataService} from 'infodata';
import {InfoRoot} from '../utils/inforoot';
import {DATABASE_NAME,
PERSON_KEY, DEPARTEMENTID_KEY, ANNEEID_KEY, SEMESTREID_KEY, UNITEID_KEY, MATIEREID_KEY,
GROUPEID_KEY, ETUDIANTID_KEY, ENSEIGNANTID_KEY,
ETUDIANTPERSON_KEY} from '../utils/infoconstants';
import {DataService} from '../services/dataservice';
//
export class UserInfo {
    //
    private _pers: IPerson = null;
    private _service: IDataService = null;
    //
    private _deps: IDepartement[] = null;
    private _annees: IAnnee[] = null;
    private _semestres: ISemestre[] = null;
    private _unites: IUnite[] = null;
    private _matieres: IMatiere[] = null;
    private _groupes: IGroupe[] = null;
    //
    constructor(service?: IDataService) {
      if ((service !== undefined) && (service !== null)){
        this._service = service;
      }
    }// constructor
    public get dataService(): IDataService {
        if (this._service === null) {
            this._service = new DataService(DATABASE_NAME);
        }
        return this._service;
    }
    //
    public get departementid(): string {
        return InfoRoot.sessionStore_get(DEPARTEMENTID_KEY);
    }
    public set departementid(s: string) {
        let id = InfoRoot.check_string(s);
        this._annees = null;
        this._unites = null;
        this._groupes = null;
        InfoRoot.sessionStore_remove(ANNEEID_KEY);
        InfoRoot.sessionStore_remove(UNITEID_KEY);
        InfoRoot.sessionStore_remove(GROUPEID_KEY);
        InfoRoot.sessionStore_set(DEPARTEMENTID_KEY, id);
    }
    public get anneeid(): string {
        return InfoRoot.sessionStore_get(ANNEEID_KEY);
    }
    public set anneeid(s: string) {
        let id = InfoRoot.check_string(s);
        this._semestres = null;
        InfoRoot.sessionStore_set(ANNEEID_KEY, id);
        InfoRoot.sessionStore_remove(SEMESTREID_KEY);
    }
    public get uniteid(): string {
        return InfoRoot.sessionStore_get(UNITEID_KEY);
    }
    public set uniteid(s: string) {
        let id = InfoRoot.check_string(s);
        this._matieres = null;
        InfoRoot.sessionStore_remove(MATIEREID_KEY);
        InfoRoot.sessionStore_set(UNITEID_KEY, id);
    }
    public get semestreid(): string {
        return InfoRoot.sessionStore_get(SEMESTREID_KEY);
    }
    public set semestreid(s: string) {
        InfoRoot.sessionStore_set(SEMESTREID_KEY, s);
    }
    public get matiereid(): string {
        return InfoRoot.sessionStore_get(MATIEREID_KEY);
    }
    public set matiereid(s: string) {
        InfoRoot.sessionStore_set(MATIEREID_KEY, s);
    }
    public get groupeid(): string {
        return InfoRoot.sessionStore_get(GROUPEID_KEY);
    }
    public set groupeid(s: string) {
        let id = InfoRoot.check_string(s);
        InfoRoot.sessionStore_set(GROUPEID_KEY, id);
    }
    public get enseignantid(): string {
        return InfoRoot.sessionStore_get(ENSEIGNANTID_KEY);
    }
    public set enseignantid(s: string) {
        let id = InfoRoot.check_string(s);
        InfoRoot.sessionStore_set(ENSEIGNANTID_KEY, id);
    }
    public get etudiantid(): string {
        return InfoRoot.sessionStore_get(ETUDIANTID_KEY);
    }
    public set etudiantid(s: string) {
        let id = InfoRoot.check_string(s);
        InfoRoot.sessionStore_set(ETUDIANTID_KEY, id);
    }
    public get departements(): Promise<IDepartement[]> {
        if (this._deps !== null) {
            return Promise.resolve(this._deps);
        }
        this._deps = [];
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(this._deps);
        }
        let self = this;
        if (pPers.is_super) {
            return this.dataService.get_all_departements().then((dd) => {
                self._deps = InfoRoot.check_array(dd);
                return self._deps;
            });
        } else {
            let cont: string[] = pPers.departementids;
            if (cont === null) {
                return Promise.resolve(this._deps);
            } else {
                return this.dataService.find_items_array(cont).then((dd: IDepartement[]) => {
                    self._deps = InfoRoot.check_array(dd);
                    return self._deps;
                });
            }
        }
    }// get departements
    public get annees(): Promise<IAnnee[]> {
        if (this._annees !== null) {
            return Promise.resolve(this._annees);
        }
        this._annees = [];
        let depid = this.departementid;
        if (depid === null) {
            return Promise.resolve(this._annees);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(this._annees);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.get_departement_annees(depid).then((dd) => {
                self._annees = InfoRoot.check_array(dd);
                return self._annees;
            });
        } else {
            let cont: string[] = pPers.anneeids;
            if (cont === null) {
                return Promise.resolve(this._annees);
            } else {
                return this.dataService.find_items_array(cont).then((dd: IAnnee[]) => {
                    let oRet: IAnnee[] = [];
                    for (let x of dd) {
                        if (x.departementid == depid) {
                            oRet.push(x);
                        }
                    }// x
                    self._annees = oRet;
                    return self._annees;
                });
            }
        }
    }// get annees
    public get unites(): Promise<IUnite[]> {
        if (this._unites !== null) {
            return Promise.resolve(this._unites);
        }
        this._unites = [];
        let depid = this.departementid;
        if (depid === null) {
            return Promise.resolve(this._unites);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(this._unites);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.get_departement_unites(depid).then((dd) => {
                self._unites = InfoRoot.check_array(dd);
                return self._unites;
            });
        } else {
            let cont: string[] = pPers.uniteids;
            if (cont === null) {
                return Promise.resolve(this._unites);
            } else {
                return this.dataService.find_items_array(cont).then((dd: IUnite[]) => {
                    let oRet: IUnite[] = [];
                    for (let x of dd) {
                        if (x.departementid == depid) {
                            oRet.push(x);
                        }
                    }// x
                    self._unites = oRet;
                    return self._unites;
                });
            }
        }
    }// get unites
    public get semestres(): Promise<ISemestre[]> {
        if (this._semestres !== null) {
            return Promise.resolve(this._semestres);
        }
        this._semestres = [];
        let anneeid = this.anneeid;
        if (anneeid === null) {
            return Promise.resolve(this._semestres);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(this._semestres);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.get_annee_semestres(anneeid).then((dd) => {
                self._semestres = InfoRoot.check_array(dd);
                return self._semestres;
            });
        } else {
            let cont: string[] = pPers.semestreids;
            if (cont === null) {
                return Promise.resolve(this._semestres);
            } else {
                return this.dataService.find_items_array(cont).then((dd: ISemestre[]) => {
                    let oRet: ISemestre[] = [];
                    for (let x of dd) {
                        if (x.anneeid == anneeid) {
                            oRet.push(x);
                        }
                    }// x
                    self._semestres = oRet;
                    return self._semestres;
                });
            }
        }
    }// get semestres
    public get matieres(): Promise<IMatiere[]> {
        if (this._matieres !== null) {
            return Promise.resolve(this._matieres);
        }
        this._matieres = [];
        let uniteid = this.uniteid;
        if (uniteid === null) {
            return Promise.resolve(this._matieres);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(this._matieres);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.get_unite_matieres(uniteid).then((dd) => {
                self._matieres = InfoRoot.check_array(dd);
                return self._matieres;
            });
        } else {
            let cont: string[] = pPers.matiereids;
            if (cont === null) {
                return Promise.resolve(this._matieres);
            } else {
                return this.dataService.find_items_array(cont).then((dd: IMatiere[]) => {
                    let oRet: IMatiere[] = [];
                    for (let x of dd) {
                        if (x.uniteid == uniteid) {
                            oRet.push(x);
                        }
                    }// x
                    self._matieres = oRet;
                    return self._matieres;
                });
            }
        }
    }// get matieres
    public get groupes(): Promise<IGroupe[]> {
        if (this._groupes !== null) {
            return Promise.resolve(this._groupes);
        }
        this._groupes = [];
        let depid = this.departementid;
        if (depid === null) {
            return Promise.resolve(this._groupes);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            return Promise.resolve(this._groupes);
        }
        let self = this;
        if (pPers.is_admin) {
            return this.dataService.get_departement_groupes(depid).then((dd) => {
                self._groupes = InfoRoot.check_array(dd);
                return self._groupes;
            });
        } else {
            let cont: string[] = pPers.groupeids;
            if (cont === null) {
                return Promise.resolve(this._groupes);
            } else {
                return this.dataService.find_items_array(cont).then((dd: IGroupe[]) => {
                    let oRet: IGroupe[] = [];
                    for (let x of dd) {
                        if (x.departementid == depid) {
                            oRet.push(x);
                        }
                    }// x
                    self._groupes = oRet;
                    return self._groupes;
                });
            }
        }
    }// get groupes
    public get person(): IPerson {
        if ((this._pers !== null) && (this._pers.id !== null)) {
            return this._pers;
        }
        this._pers = null;
        let sval = InfoRoot.sessionStore_get(PERSON_KEY);
        if (sval === null) {
            return null;
        }
        try {
            let oMap: any = JSON.parse(sval);
            if ((oMap !== undefined) && (oMap !== null) && (oMap.type !== undefined) &&
                (oMap.type !== null)) {
                let stype = oMap.type.trim().toLowerCase();
                if (stype == PERSON_KEY) {
                    this._pers = new Person(oMap);
                } else if (stype == ETUDIANTPERSON_KEY) {
                    this._pers = new EtudiantPerson(oMap);
                }
            }// type
        } catch (e) { }
        return this._pers;
    }// get person
    public set person(pPers: IPerson) {
        if ((this._pers !== null) && (this._pers.url !== null)){
          InfoRoot.revokeUrl(this._pers.url);
          this._pers.url = null;
        }
        this._pers = null;
        this._deps = null;
        this._annees = null;
        this._semestres = null;
        this._unites = null;
        this._matieres = null;
        this._groupes = null;
        InfoRoot.sessionStore_remove(ANNEEID_KEY);
        InfoRoot.sessionStore_remove(UNITEID_KEY);
        InfoRoot.sessionStore_remove(MATIEREID_KEY);
        InfoRoot.sessionStore_remove(SEMESTREID_KEY);
        InfoRoot.sessionStore_remove(GROUPEID_KEY);
        InfoRoot.sessionStore_remove(DEPARTEMENTID_KEY);
        InfoRoot.sessionStore_remove(PERSON_KEY);
        if ((pPers !== undefined) && (pPers !== null) && (pPers.id !== null)) {
            pPers.url = null;
            try {
                let oMap: any = {};
                pPers.to_map(oMap);
                let sval = JSON.stringify(oMap);
                InfoRoot.sessionStore_set(PERSON_KEY, sval);
                this._pers = pPers;
                let avatarid = pPers.avatarid;
                if (avatarid !== null){
                  this.dataService.find_attachment(pPers.id,avatarid).then((blob)=>{
                    pPers.url = InfoRoot.createUrl(blob);
                  });
                }
            } catch (e) { }
        }
    }// set person
    public get is_super(): boolean {
        let x = this.person;
        return (x !== null) && x.is_super;
    }
    public set is_super(b: boolean) { }
    public get is_admin(): boolean {
        let x = this.person;
        return (x !== null) && x.is_admin;
    }
    public set is_admin(b: boolean) { }
    public get is_prof(): boolean {
        let x = this.person;
        return (x !== null) && x.is_prof;
    }
    public set is_prof(b: boolean) { }
    public get is_etud(): boolean {
        let x = this.person;
        return (x !== null) && x.is_etud;
    }
    public set is_etud(b: boolean) { }
    public get url():string{
      return (this.person !== null) ? this.person.url: null;
    }
    public get has_url():boolean{
      return (this.url !== null);
    }
    public set has_url(s:boolean){}
    public get personid():string {
      return (this.person !== null) ? this.personid : null;
    }
    public get fullname():string {
      return (this.person !== null) ? this.person.fullname : null;
    }
    public get is_connected():boolean {
      return (this.personid !== null);
    }
    public set is_connected(s:boolean){}
    public get is_notconnected():boolean {
      return (!this.is_connected);
    }
    public set is_notconnected(s:boolean){}
}// class UserInfo
