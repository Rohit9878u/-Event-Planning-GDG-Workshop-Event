# GDG Workshop Manager

A full-stack web application for managing workshops, meetups, hackathons, and conferences for Google Developer Groups.

## Features

- **Event Management**: Create, view, update, and delete events
- **Event Categories**: Workshops, Meetups, Hackathons, Conferences
- **Search & Filter**: Find events by keyword or category
- **User Authentication**: Login system with role-based access
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **REST API**: Full CRUD operations for events

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/events | List all events |
| GET | /api/events?category=workshop | Filter by category |
| GET | /api/events?search=flutter | Search events |
| GET | /api/events/:id | Get single event |
| POST | /api/events | Create new event |
| PUT | /api/events/:id | Update event |
| DELETE | /api/events/:id | Delete event |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | User login |

## Demo Credentials

- **Admin**: admin@gdg.dev / admin123
- **Organizer**: organizer@gdg.dev / organizer123

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── auth/login/route.ts
│   │   └── events/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── events/
│   │   ├── page.tsx
│   │   ├── create/page.tsx
│   │   └── [id]/page.tsx
│   ├── login/page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── navbar.tsx
│   ├── event-card.tsx
│   └── stats-card.tsx
├── lib/
│   ├── types.ts
│   └── data.ts
└── README.md
\`\`\`

## Event Schema

\`\`\`typescript
interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  registeredCount: number
  category: 'workshop' | 'meetup' | 'hackathon' | 'conference'
  speaker?: string
  createdAt: string
}
\`\`\`

## License

MIT
