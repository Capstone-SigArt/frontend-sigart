# SigArt - Final Fantasy XIV Art Community Platform

A community-driven web application built for Final Fantasy XIV players to connect, create, and share artwork from in-game art events.

## 🎨 Problem Statement

The Final Fantasy XIV art community faces several challenges:

- **Fragmented Discovery**: Events are announced across multiple platforms (X/Twitter, Bluesky, Discord, Carrd, Custom Websites, etc.), making it difficult for players to find upcoming art parties.
- **Disorganized Event Management**: Hosts rely on disconnected tools (e.g., Google Forms, spreadsheets) for handling RSVPs, themes, and time coordination.
- **No Central Archive for Art**: Creations made during parties are often scattered across private Discords or social feeds, with no lasting archive tied to the event.
- **Lack of Character Integration**: There is no consistent system to connect shared artwork with players' in-game characters or glamours.
- **Beginner-Unfriendly Onboarding**: New artists or players unfamiliar with the art party scene have no clear, centralized entry point or guide to participate.

## 🚀 SigArt's Solution

SigArt addresses these challenges by providing:

- **Centralized Hub**: Create, manage, and discover art parties from a single platform
- **Artwork Sharing**: Share and browse artwork linked to events and in-game characters
- **Intuitive Discovery**: Utilize an intuitive tagging and filtering system for easy discovery
- **Welcoming Onboarding**: Provide a welcoming onboarding process for newcomers to join and contribute

## 🛠️ Tech Stack

### Frontend
- **React** + **TypeScript** for the user interface
- **Tailwind CSS** for styling and responsive design
- **Netlify** for deployment with automatic GitHub integration

### Backend
- **Node.js** + **Express** for the API server
- **Sequelize** ORM for database management
- **Render** for backend hosting with automatic deployment

### Database & Authentication
- **Supabase** as the primary database solution
- **PostgreSQL** for data storage
- **Google Authentication** for secure login and account creation
- **Supabase Auth** for email verification and session management

### External Services
- **Oracle Cloud** for containerized API that scrapes FFXIV's Lodestone for character data
- **Cloudflare R2** for robust image storage with free tier and scalability
- **FFXIV Lodestone API** integration for character linking

### Development Tools
- **Draw.io** for lo-fidelity wireframing
- **Agile Development** with 2-week sprints
- **GitHub** for version control and collaboration

## ✨ Key Features

### 🎭 Character Integration
- Link your FFXIV characters to your profile
- Connect artwork to specific in-game characters and glamours
- Browse artwork by character associations

### 🎨 Art Party Management
- Create and manage art parties with themes and schedules
- RSVP system for event participation
- Calendar view for upcoming events
- Party-specific artwork galleries

### 📸 Artwork Sharing
- Upload artwork with reference images
- Tag system for easy discovery and filtering
- Like and interaction system
- Centralized archive for all event artwork

### 👥 Community Features
- User profiles with artwork showcases
- Follow system for connecting with other artists
- Community art browsing with advanced filtering
- Resource sharing and discovery

### 🔐 Security & Authentication
- Google OAuth integration
- Email verification through Supabase
- Secure session management
- Privacy controls for profiles and parties

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account
- Cloudflare R2 account
- Oracle Cloud account (for character API)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd SigArt/frontend-sigart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_CLOUDFLARE_R2_URL=your_r2_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
frontend-sigart/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   └── modals/         # Modal components
│   ├── pages/              # Page components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── lib/                # Utility libraries
│   └── integrations/       # Third-party integrations
├── public/                 # Static assets
└── package.json
```

## 🔮 Future Improvements

- **Admin Panel**: Monitoring and content management tools
- **Organized Storage**: Separate Cloudflare buckets for better organization
- **Invite System**: Party invite links and codes
- **Privacy Controls**: Granular privacy settings for profiles and parties
- **Commission System**: Dedicated section for artist commissions
- **Enhanced Discovery**: Advanced search and recommendation algorithms
- **Mobile App**: Native mobile application
- **Real-time Features**: Live chat and notifications

## 👥 Team

- **Dylan Beach** - Frontend Development & UI/UX
- **Lupita Sanchez** - Calendar System & Community Features
- **Artur Voskanyan** - Backend Development & API Integration

## 📚 Learning Outcomes

This project provided valuable experience in:

- Establishing robust project structure for full-stack applications
- Image upload and management with cloud storage
- Database design and management with Supabase and PostgreSQL
- Authentication systems with Google OAuth
- React and Tailwind CSS for modern frontend development
- Node.js and Express for backend API development
- API design and frontend-backend communication
- Deployment strategies with Netlify and Render

## 🤝 Contributing

We welcome contributions from the community! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**SigArt** - Connecting Final Fantasy XIV artists, one party at a time! 🎨✨
