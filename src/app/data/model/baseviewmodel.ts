//baseviewmodel.ts
//
import {UserInfo} from './userinfo';
import {IBaseItem, IDataService, IPerson} from 'infodata';
import {DataService} from '../services/dataservice';
import {InfoRoot} from '../utils/inforoot';
import {DATABASE_NAME, EMPTY_STRING} from '../utils/infoconstants';
//
export class BaseViewModel {
    //
    private _userinfo: UserInfo = null;
    //
    public title: string = EMPTY_STRING;
    public errorMessage: string = EMPTY_STRING;
    public infoMessage: string = EMPTY_STRING;
    //
    constructor(userinfo?: UserInfo) {
    }// constructor
    public get userInfo(): UserInfo {
        if (this._userinfo === null) {
            this._userinfo = new UserInfo();
        }
        return this._userinfo;
    }
    public get dataService(): IDataService {
        return this.userInfo.dataService;
    }
    public get person(): IPerson {
        return this.userInfo.person;
    }
    public get isConnected(): boolean {
        let x = this.person;
        return (x !== null) && (x.id !== null);
    }// isConnected
    public set isConnected(s: boolean) {
    }
    public get isNotConnected(): boolean {
        return (!this.isConnected);
    }
    public set isNotConnected(s: boolean) {
    }
    public get personid(): string {
        return this.userInfo.personid;
    }
    public get fullname(): string {
        return this.userInfo.fullname;
    }
    public get photoUrl(): string {
        return this.userInfo.url;
    }
    public get hasPhoto(): boolean {
        let x = this.photoUrl;
        return (x !== null);
    }
    public set hasPhoto(s: boolean) { }
    public get isSuper(): boolean {
        return this.userInfo.is_super;
    }
    public set isSuper(b: boolean) { }
    public get isAdmin(): boolean {
        return this.userInfo.is_admin;
    }
    public set isAdmin(b: boolean) { }
    public get isProf(): boolean {
        return this.userInfo.is_prof;
    }
    public set isProf(b: boolean) { }
    public get isEtud(): boolean {
        return this.userInfo.is_etud;
    }
    public set isEtud(b: boolean) { }
    //
    public activate(params?: any, config?: any, instruction?: any): any {
        return Promise.resolve(true);
    }// activate
    protected update_title(): any {
    } // update_title
    public get hasErrorMessage(): boolean {
        return (this.errorMessage !== null) && (this.errorMessage.trim().length > 0);
    }
    public set hasErrorMessage(b: boolean) {
    }
    public get hasInfoMessage(): boolean {
        return (this.infoMessage !== null) && (this.infoMessage.trim().length > 0);
    }
    public set hasInfoMessage(b: boolean) {
    }
    public clear_error(): void {
        this.errorMessage = EMPTY_STRING;
        this.infoMessage = EMPTY_STRING;
    }
    public set_error(err: any): void {
        if ((err !== undefined) && (err !== null)) {
            if ((err.message !== undefined) && (err.message !== null)) {
                this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
            } else if ((err.msg !== undefined) && (err.msg !== null)) {
                this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
            } else if ((err.reason !== undefined) && (err.reason !== null)) {
                this.errorMessage = err.reason;
            } else {
                this.errorMessage = JSON.stringify(err);
            }
        } else {
            this.errorMessage = 'Erreur inconnue...';
        }
    } // set_error
    protected retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
        if (item.url !== null) {
            InfoRoot.revokeUrl(item.url);
            item.url = null;
        }
        let id = item.avatardocid();
        let avatarid = item.avatarid;
        if ((id === null) || (avatarid === null)) {
            return Promise.resolve(item);
        }
        return this.dataService.find_attachment(id, avatarid).then((blob) => {
            item.url = InfoRoot.createUrl(blob);
            return item;
        });
    }// rerieve_one_avatar
    protected retrieve_avatars(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            return Promise.resolve([]);
        }
        if (items.length < 1) {
            return Promise.resolve([]);
        }
        let pp: Promise<IBaseItem>[] = [];
        for (let p of items) {
            let x = this.retrieve_one_avatar(p);
            pp.push(x);
        }// p
        return Promise.all(pp);
    }// retrive_avatars
    public disconnect(): any {
        if (InfoRoot.confirm('Voulez-vous vraiment quitter?')) {
            this.person = null;
        }
    }// disconnect
}// class BaseViewModel