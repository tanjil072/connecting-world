import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { registerFCMToken, sendNotification } from "../utils/firebase";

const router = Router();

// Register FCM token for push notifications
router.post(
  "/register-token",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const userId = req.user?.userId;

      if (!token || !userId) {
        return res.status(400).json({
          success: false,
          message: "Token is required",
        });
      }

      await registerFCMToken(userId, token);

      res.json({
        success: true,
        message: "FCM token registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to register token",
        error: (error as any).message,
      });
    }
  },
);

// Test endpoint to send notification to yourself
router.post("/test", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const username = req.user?.username;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await sendNotification(
      userId,
      "Test Notification",
      `Hello ${username}! This is a test notification.`,
      { type: "test" },
    );

    res.json({
      success: true,
      message: "Test notification sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send test notification",
      error: (error as any).message,
    });
  }
});

export default router;
