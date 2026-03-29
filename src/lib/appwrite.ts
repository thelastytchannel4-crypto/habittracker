import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

// Using environment variables with fallbacks for easier configuration
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || '69c8263500147b3d4627';

client
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };