import { model, ObjectId, Schema, Types} from "mongoose";

interface HistoryBid {
  author: Types.ObjectId;
  currentBid: number;
  createdAt?: Date; 
}

interface AutoBid {
  author: Types.ObjectId;
  max: number;
}

export interface Lot {
  name: string;
  author:Types.ObjectId,
  lotNumber:string,
  category:string;
  subCategory?:string;
  subSubCategory?:string
  startPrice: number;
  stepPrice: number;
  blitzPrice?: number;
  images: string[];
  favoritesCount:number,
  views:string[],
  autoReExtension: boolean;
  descriptions: string;
  state: string;
  date: Date;
  dateTime: string;
  location: string;
  status: string;
  delivary: string;
  Advertising: boolean;
  historyBid: HistoryBid[],
  autoBid: AutoBid[],
  winner:Types.ObjectId
}

const AutoBidSchema = new Schema<AutoBid>({
  author: { type: Types.ObjectId, ref: 'User', required: true },
  max: { type: Number, required: true }
})

const HistoryBidSchema = new Schema<HistoryBid>({
  author: { type: Types.ObjectId, ref: 'User', required: true }, //ref говорит Mongoose, к какой коллекции относится этот ObjectId 
  currentBid: { type: Number, required: true }
},
{timestamps: true,}
);

const LotSchema = new Schema<Lot>({
  name: { type: String, required: true },
  author: {type: Types.ObjectId, ref: 'User', required: true},  //ref говорит Mongoose, к какой коллекции относится этот ObjectId 
  lotNumber: {type: String},
  category: { type: String, required: true},
  subCategory: { type: String},
  subSubCategory: { type: String, default: null},
  startPrice: { type: Number, required: true },
  stepPrice: { type: Number, required: true },
  blitzPrice: { type: Number },
  favoritesCount: { type: Number, default: 0 },
  views: { type: [String]},
  images: { type: [String], required: true },
  autoReExtension: { type: Boolean, default: false },
  descriptions: { type: String, required: true },
  state: { type: String, required: true },
  status: { type: String, default: 'Active' },
  date: { type: Date, required: true },
  dateTime: { type: String, default: '21:00' },
  location: { type: String, required: true },
  delivary: { type: String, required: true },
  historyBid: { type: [HistoryBidSchema], default: [] },
  autoBid: {type: [AutoBidSchema], default: []},
  Advertising: { type: Boolean, default: false },
  winner: {type: Types.ObjectId, ref: 'User'},
},
{timestamps: true,}
);

export const LotModel = model<Lot>("Lot", LotSchema);
