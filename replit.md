# Replit Configuration

## Overview

This is a full-stack web application built with React, TypeScript, and Express.js. The project follows a modern monorepo structure with a client-server architecture, featuring a React frontend with shadcn/ui components and an Express backend with PostgreSQL database integration using Drizzle ORM. The application appears to be designed for creating personal portfolio/about me websites with rich UI components and interactive features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Development**: Hot reload with tsx for development server
- **Build**: esbuild for production bundling

### Database Design
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Current Schema**: Basic user management with id, username, and password fields

### Project Structure
- **Monorepo Layout**: Separate client and server directories with shared code
- **Client**: React application in `/client` with component library
- **Server**: Express API in `/server` with modular routing
- **Shared**: Common types and schemas in `/shared`
- **Configuration**: Centralized config files at root level

### Development Workflow
- **Hot Reload**: Vite dev server for frontend, tsx for backend
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Path Aliases**: Configured for clean imports (@/, @shared/)
- **Database**: Push-based schema changes with `db:push` command

### Authentication & Storage
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **User Management**: Basic CRUD operations for user entities

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Backend**: Express.js, Node.js with TypeScript support
- **Build Tools**: Vite, esbuild, tsx for development

### Database & ORM
- **Database**: PostgreSQL via Neon serverless (@neondatabase/serverless)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Migrations**: Drizzle Kit for schema management
- **Validation**: Zod with Drizzle integration

### UI Component Library
- **Base Components**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with class-variance-authority
- **Utilities**: clsx for conditional classes, date-fns for date handling
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Replit Integration**: Specialized Vite plugins for Replit environment
- **Error Handling**: Runtime error overlay for development
- **Code Quality**: TypeScript for type safety across the stack

### Additional Libraries
- **State Management**: TanStack Query for server state
- **UI Enhancements**: Embla Carousel, Recharts for data visualization
- **Form Validation**: Hookform resolvers with Zod schemas
- **Command Interface**: cmdk for command palette functionality