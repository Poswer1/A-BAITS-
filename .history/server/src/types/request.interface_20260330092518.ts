import { Request } from 'express';

export interface RequestInterface extends Request {
  user: {
    token: string;
    role: string;
  };
}