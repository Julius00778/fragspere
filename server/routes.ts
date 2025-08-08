import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

function renderPage(
  req: Request,
  {
    title,
    heading,
    description,
    content,
  }: { title: string; heading: string; description: string; content: string },
) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
  };

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <meta name="description" content="${description}" />
      <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
    </head>
    <body>
      <h1>${heading}</h1>
      <p>${content}</p>
    </body>
  </html>`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // User profile routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid user data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create user" });
      }
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/users/username/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const userData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.params.id, userData);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid user data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update user" });
      }
    }
  });

  // Posts routes (for future implementation)
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to get posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      // This would require authentication middleware in a real app
      const postData = {
        ...req.body,
        userId: req.body.userId, // Would come from auth context
      };
      const post = await storage.createPost(postData);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  const pages = [
    {
      path: "/",
      title: "GamerHub",
      heading: "Welcome to GamerHub",
      description: "Join the ultimate gaming community",
      content: "Sign up or sign in to continue.",
    },
    {
      path: "/dashboard",
      title: "Dashboard",
      heading: "Dashboard",
      description: "Your personal dashboard",
      content: "Overview of your account.",
    },
    {
      path: "/profile",
      title: "Profile",
      heading: "Profile",
      description: "View your profile",
      content: "Profile details go here.",
    },
  ];

  for (const p of pages) {
    app.get(p.path, (req, res) => {
      res.send(renderPage(req, p));
    });
  }

  app.get("*", (req, res) => {
    res.status(404).send(
      renderPage(req, {
        title: "Not Found",
        heading: "Page Not Found",
        description: "The requested page could not be found",
        content: "Check the URL and try again.",
      }),
    );
  });

  const httpServer = createServer(app);
  return httpServer;
}
