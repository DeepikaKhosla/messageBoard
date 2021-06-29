import { v4 as UUID } from 'uuid';

interface IProps {
    id?: string;
    userFName: string;
    userMName: string;
    userLName: string;
    emailAddress: string
}

interface IUserInterface extends IProps {
    createdAt: number;
}

export default class UserModel {

    private _id: string;
    private _userFName: string;
    private _userMName: string;
    private _userLName: string;
    private _emailAddress: string;

    constructor({ id = UUID(), userFName = '',userMName='',userLName='', emailAddress='' }: IProps) {
        this._id = id;
        this._userFName = userFName;
        this._userMName = userMName;
        this._userLName = userLName;
        this._emailAddress=emailAddress
    }

    setId(value: string) {
        this._id = value !== '' ? value : null;
    }

    getId() {
        return this._id;
    }

    setUserFName(value: string) {
        this._userFName = value !== '' ? value : null;
    }

    getUserFName() {
        return this._userFName;
    }

    setUserLName(value: string) {
        this._userLName = value !== '' ? value : null;
    }

    getUserLName() {
        return this._userLName;
    }

    setUserMName(value: string) {
        this._userMName = value !== '' ? value : null;
    }

    getUserMName() {
        return this._userMName;
    }

    setEmailAddress(value: string) {
        this._emailAddress = value !== '' ? value : null;
    }

    getEmailAddress() {
        
        return this._emailAddress;
    }

    getUserFullName()
    {
        return this._userFName+ ((this._userLName!=null)?(' '+this._userMName +' '):(' '))+this._userLName;
    }

    getEntityMappings(): IUserInterface {
        return {
            id: this.getId(),
            userFName: this.getUserFName(),
            userMName: this.getUserMName(),
            userLName: this.getUserLName(),
            emailAddress: this.getEmailAddress(),
            createdAt: new Date().getTime()
        };

        
    }

}
