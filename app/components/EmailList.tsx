import { databases, Query } from "../utils/appwrite";

const fetchEmails = async () => {
  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_EMAIL_COLLECTION!,
    [Query.orderDesc("$createdAt")]
  );
  return response.documents;
};

export default fetchEmails;