import * as admin from "firebase-admin";
import { FCMToken } from "../models";

let isFirebaseInitialized = false;

export async function initializeFirebase() {
  try {
    if (isFirebaseInitialized) return;

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });

    console.log("Firebase initialized successfully");
    isFirebaseInitialized = true;
  } catch (error) {
    console.error("Firebase initialization error:", error);
    throw error;
  }
}

export async function registerFCMToken(userId: string, token: string) {
  try {
    // Check if token already exists
    const existingToken = await FCMToken.findOne({ token });

    if (existingToken) {
      // Update userId if different
      if (existingToken.userId !== userId) {
        existingToken.userId = userId;
        await existingToken.save();
        console.log(`Updated FCM token for user ${userId}`);
      }
      return;
    }

    // Create new token
    await FCMToken.create({ userId, token });
    console.log(`Registered new FCM token for user ${userId}`);
  } catch (error) {
    console.error("Error registering FCM token:", error);
    throw error;
  }
}

export async function sendNotification(
  userId: string,
  title: string,
  body: string,
  data?: Record<string, string>,
) {
  try {
    const tokens = await FCMToken.find({ userId }).select("token").lean();

    if (tokens.length === 0) {
      console.log(`No FCM tokens found for user ${userId}`);
      return;
    }

    // Send to all user tokens
    const messages = tokens.map(({ token }) => ({
      notification: { title, body },
      data: data || {},
      token: token,
    }));

    const results = await admin.messaging().sendEach(messages);
    console.log(`Sent ${results.successCount} notifications to user ${userId}`);

    // Remove invalid tokens
    results.responses.forEach((result, index) => {
      if (result.error) {
        console.error(`Error sending to token: ${result.error.message}`);
        FCMToken.deleteOne({ token: tokens[index].token }).catch(console.error);
      }
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
