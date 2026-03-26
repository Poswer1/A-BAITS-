import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    async getAllUser () {
        return [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
    ];
    }
}