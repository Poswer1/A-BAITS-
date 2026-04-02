import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    token: string;
    role: string;
  };
}