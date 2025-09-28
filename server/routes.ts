import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import path from "path";

// Rate limiting map to prevent spam
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 submissions per 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  // Reset if window has passed
  if (now - userLimit.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the main.html file on the root route
  app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "main.html"));
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Rate limiting
      const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({
          success: false,
          error: "Too many requests. Please try again later."
        });
      }

      // Validate request body
      const validationResult = contactFormSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid form data",
          details: validationResult.error.errors
        });
      }

      const { name, email, message } = validationResult.data;

      // Get Discord webhook URL from environment variable
      const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (!discordWebhookUrl) {
        console.error("DISCORD_WEBHOOK_URL environment variable not set");
        return res.status(500).json({
          success: false,
          error: "Server configuration error"
        });
      }

      // Create Discord embed
      const embed = {
        title: "🔥 New Contact Form Submission",
        color: 0x3b82f6, // Blue color
        fields: [
          {
            name: "👤 Name",
            value: name,
            inline: true
          },
          {
            name: "📧 Email", 
            value: email,
            inline: true
          },
          {
            name: "💬 Message",
            value: message.length > 1000 ? message.substring(0, 1000) + "..." : message,
            inline: false
          }
        ],
        footer: {
          text: "Portfolio Contact Form",
          icon_url: "https://bram.pages.dev/assets/images/image06.jpg"
        },
        timestamp: new Date().toISOString()
      };

      // Send to Discord webhook
      const discordResponse = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `📬 **New message from ${name}!**`,
          embeds: [embed]
        })
      });

      if (!discordResponse.ok) {
        console.error("Discord webhook failed:", discordResponse.status, discordResponse.statusText);
        return res.status(500).json({
          success: false,
          error: "Failed to send message. Please try again."
        });
      }

      return res.json({
        success: true,
        message: "Message sent successfully! I'll get back to you soon."
      });

    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error. Please try again."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
