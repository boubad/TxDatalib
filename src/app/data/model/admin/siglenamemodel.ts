//siglenamemodel.ts
//
//
import {UserInfo} from '../userinfo';
import {BaseEditViewModel} from '../baseeditmodel';
import {EMPTY_STRING} from '../../utils/infoconstants';
import {ISigleNameItem} from 'infodata';
//
export class SigleNameViewModel<T extends ISigleNameItem> extends BaseEditViewModel<T> {
    //
    constructor(userinfo?: UserInfo) {
        super(userinfo);
    }// constructor
    //
     public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.person;
        return (px !== null) && (px.is_super || px.is_admin);
    }// activate
    //
    public get sigle(): string {
        let x = this.currentItem;
        return (x !== null) ? x.sigle : EMPTY_STRING;
    }
    public set sigle(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.sigle = s;
        }
    }
    public get name(): string {
        let x = this.currentItem;
        return (x !== null) ? x.name : EMPTY_STRING;
    }
    public set name(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.name = s;
        }
    }
    public get description(): string {
        let x = this.currentItem;
        return (x !== null) ? x.description : EMPTY_STRING;
    }
    public set description(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.description = s;
        }
    }
}// class BaseEditViewModel
