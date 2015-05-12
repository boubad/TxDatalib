//etudiantmodel.ts
//
import {UserInfo} from '../userinfo';
import {PersonViewModel} from './personmodel';
import {Etudiant} from '../../domain/etudiant';
import {EtudiantPerson} from '../../domain/etudperson';
import {InfoRoot} from '../../utils/inforoot';
import {EMPTY_STRING} from '../../utils/infoconstants';
//
export class Etudiants extends PersonViewModel<Etudiant, EtudiantPerson> {
    constructor(userinfo?: UserInfo) {
        super(userinfo);
        this.title = 'Etudiants';
    }// constructor
    protected create_person(): EtudiantPerson {
        let p = new EtudiantPerson();
        return p;
    }
    protected create_item(): Etudiant {
        let p = new Etudiant({ departementid: this.departementid });
        return p;
    }
    public get dossier(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.dossier : EMPTY_STRING;
    }
    public set dossier(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.dossier = s;
        }
    }
    public get sexe(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.sexe : EMPTY_STRING;
    }
    public set sexe(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.sexe = s;
        }
    }
    public get birthDate(): string {
        let x = this.currentPerson;
        return (x !== null) ? InfoRoot.date_to_string(x.birthDate) : null;
    }
    public set birthDate(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.birthDate = InfoRoot.string_to_date(s);
        }
    }
    public get ville(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.ville : EMPTY_STRING;
    }
    public set ville(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.ville = s;
        }
    }
    public get etablissement(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.etablissement : EMPTY_STRING;
    }
    public set etablissement(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etablissement = s;
        }
    }
    public get serieBac(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.serieBac : EMPTY_STRING;
    }
    public set serieBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.serieBac = s;
        }
    }
    public get optionBac(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.optionBac : EMPTY_STRING;
    }
    public set optionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.optionBac = s;
        }
    }
    public get mentionBac(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.mentionBac : EMPTY_STRING;
    }
    public set mentionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.mentionBac = s;
        }
    }
    public get etudesSuperieures(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.etudesSuperieures : EMPTY_STRING;
    }
    public set etudesSuperieures(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etudesSuperieures = s;
        }
    }
}// class Etudiants
