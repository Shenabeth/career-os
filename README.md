
  # CareerOS - Job Application Tracker

CareerOS is a powerful, all-in-one job search management platform designed to help you stay organized, track progress, and land your dream job faster. Manage applications, monitor interviews, and gain actionable insights into your job search journey — all in one beautiful, intuitive interface.

## Features

- **Application Tracking**: Organize and manage all your job applications in one centralized dashboard
- **Interview Management**: Track interview rounds, dates, and notes for each opportunity
- **Analytics Dashboard**: Visualize your job search with insights on applications and response rates
- **Status Updates**: Keep track of each application's progress from applied to offer received
- **Responsive Design**: Fully responsive interface that works seamlessly on desktop and mobile devices
- **Local Storage**: Secure client-side data persistence with demo account access

## Tech Stack

### Frontend Framework & Build
- **React 18.3.1** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe development with full IDE support and better developer experience
- **Vite 6.3.5** - Lightning-fast build tool with instant HMR (Hot Module Replacement)
- **React Router 7.13** - Client-side routing for seamless navigation between pages

### Styling & UI Components
- **Tailwind CSS 4** - Utility-first CSS framework for rapid, responsive design
- **Radix UI** - Unstyled, accessible component primitives (dialogs, dropdowns, tables, etc.)
- **Lucide React** - Beautiful, consistent icon library
- **Sonner** - Modern toast notifications
- **Class Variance Authority** - Type-safe component variant management

### State Management & Forms
- **React Hook Form** - Efficient form management with minimal re-renders
- **React Context API** - Global state management for authentication and app context
- **Local Storage API** - Client-side data persistence

### Additional Libraries
- **Recharts** - Composable charting library for analytics
- **Embla Carousel** - Accessible carousel component
- **React Resizable Panels** - Flexible panel resizing

## Project Structure

```
src/
├── app/
│   ├── components/         # Reusable React components
│   │   └── ui/             # Shadcn UI components
│   ├── contexts/           # React Context providers
│   │   ├── ApplicationContext.tsx
│   │   └── AuthContext.tsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── ApplicationsPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── ...
│   └── routes.tsx          # Route configuration
├── styles/                 # Global styles and theme
│   ├── index.css
│   ├── tailwind.css
│   ├── theme.css
│   └── fonts.css
└── main.tsx                # Application entry point
```

## Key Architecture Highlights

- **Component-Based Architecture**: Modular, reusable components following React best practices
- **Type Safety**: Full TypeScript coverage for improved code quality and maintainability
- **Context-Based State Management**: Clean separation of concerns with authentication and application state contexts
- **Responsive UI**: Mobile-first design approach with Tailwind CSS utilities
- **Accessible Components**: Radix UI primitives ensure WCAG compliance
- **Client-Side Rendering**: Fast, interactive SPA with instant load times
- **Local Storage Persistence**: User data persists across sessions without backend requirements

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation & Development

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Account
- Email: demo@offertrack.com
- Password: demo123

## Why CareerOS?

Perfect for job seekers who want to:
- Stay organized during their job search
- Track multiple applications and interviews efficiently
- Analyze their job search progress with actionable insights
- Manage applications from single to multiple concurrent opportunities

This project demonstrates:
- Modern React patterns and best practices
- TypeScript proficiency
- Responsive UI/UX design
- Component composition and reusability
- State management without a backend
- Form handling and validation
