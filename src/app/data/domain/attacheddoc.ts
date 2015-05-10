//attacheddoc.ts
/// <reference path="../../../../typings/infodata/infodata.d.ts"/>
//
//
import {IAttachedDoc} from 'infodata';
import {InfoRoot} from '../utils/inforoot';
//
export class AttachedDoc implements IAttachedDoc {
    //
    private _id: string = null;
    private _name: string = null;
    private _mime_type: string = null;
    private _data: Blob = null;
    private _description: string = null;
    private _keywords: string[] = null;
    //
    constructor(oMap?: any) {

    }// constructor
    public get id(): string {
        return this._id;
    }
    public set id(s: string) {
        this._id = InfoRoot.check_string(s);
    }
    public get name(): string {
        return this._name;
    }
    public set name(s: string) {
        this._name =InfoRoot.check_string(s);
    }
    public get mime_type(): string {
        return this._mime_type;
    }
    public set mime_type(s: string) {
        this._mime_type = InfoRoot.check_string(s);
    }
    public get data(): Blob {
        return this._data;
    }
    public set data(s: Blob) {
        this._data = (s !== undefined) ? s : null;
    }
    public get description(): string {
        return this._description;
    }
    public set description(s: string) {
        this._description =InfoRoot.check_string(s);
    }
    public get keywords(): string[] {
        return this._keywords;
    }
    public set keywords(s: string[]) {
        this._keywords = InfoRoot.check_array(s);
    }
    //
    public is_storeable(): boolean {
        return (this.id !== null) && (this.mime_type !== null) && (this.data !== null);
    }// is_storeable
    public toString(): string {
        return (this.name !== null) ? this.name : this.id;
    }
    public get text(): string {
        return this.toString();
    }
    public set text(s: string) { }
    //
}// class AttachedDoc
