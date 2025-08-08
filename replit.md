# Overview

This is a gaming-focused social platform built with a modern full-stack architecture. The application allows users to create accounts, share gaming-related posts, and connect with other gamers. It features a React frontend with a custom gaming theme, an Express.js backend API, and uses PostgreSQL for data persistence through Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with protected routes for authenticated users
- **UI Components**: Shadcn/ui component library with Radix UI primitives and Tailwind CSS for styling
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Authentication**: Supabase Auth integration with custom auth context provider
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Theme**: Custom gaming-themed color palette with dark mode support

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API with proper HTTP status codes and error handling
- **Data Layer**: Drizzle ORM for type-safe database operations
- **Storage**: In-memory storage implementation with interface for easy database switching
- **Middleware**: Custom logging middleware for API request tracking
- **Development**: Hot reload support with Vite integration for development mode

## Database Schema
- **Users Table**: Stores user profiles with gaming preferences (favorite games, bio, avatar)
- **Posts Table**: Gaming-related posts linked to users with content and game associations
- **Relationships**: Foreign key relationship between posts and users
- **Schema Validation**: Zod schemas for runtime validation matching database structure

## Authentication System
- **Provider**: Supabase Auth for user authentication and session management
- **Social Login**: Support for Google and Discord OAuth providers
- **Session Management**: Persistent sessions with automatic token refresh
- **Route Protection**: HOC-based route protection with loading states
- **User Metadata**: Custom user metadata stored in Supabase for gaming preferences

# External Dependencies

## Core Dependencies
- **Database**: PostgreSQL with Neon Database serverless driver
- **Authentication**: Supabase for auth services and user management
- **UI Framework**: Radix UI for accessible component primitives
- **Styling**: Tailwind CSS for utility-first styling approach
- **Validation**: Zod for schema validation and type safety
- **State Management**: TanStack React Query for server state caching

## Development Tools
- **Build Tool**: Vite for fast development and optimized builds
- **Type Safety**: TypeScript across the entire stack
- **Database Migrations**: Drizzle Kit for schema migrations
- **Session Storage**: PostgreSQL session store with connect-pg-simple
- **Error Handling**: Runtime error overlay for development debugging

## Third-party Integrations
- **Neon Database**: Serverless PostgreSQL hosting
- **Supabase**: Backend-as-a-Service for authentication and real-time features
- **Replit**: Development environment integration with cartographer plugin