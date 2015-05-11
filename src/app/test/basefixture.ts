//basefixture.ts
//
import {DataService} from "../data/services/dataService";
import {Person} from "../data/domain/person";
import {Departement} from "../data/domain/departement";
import {Groupe} from "../data/domain/groupe";
import {Unite} from "../data/domain/unite";
import {Annee} from "../data/domain/annee";
import {Semestre} from "../data/domain/semestre";
import {Matiere} from "../data/domain/matiere";
import {EtudiantPerson} from "../data/domain/etudperson";
import {Administrator} from "../data/domain/administrator";
import {Etudiant} from "../data/domain/etudiant";
import {Enseignant} from "../data/domain/enseignant";
import {EtudAffectation} from "../data/domain/etudaffectation";
import {ProfAffectation} from "../data/domain/profaffectation";
import {GroupeEvent} from "../data/domain/groupeevent";
import {EtudEvent} from "../data/domain/etudevent";
import {InfoRoot} from '../data/utils/inforoot';
import {SUPER_USERNAME} from '../data/utils/infoconstants';
import {IDataService, IPerson, IDepartement, IGroupe, IUnite, IAnnee, IMatiere, ISemestre,
IEnseignant, IEtudiant, IAdministrator,
IEtudAffectation, IProfAffectation, IGroupeEvent, IEtudEvent} from 'infodata';
//
export class BaseTestFixture {
    //
    private base: IDataService = null;
    private admin: IPerson = null;
    private dep: IDepartement = null;
    private groupe: IGroupe = null;
    private unite: IUnite = null;
    private annee: IAnnee = null;
    private semestre: ISemestre = null;
    private matiere: IMatiere = null;
    private administrator: IAdministrator = null;
    private enseignant: IEnseignant = null;
    private etudiant: IEtudiant = null;
    private profaffectation: IProfAffectation = null;
    private etudaffectation: IEtudAffectation = null;
    private groupeevent: IGroupeEvent = null;
    private etudevent: IEtudEvent = null;
    //
    constructor() {
        this.base = new DataService();
    } // constructor
    public get dataService(): IDataService {
        if (this.base === null) {
            this.base = new DataService();
        }
        return this.base;
    }
    public get_etudevent(): Promise<IEtudEvent> {
        if (this.etudevent !== null) {
            return Promise.resolve(this.etudevent);
        }
        let self = this;
        let service = this.dataService;
        let evt: IGroupeEvent = null;
        let aff: IEtudAffectation = null;
        return this.get_groupeevent().then((x1: IGroupeEvent) => {
            evt = x1;
            return self.get_etudaffectation();
        }).then((x2: IEtudAffectation) => {
            aff = x2;
            let model = new EtudEvent({
                groupeeventid: evt.id,
                eventDate: evt.eventDate,
                note: 15,
                groupeid: evt.groupeid,
                semestreid: evt.semestreid,
                departementid: evt.departementid,
                anneeid: evt.anneeid,
                personid: aff.personid,
                firstname: aff.firstname,
                lastname: aff.lastname,
                genre: 'ABS'
            });
            return service.check_item(model);
        }).then((rz: IEtudEvent) => {
            self.etudevent = rz;
            return self.etudevent;
        });
    }// get_etudevent
    public get_groupeevent(): Promise<IGroupeEvent> {
        if (this.groupeevent !== null) {
            return Promise.resolve(this.groupeevent);
        }
        let self = this;
        let service = this.dataService;
        let aff: IProfAffectation = null;
        return this.get_profaffectation().then((x1: IProfAffectation) => {
            aff = x1;
            let model = new GroupeEvent({
                profaffectationid: aff.id,
                departementid: aff.departementid,
                semestreid: aff.semestreid,
                anneeid: aff.anneeid,
                unitid: aff.uniteid,
                matiereid: aff.matiereid,
                groupeid: aff.groupeid,
                personid: aff.personid,
                firstname: aff.firstname,
                lastname: aff.lastname,
                genre: 'TP',
                name: 'Test Name',
                eventDate: aff.startDate,
                location: 'test location',
                coefficient: 1.5
            });
            return service.check_item(model);
        }).then((rz: IGroupeEvent) => {
            self.groupeevent = rz;
            return self.groupeevent;
        });
    }// get_etudaffectation
    public get_etudaffectation(): Promise<IEtudAffectation> {
        if (this.etudaffectation !== null) {
            return Promise.resolve(this.etudaffectation);
        }
        let self = this;
        let service = this.dataService;
        let etud: IEtudiant = null;
        let grp: IGroupe = null;
        let sem: ISemestre = null;

        return this.get_etudiant().then((x1: IEtudiant) => {
            etud = x1;
            return self.get_groupe();
        }).then((x3: IGroupe) => {
            grp = x3;
            return self.get_semestre();
        }).then((x4: ISemestre) => {
            sem = x4;
            let model = new EtudAffectation({
                departementid: etud.departementid,
                anneeid: sem.anneeid,
                semestreid: sem.id,
                groupeid: grp.id,
                personid: etud.personid,
                etudiantid: etud.id,
                firstname: etud.firstname,
                lastname: etud.lastname,
                startDate: sem.startDate,
                endDate: sem.endDate
            });
            return service.check_item(model);
        }).then((rz: IEtudAffectation) => {
            self.etudaffectation = rz;
            return self.etudaffectation;
        });
    }// get_etudaffectation
    public get_profaffectation(): Promise<IProfAffectation> {
        if (this.profaffectation !== null) {
            return Promise.resolve(this.profaffectation);
        }
        let self = this;
        let service = this.dataService;
        let prof: IEnseignant = null;
        let mat: IMatiere = null;
        let grp: IGroupe = null;
        let sem: ISemestre = null;
        let pp: Promise<any>[] = [];

        return this.get_enseignant().then((x1: IEnseignant) => {
            prof = x1;
            return self.get_matiere();
        }).then((x2: IMatiere) => {
            mat = x2;
            return self.get_groupe();
        }).then((x3: IGroupe) => {
            grp = x3;
            return self.get_semestre();
        }).then((x4: ISemestre) => {
            sem = x4;
            let model = new ProfAffectation({
                departementid: prof.departementid,
                uniteid: mat.uniteid,
                matiereid: mat.id,
                anneeid: sem.anneeid,
                semestreid: sem.id,
                groupeid: grp.id,
                personid: prof.personid,
                enseignantid: prof.id,
                firstname: prof.firstname,
                lastname: prof.lastname,
                genre: 'TP',
                startDate: sem.startDate,
                endDate: sem.endDate
            });
            return service.check_item(model);
        }).then((rz: IProfAffectation) => {
            self.profaffectation = rz;
            return self.profaffectation;
        });
    }// get_profaffectation
    public get_etudiant(): Promise<IEtudiant> {
        if (this.etudiant !== null) {
            return Promise.resolve(this.etudiant);
        }
        let self = this;
        let service = this.dataService;
        let pPers: IPerson = null;
        let model: IEtudiant = null;
        let dep: IDepartement = null;
        return this.get_departement().then((xdep) => {
            dep = xdep;
            pPers = new EtudiantPerson({
                username: 'testetud',
                firstname: 'TestEtudFirstName',
                lastname: 'TestEtudLastName',
                sexe: 'MASCULIN',
                birthDate: InfoRoot.string_to_date('1995-05-08'),
                ville: 'ROUEN',
                etablissement: 'lycée Corneille',
                serieBac: 'S',
                optionBac: 'SVT',
                mentionBac: 'Bien',
                etudesSuperieures: 'MPH1',
                dossier: 'EZ54321',
                departementids:[dep.id]
            });
            pPers.reset_password();
            return service.check_item(pPers);
        }).then((xPers: IPerson) => {
            pPers = xPers;
            model = new Etudiant({
                departementid: dep.id,
                personid: pPers.id,
                firstname: pPers.firstname,
                lastname: pPers.lastname
            });
            model.update_person(pPers);
            return service.check_item(pPers);
        }).then((px: IPerson) => {
            pPers = px;
            return service.check_item(model);
        }).then((rz: IEtudiant) => {
            self.etudiant = rz;
            return self.etudiant;
        });
    }// get_etudiant
    public get_enseignant(): Promise<IEnseignant> {
        if (this.enseignant !== null) {
            return Promise.resolve(this.enseignant);
        }
        let self = this;
        let service = this.dataService;
        let pPers: IPerson = null;
        let model: IEnseignant = null;
        let dep: IDepartement = null;
        return this.get_departement().then((xdep) => {
            dep = xdep;
            pPers = new Person({
                username: 'testprof',
                firstname: 'TestProfFirstName',
                lastname: 'TestProfLastName',
                roles: ['prof'],
                departementids:[dep.id]
            });
            pPers.reset_password();
            return service.check_item(pPers);
        }).then((xPers: IPerson) => {
            pPers = xPers;
            model = new Enseignant({
                departementid: dep.id,
                personid: pPers.id,
                firstname: pPers.firstname,
                lastname: pPers.lastname
            });
            model.update_person(pPers);
            return service.check_item(pPers);
        }).then((px: IPerson) => {
            pPers = px;
            return service.check_item(model);
        }).then((rz: IEnseignant) => {
            self.enseignant = rz;
            return self.enseignant;
        });
    }// get_enseignant
    public get_administrator(): Promise<IAdministrator> {
        if (this.administrator !== null) {
            return Promise.resolve(this.administrator);
        }
        let self = this;
        let service = this.dataService;
        let pPers: IPerson = null;
        let model: IAdministrator = null;
        let dep: IDepartement = null;
        return this.get_departement().then((pdep) => {
            dep = pdep;
            pPers = new Person({
                username: 'testadmin',
                firstname: 'TestAdminFirstName',
                lastname: 'TestAdminLastName',
                roles: ['admin'],
                departementids:[dep.id]
            });
            pPers.reset_password();
            return service.check_item(pPers);
        }).then((xPers: IPerson) => {
            pPers = xPers;
            model = new Administrator({
                departementid: dep.id,
                personid: pPers.id,
                firstname: pPers.firstname,
                lastname: pPers.lastname
            });
            model.update_person(pPers);
            return service.check_item(pPers);
        }).then((px: IPerson) => {
            pPers = px;
            return service.check_item(model);
        }).then((rz: IAdministrator) => {
            self.administrator = rz;
            return self.administrator;
        });
    }// get_administrator
    public get_matiere(): Promise<IMatiere> {
        if (this.matiere !== null) {
            return Promise.resolve(this.matiere);
        }
        let self = this;
        let service = this.dataService;
        return this.get_unite().then((pan) => {
            let model = new Matiere({
                departementid: pan.departementid,
                uniteid: pan.id,
                sigle: 'testmatiere',
                name: 'testmatiere',
                coefficient: 2.5,
                ecs: 100,
                genre: 'PRATIQUE',
                mat_module: 'EZ2AZT'
            });
            return service.check_item(model);
        }).then((g: IMatiere) => {
            self.matiere = g;
            return self.matiere;
        });
    }
    public get_semestre(): Promise<ISemestre> {
        if (this.semestre !== null) {
            return Promise.resolve(this.semestre);
        }
        let self = this;
        let service = this.dataService;
        return this.get_annee().then((pan) => {
            let model = new Semestre({
                departementid: pan.departementid,
                anneeid: pan.id,
                sigle: 'testsemestre',
                name: 'testsemestre'
            });
            model.startDate = InfoRoot.string_to_date('2014-09-01');
            model.endDate = InfoRoot.string_to_date('2015-01-20');
            return service.check_item(model);
        }).then((g: ISemestre) => {
            self.semestre = g;
            return self.semestre;
        });
    }
    public get_annee(): Promise<IAnnee> {
        if (this.annee !== null) {
            return Promise.resolve(this.annee);
        }
        let self = this;
        let service = this.dataService;
        return this.get_departement().then((pdep) => {
            let model = new Annee({
                departementid: pdep.id,
                sigle: 'testannee',
                name: 'testannee'
            });
            model.startDate = InfoRoot.string_to_date('2014-09-01');
            model.endDate = InfoRoot.string_to_date('2015-06-30');
            return service.check_item(model);
        }).then((g: IAnnee) => {
            self.annee = g;
            return self.annee;
        });
    }
    public get_unite(): Promise<IUnite> {
        if (this.unite !== null) {
            return Promise.resolve(this.unite);
        }
        let self = this;
        let service = this.dataService;
        return this.get_departement().then((pdep) => {
            let model = new Unite({
                departementid: pdep.id,
                sigle: 'testunite',
                name: 'testunite'
            });
            return service.check_item(model);
        }).then((g: IUnite) => {
            self.unite = g;
            return self.unite;
        });
    }
    public get_groupe(): Promise<IGroupe> {
        if (this.groupe !== null) {
            return Promise.resolve(this.groupe);
        }
        let self = this;
        let service = this.dataService;
        return this.get_departement().then((pdep) => {
            let model = new Groupe({
                departementid: pdep.id,
                sigle: 'testgroupe',
                name: 'testgroupe'
            });
            return service.check_item(model);
        }).then((g: IGroupe) => {
            self.groupe = g;
            return self.groupe;
        });
    }
    public get_departement(): Promise<IDepartement> {
        if (this.dep !== null) {
            return Promise.resolve(this.dep);
        }
        let model = new Departement({ sigle: 'testdep', name: 'testdep' });
        let self = this;
        return this.dataService.check_item(model).then((p: IDepartement) => {
            self.dep = p;
            return self.dep;
        });
    }
    //
    public get_admin_person(): Promise<IPerson> {
        if (this.admin !== null) {
            return Promise.resolve(this.admin);
        }
        let pPers = new Person({ username: SUPER_USERNAME });
        let id = pPers.create_id();
        return this.dataService.find_item_by_id(id).then((p: IPerson) => {
            return p;
        });
    }
    //
    public run(): void {

    }// run
}// class BaseTestFixture
