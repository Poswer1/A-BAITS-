export interface UserTypes {
    id: string
    name: string
    avatar: string
    balance:string
    role: string
}

export interface NotificationTypes {
    _id:string,
    to:string,
    from:string,
    notification:string,
    lot?:string
}

export interface ReviewTypes {
    _id:string,
    
}

export interface LotTypes {
    _id:string,
    name:string,
    author:string,
    lotNumber:string,
    startPrice:number,
    stepPrice:number,
    blitzPrice?:number,
    reservPrice?:number,
    images: string[],
    autoReExtension?:boolean,
    descriptions:string,
    state:string,
    status:string,
    date: Date,
    dateTime:string,
    location:string,
    delivary:string,
    Advertising?:boolean,
    createdAt:Date
}