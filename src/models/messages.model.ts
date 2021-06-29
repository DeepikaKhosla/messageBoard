import { v4 as UUID } from 'uuid';

interface IProps {
    id?: string;
    boardId?: string;
    message: string;
    createdBy: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
interface IMessagesInterface extends IProps {
    createdAt: number;
    updatedAt: number;
}

export default class MessagesModel {

    private _id: string;
    private _boardId: string;
    private _message: string;
    private _createdBy: string;
    private _isActive: boolean;
    private _isDeleted: boolean;


    constructor({ id = UUID(), message='',boardId, createdBy,isActive=true, isDeleted=false}: IProps) {
        this._id = id;
        this._message=message;
        this._boardId = boardId;
        this._createdBy = createdBy;
        this._isActive = isActive;
        this._isDeleted = isDeleted;
    }

    setId(value: string) {
        this._id = value !== '' ? value : null;
    }

    getId() {
        return this._id;
    }

    setBoardId(value: string) {
        this._boardId = value !== '' ? value : null;
    }

    getBoardId() {
        return this._boardId;
    }

    setMessage(value: string) {
        this._message = value !== '' ? value : null;
    }

    getMessage() {
        return this._message;
    }

    setCreatedBy(value: string) {
        this._createdBy = value ? value : null;
    }

    getCreatedBy() {
        return this._createdBy;
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

    getEntityMappings(): IMessagesInterface {
        return {
            id: this.getId(),
            boardId: this.getBoardId(),
            createdBy: this.getCreatedBy(),
            message: this.getMessage(),
            isActive: this.getIsActive(),
            isDeleted: this.getIsDeleted(),
            createdAt:new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
    }

}
