import { v4 as UUID } from 'uuid';

interface IProps {
    id?: string;
    name: string;
    userId: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
interface IMessageBoardInterface extends IProps {
    createdAt: number;
    updatedAt: number;
}

export default class MessageBoardModel {

    private _id: string;
    private _name: string;
    private _userId: string;
    private _isActive: boolean;
    private _isDeleted: boolean;


    constructor({ id = UUID(), name='',userId,isActive=true, isDeleted=false}: IProps) {
        this._id = id;
        this._name = name;
        this._userId = userId;
        this._isActive = isActive;
        this._isDeleted = isDeleted;
    }

    setId(value: string) {
        this._id = value !== '' ? value : null;
    }

    getId() {
        return this._id;
    }

    setBoardName(value: string) {
        this._name = value !== '' ? value : null;
    }

    getBoardName() {
        return this._name;
    }

    setUserId(value: string) {
        this._userId = value ? value : null;
    }

    getUserId() {
        return this._userId;
    }

    setIsActive(value: boolean) {
        this._isActive = value ? value : null;
    }

    getIsActive() {
        return this._isActive;
    }

    setIsDelete(value: boolean) {
        this._isDeleted = value ? value : null;
    }

    getIsDeleted() {
        return this._isDeleted;
    }

    getEntityMappings(): IMessageBoardInterface {
        return {
            id: this.getId(),
            name: this.getBoardName(),
            userId: this.getUserId(),
            isActive: this.getIsActive(),
            isDeleted: this.getIsDeleted(),
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
    }

}
