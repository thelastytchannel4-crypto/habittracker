import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

// These should ideally be in environment variables
// For now, I'm using placeholders. You'll need to replace these with your actual Appwrite project details.
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('YOUR_PROJECT_ID'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };