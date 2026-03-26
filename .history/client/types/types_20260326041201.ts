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

export type MessageType = {
  _id: string
  message: string
  createdAt: string
  from: string
  to: string
}

export interface ChatTypes {
  _id: string;
  userFrom: string;
  userTo: string;
  type: string;
  lot: {
    _id: string
    name: string
    images: string[]
    author:{ 
      
    }
    lotNumber: string
    startPrice: number
  }
  status: string;
  messages: {
    from: string;
    to: string;
    message: string;
    read: boolean;
    createdAt: string;
  }[];
  reviews: {
    from: string;
    to: string;
  }[];
}

export interface ReviewTypes {
    _id:string,
    to:string,
    from:string,
    lot:string,
    comment:string,
    rating:number,
    createdAt: Date
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