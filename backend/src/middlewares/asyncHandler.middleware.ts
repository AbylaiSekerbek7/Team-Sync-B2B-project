import { NextFunction, Request, Response } from "express";

// TypeScript type. It defines the expected structer of a controller function.
type AsyncControllerType = (req: Request, res: Response, next: NextFunction) => Promise<any>;
// return Promise because async functions always return Promises.

// It's higher-order function, meaning: it takes a function and returns a new function.
export const asyncHandler = (controller: AsyncControllerType): AsyncControllerType => (
    async(req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);