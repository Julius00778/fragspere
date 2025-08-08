import { type User, type InsertUser, type Post, type InsertPost } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Post operations
  getPosts(): Promise<Post[]>;
  getPostsByUserId(userId: string): Promise<Post[]>;
  createPost(post: InsertPost & { userId: string }): Promise<Post>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, Post>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      favoriteGame: insertUser.favoriteGame || null,
      avatar: insertUser.avatar || null,
      bio: insertUser.bio || null,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return undefined;
    }

    const updatedUser: User = {
      ...existingUser,
      ...userData,
      favoriteGame: userData.favoriteGame !== undefined ? userData.favoriteGame || null : existingUser.favoriteGame,
      avatar: userData.avatar !== undefined ? userData.avatar || null : existingUser.avatar,
      bio: userData.bio !== undefined ? userData.bio || null : existingUser.bio,
      updatedAt: new Date(),
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPostsByUserId(userId: string): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter((post) => post.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createPost(postData: InsertPost & { userId: string }): Promise<Post> {
    const id = randomUUID();
    const now = new Date();
    const post: Post = {
      ...postData,
      id,
      game: postData.game || null,
      createdAt: now,
    };
    this.posts.set(id, post);
    return post;
  }
}

export const storage = new MemStorage();
