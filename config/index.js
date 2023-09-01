import dotenv from 'dotenv';
dotenv.config();

export const {
    APP_PORT,
    DEBUG_MODE,
    DB_URL,
    JWT_SECRET,
    SMTP_MAIL,
    SMTP_PASSWORD,
    APP_URL
} = process.env;