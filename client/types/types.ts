export interface UserTypes {
    _id: string
    ip:string
    status:string
    location:string,
    email:string,
    name: string
    avatar: string
    rating:number,
    balance:string
    role: string,
    UnblockDate:Date,
}

export interface BlogTypes {
  _id:string, 
  images:string, 
  slug:string,
  author: {
    avatar:string,
    name:string
  }
  title:string,
  descriptions:string, 
  createdAt:Date
}

export interface Templates {
  _id:string,
  subject:string,
  html:string
}

export interface ViolationsTypes {
  _id:string
  user:{
    avatar:string,
    UnblockDate:Date,
    name:string
    status:string
    _id:string
    ip:string
  }
  lot: {
    images:string[],
    name:string,
    lotNumber:string
  }
  repeated:number
  violations:string
  createdAt:Date
}

export interface TransactionTypes {
    _id: string
    lot: {
      _id:string
      author:string
      images: string[]
      name: string
      lotNumber: string
    },
    status: string
    user: {
      name: string
      avatar: string
      _id:string
    },
    sum: number,
    type: 'Charge' | 'Deposit',
    createdAt: string,
}

export interface NotificationTypes {
    _id:string,
    to:string,
    from:string,
    notification:string,
    createdAt: Date,
    lot?:{
    _id: string
    name: string
    lotNumber: string
    createdAt:Date
  }
}

export interface MessageType  {
  _id: string
  message: string
  createdAt: string
  from: {
    _id: string
    avatar: string
    name: string
  }
  to: string
  status: string
}

export interface ChatTypes {
  _id: string;
  users: UserTypes[]
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
    from: {
      _id:string,
      avatar:string,
      name:string
    }
    to: string;
    message: string;
    read: boolean;
    status:string
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
      email:string
      rating: number
    }
    lotNumber:string,
    startPrice:number,
    stepPrice:number,
    blitzPrice?:number,
    reservPrice?:number,
    historyBid: []
    images: string[],
    autoReExtension?:boolean,
    descriptions:string,
    favoritesCount:number,
    views:string[]
    state:string,
    status:string,
    date: Date,
    dateTime:string,
    location:string,
    delivary:string,
    Advertising?:boolean,
    createdAt:Date
}