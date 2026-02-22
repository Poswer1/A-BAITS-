import { model, ObjectId, Schema, Types} from "mongoose";

interface HistoryBid {
  author: Types.ObjectId;
  currentBid: number;
  createdAt?: Date; 
}

export interface Lot {
  name: string;
  author:Types.ObjectId,
  lotNumber:string,
  category:string;
  subCategory:string;
  subSubCategory?:string
  startPrice: number;
  stepPrice: number;
  blitzPrice?: number;
  reservPrice?: number;
  images: string[];
  autoReExtension: boolean;
  descriptions: string;
  state: string;
  date: number;
  dateTime: string;
  location: string;
  status: string;
  delivary: string;
  Advertising: boolean;
  historyBid: HistoryBid[]
}

const HistoryBidSchema = new Schema<HistoryBid>({
  author: { type: Types.ObjectId, ref: 'User', required: true }, //ref говорит Mongoose, к какой коллекции относится этот ObjectId 
  currentBid: { type: Number, required: true }
},
{timestamps: true,}
);

const LotSchema = new Schema<Lot>({
  name: { type: String, required: true },
  author: {type: Types.ObjectId, ref: 'User', required: true},  //ref говорит Mongoose, к какой коллекции относится этот ObjectId 
  lotNumber: {type: String, required: true},
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  subSubCategory: { type: String, default: null},
  startPrice: { type: Number, required: true },
  stepPrice: { type: Number, required: true },
  blitzPrice: { type: Number },
  reservPrice: { type: Number },
  images: { type: [String], required: true },
  autoReExtension: { type: Boolean, default: false },
  descriptions: { type: String, required: true },
  state: { type: String, required: true },
  status: { type: String, default: 'active' },
  date: { type: Number, required: true },
  dateTime: { type: String, default: '21:00' },
  location: { type: String, required: true },
  delivary: { type: String, required: true },
  historyBid: { type: [HistoryBidSchema], default: [] },
  Advertising: { type: Boolean, default: false },
},
{timestamps: true,}
);

export const LotModel = model<Lot>("Lot", LotSchema);
