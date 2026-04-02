import { Injectable } from "@nestjs/common";
import { LotModel } from "src/models/lot.model";

@Injectable()
export class LotsService {
    async getLotsBySearch(search:string) {
        const allLots = await LotModel.find(
            {
                name:search.toLowerCase() // $options игнор регистра $regex как includes
            }
        )
        return allLots
    }
}