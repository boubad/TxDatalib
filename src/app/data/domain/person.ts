//person.ts
//
import {BaseItem} from './baseitem';
import {MyCrypto} from './mycrypto';
import {IPerson} from 'infodata';
import {InfoRoot} from '../utils/inforoot';
import {PERSON_KEY, PERSON_PREFIX} from '../utils/infoconstants';
//
//
var cc = new MyCrypto();
//
export class Person extends BaseItem implements IPerson {
    private _user: string = null;
    private _pass: string = null;
    private _first: string = null;
    private _last: string = null;
    private _email: string = null;
    private _phone: string = null;
    private _roles: string[] = null;
    private _deps: string[] = null;
    private _annees: string[] = null;
    private _semestres: string[] = null;
    private _matieres: string[] = null;
    private _unites: string[] = null;
    private _groupes: string[] = null;
    public _enseignants: string[] = null;
    public _etudiants: string[] = null;
    public _affectations: string[] = null;
    public _events: string[] = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        this._user = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantids !== undefined) {
                this.enseignantids = oMap.enseignantids;
            }
            if (oMap.etudiantids !== undefined) {
                this.etudiantids = oMap.etudiantids;
            }
            if (oMap.affectationids !== undefined) {
                this.affectationids = oMap.affectationids;
            }
            if (oMap.eventids !== undefined) {
                this.eventids = oMap.eventids;
            }
            if (oMap.username !== undefined) {
                this.username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this.password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this.email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this.phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this.departementids = oMap.departementids;
            } //
            if (oMap.roles !== undefined) {
                this.roles = oMap.roles;
            } //
            if (oMap.anneeids !== undefined) {
                this.anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this.semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this.uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this.matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this.groupeids = oMap.groupeids;
            } //
        } // oMap
    } // constructor
    //
    public base_prefix(): string {
        return PERSON_PREFIX;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.username !== null)) {
            s = s + '-' + this.username;
        }
        return s;
    }// create_id
    //
    public get enseignantids(): string[] {
        return InfoRoot.check_array(this._enseignants);
    }
    public set enseignantids(s: string[]) {
        this._enseignants = InfoRoot.check_array(s);
    }
    public get etudiantids(): string[] {
        return InfoRoot.check_array(this._etudiants);
    }
    public set etudiantids(s: string[]) {
        this._etudiants = InfoRoot.check_array(s);
    }
    public get affectationids(): string[] {
        return InfoRoot.check_array(this._affectations);
    }
    public set affectationids(s: string[]) {
        this._affectations = InfoRoot.check_array(s);
    }
    public get eventids(): string[] {
        return InfoRoot.check_array(this._events);
    }
    public set eventids(s: string[]) {
        this._events = InfoRoot.check_array(s);
    }
    //
    public get departementids(): string[] {
        return InfoRoot.check_array(this._deps);
    }
    public set departementids(s: string[]) {
        this._deps = InfoRoot.check_array(s);
    }
    //
    public get groupeids(): string[] {
        return InfoRoot.check_array(this._groupes);
    }
    public set groupeids(s: string[]) {
        this._groupes = InfoRoot.check_array(s);
    }
    //
    public get anneeids(): string[] {
        return InfoRoot.check_array(this._annees);
    }
    public set anneeids(s: string[]) {
        this._annees = InfoRoot.check_array(s);
    }
    //
    public get semestreids(): string[] {
        return InfoRoot.check_array(this._semestres);
    }
    public set semestreids(s: string[]) {
        this._semestres = InfoRoot.check_array(s);
    }
    //
    public get uniteids(): string[] {
        return InfoRoot.check_array(this._unites);
    }
    public set uniteids(s: string[]) {
        this._unites = InfoRoot.check_array(s);
    }
    //
    public get matiereids(): string[] {
        return InfoRoot.check_array(this._matieres);
    }
    public set matiereids(s: string[]) {
        this._matieres = InfoRoot.check_array(s);
    }
    //
    public get roles(): string[] {
        return InfoRoot.check_array(this._roles);
    }
    public set roles(s: string[]) {
        this._roles = InfoRoot.check_array(s);
    }
    //
    public reset_password(): void {
        if (this.username !== null) {
            this.password = cc.md5(this.username);
        } else {
            this.password = null;
        }
    }
    public change_password(ct: string): void {
        if ((ct === undefined) || (ct === null)) {
            this.password = null;
        } else {
            var v = null;
            var x = ct.trim();
            if (x.length > 0) {
                v = cc.md5(ct);
            }
            this.password = v;
        }
    }
    public check_password(ct: string): boolean {
        if ((ct === undefined) || (ct === null)) {
            if (this.password === null) {
                return true;
            } else {
                return false;
            }
        }
        var v = cc.md5(ct);
        return (this.password == v);
    } // check_password
    //
    public type(): string {
        return PERSON_KEY;
    }
    public get username(): string {
        return this._user;
    }
    public set username(s: string) {
        this._user = InfoRoot.check_lower_string(s);
    }
    //
    public get lastname(): string {
        return this._last;
    }
    public set lastname(s: string) {
        this._last = InfoRoot.check_upper_string(s);
    }
    //
    public get firstname(): string {
        return this._first;
    }
    public set firstname(s: string) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            var ss = s.trim();
            var n = ss.length;
            if (n > 1) {
                this._first =
                ss.substr(0, 1).toUpperCase() + ss.substr(1, n - 1).toLowerCase();
            } else {
                this._first = ss.toUpperCase();
            }
        } else {
            this._first = null;
        }
    }
    //
    public get fullname(): string {
        let s = null;
        if (this.lastname !== null) {
            s = this.lastname;
        }
        if (this.firstname !== null) {
            if (s !== null) {
                s = s + ' ' + this.firstname;
            } else {
                s = this.firstname;
            }
        }
        return s;
    } // fullname
    //
    public get password(): string {
        return this._pass;
    }
    public set password(s: string) {
        if (s !== undefined) {
            this._pass = s;
        } else {
            this._pass = null;
        }
    }
    //
    public get email(): string {
        return this._email;
    }
    public set email(s: string) {
        this._email = InfoRoot.check_string(s);
    }

    public get phone(): string {
        return this._phone;
    }
    public set phone(s: string) {
        this._phone = InfoRoot.check_string(s);
    }
    //
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.username !== null) {
            oMap.username = this.username;
        }
        if (this.password !== null) {
            oMap.password = this.password;
        }
        if (this.firstname !== null) {
            oMap.firstname = this.firstname;
        }
        if (this.lastname !== null) {
            oMap.lastname = this.lastname;
        }
        if (this.email !== null) {
            oMap.email = this.email;
        }
        if (this.phone !== null) {
            oMap.phone = this.phone;
        }
        if (this.roles.length > 0) {
            oMap.roles = this.roles;
        }
        if (this.departementids.length > 0) {
            oMap.departementids = this.departementids;
        }
        if (this.uniteids.length > 0) {
            oMap.uniteids = this.uniteids;
        }
        if (this.matiereids.length > 0) {
            oMap.matiereids = this.matiereids;
        }
        if (this.anneeids.length > 0) {
            oMap.anneeids = this.anneeids;
        }
        if (this.semestreids.length > 0) {
            oMap.semestreids = this.semestreids;
        }
        if (this.groupeids.length > 0) {
            oMap.groupeids = this.groupeids;
        }
        if (this.enseignantids.length > 0) {
            oMap.enseignantids = this.enseignantids;
        }
        if (this.etudiantids.length > 0) {
            oMap.etudiantids = this.etudiantids;
        }
        if (this.affectationids.length > 0) {
            oMap.affectationids = this.affectationids;
        }
        if (this.eventids.length > 0) {
            oMap.eventids = this.eventids;
        }
    } // to_insert_map
    public toString(): string {
        return this.fullname;
    }
    public is_storeable(): boolean {
        return super.is_storeable() &&
            (this.username !== null) && (this.firstname !== null) &&
            (this.lastname !== null) &&
            (this.roles.length > 0);
    }
    public has_role(r: string): boolean {
        let bRet = false;
        if ((r !== undefined) && (r !== null) && (this.roles.length > 0)) {
            let ss = r.trim().toLowerCase();
            for (let r of this.roles) {
                let x = r.trim().toLowerCase();
                if (ss == x) {
                    bRet = true;
                    break;
                }
            }
        }
        return bRet;
    } // hasrole_
    public get is_admin(): boolean {
        return (this.has_role('super') || this.has_role('admin'));
    }
    public get is_super(): boolean {
        return this.has_role('super');
    }
    public get is_prof(): boolean {
        return this.has_role('prof') && (this.enseignantids !== null) &&
            (this.enseignantids.length > 0);
    }
    public get is_etud(): boolean {
        return this.has_role('etud') && (this.etudiantids !== null) &&
            (this.etudiantids.length > 0);
    }
    public sort_func(p1: IPerson, p2: IPerson): number {
        let s1 = p1.fullname;
        let s2 = p2.fullname;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
} // class Person
