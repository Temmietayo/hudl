import dotenv from 'dotenv';
dotenv.config();

type Creds = { email: string; password: string };

const raw = process.env.CREDENTIALS;
if (!raw) throw new Error('Missing "credentials" in env');
const credsMap = JSON.parse(raw) as Record<string, Creds>;

export const validCredentials = credsMap.validCredentials;
export const lockedCredentials = credsMap.lockedCredentials;
export const invalidCredentials: Creds = {
    email: `invalid-${Math.random().toString(36).substring(2, 15)}@example.com`,
    password: `invalid-${Math.random().toString(36).substring(2, 15)}`,
};
