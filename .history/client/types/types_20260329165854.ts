export interface UserTypes {
    _id: string
    status:string
    location:string,
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
    lot?:{
    _id: string
    name: string
    lotNumber: string
  }
}

export interface MessageType  {
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
    to:{
      name:string,
      avatar:string
    },
    from:{
      name:string,
      avatar:string
    },
    lot:{
      name: string
      images: string[]
      lotNumber: string
    },
    comment:string,
    rating:number,
    createdAt: Date
}

export interface LotTypes {
    _id:string,
    category:string,
    subCategory:string,
    subSubCategory:string
    name:string,
    author: {
      _id: string
      name: string
      avatar: string
      rating: number
    }
    lotNumber:string,
    startPrice:number,
    stepPrice:number,
    blitzPrice?:number,
    reservPrice?:number,
    historyBid?: {
  author: string
  currentBid: number
  _id: string
  createdAt: Date
}[]
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