import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

// Updated with your specific endpoint
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('YOUR_PROJECT_ID'); // Please replace 'YOUR_PROJECT_ID' with your actual Appwrite Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };