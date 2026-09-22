import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UserModel } from "src/models/user.model";

@Injectable()
export class cronBlocked {
    @Cron('*/1 * * * *')
    async checkBlocked() {
        try {
            const nowDate = new Date()
            const result = await UserModel.updateMany(
                {
                    status: 'Temporary',
                    UnblockDate: { $lte: nowDate }
                },
                {
                    $set: {
                        status: 'No restrictions',
                        UnblockDate: null
                    }
                }
            )
             if (result.modifiedCount === 0) {
                console.log('Нет пользователей для разблокировки')
                return
            }
            console.log(`Разблокировано пользователей: ${result.modifiedCount}`)
        } catch (error) {
            throw error
        }
    }
}