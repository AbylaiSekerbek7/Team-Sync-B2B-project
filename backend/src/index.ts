import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { BadRequestException } from "./utils/appError";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// CookieSession
app.use(
    cookieSession({
        name: "session",
        keys: [config.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
);


// Cors
app.use(
    cors({
        origin: config.FRONTEND_ORIGIN,
        credentials: true,
    })
);

app.get("/", asyncHandler (async(req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a bad Request");
    return res.status(HTTPSTATUS.OK).json({
        message: "Hello from Abylaikhan Sekerbek!",
    });
}));

app.use(errorHandler);

app.listen(config.PORT, async() => {
    console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
    await connectDatabase();
});