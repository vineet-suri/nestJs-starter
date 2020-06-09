export interface UserDTO {
    id: number;
    oid: string;
    firstName: string;
    middleName?: string;
    lastName?: string;
    username: string;
    email: string;
    phone: string;
    sendPush: boolean;
    sendSms: boolean;
    sendEmail: boolean;
}
