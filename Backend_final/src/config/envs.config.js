import dotenv from "dotenv";

const environment = "DEV";

dotenv.config({
    path: environment === "PRODUCTION" ? "../.env.prod" : "../.env.dev",
});

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_CODE: process.env.JWT_SECRET_CODE,
    SECRET_CODE: process.env.SECRET_CODE,
};