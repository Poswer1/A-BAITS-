import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import mongoose from "mongoose";

@Injectable()
export class ConnectDB implements OnModuleInit {
    constructor(private configService: ConfigService) {}

    // onModuleInit автоматически вызовется при инициализации модуля
    async onModuleInit() {
        try {
            const uri = this.configService.get<string>('MONGO_URI')
            await mongoose.connect(uri!);
            console.log('✅ MongoDB подключена успешно!');
        } catch (error) {
            console.error('❌ Ошибка подключения к MongoDB:', error);
        }
    }
}