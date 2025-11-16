import { Client, Account, Databases, ID } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

if (!endpoint || !projectId) {
  throw new Error("Missing Appwrite environment variables!");
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);


export const databases = new Databases(client);
export const account = new Account(client);
export { ID };