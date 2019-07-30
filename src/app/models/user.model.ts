export class User {
    id: number;
    userId?: string;
    name: string; 
    firstName?: string;
    lastName?:string;
    email?: string;
    phone?: number; 
    acquaintance?: string;
    contactType: string;
    dateOfBirth: Date; 
    isActive: boolean;
    photoPath?: string;
}