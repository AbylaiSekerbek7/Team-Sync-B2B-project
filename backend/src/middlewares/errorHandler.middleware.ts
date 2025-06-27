import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
    console.error(`Error Occured on Path: ${req.path}`, error);
    if (error instanceof SyntaxError) {
        return res.status(400).json({
            message: "Invalid JSON format. Please check your Request body",
        });
    };

    return res.status(500).json({
        message: "Internal server error",
        error: error?.message || "Uknown error occured" // if the real error exist we will display it, either "Unknown error occured"
    });
};