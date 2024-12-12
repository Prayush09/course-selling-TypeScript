import {Request} from 'express';

declare namespace Express{
        interface Request{
            userId?: string;
        }
    }