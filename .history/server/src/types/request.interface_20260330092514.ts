import { Request } from 'express';

export interface Reques extends Request {
  user: {
    token: string;
    role: string;
  };
}