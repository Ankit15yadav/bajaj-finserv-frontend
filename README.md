# SEARCH_DOCTOR

A production-ready Next.js 13 web application for browsing and filtering a directory of doctors, with support for dynamic searching, filtering, and URL-driven state.


## Features

- **Doctor Directory**: Fetches and displays a list of doctors with details (name, specialties, fees, experience, video/clinic availability).
- **Debounced Search**: Autocomplete input with top-3 suggestions.
- **URL-Driven Filters**: Filters for search query, specialties, consultation type, and sorting are synced to query parameters for deep linking.
- **Dynamic Filters Panel**: Sidebar panel to filter by specialty & consultation type, plus sorting options.
- **Next.js App Router**: Built using the App Directory (`app/`), with TypeScript and Tailwind CSS.
- **Shallow Routing**: Updates URL query without full page reload for seamless UX.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js 16.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/BOT_DOCTOR.git
   cd BOT_DOCTOR
   ```

2. Install dependencies:

   ```bash
   npm install
   # or yarn install
   # or pnpm install
   ```

## Configuration

### Image Domains

If you load doctor profile images from external CDNs (e.g., Azure Blob Storage), add their hostnames in `next.config.js`:

```js
// next.config.js
module.exports = {
  images: {
    domains: [
      'doctorlistingingestionpr.azureedge.net',
      'doctorlistingingestionpr.blob.core.windows.net',
    ],
  },
}
```


## Usage

### Development Server

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```


## Project Structure

```
/
├── app/                   # Next.js App Router (layouts & pages)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Doctor listing page
├── components/            # Reusable components
│   ├── search-bar.tsx     # Debounced, clearable search input
│   ├── filter-panel.tsx   # Sidebar filters
│   └── doctor-card.tsx    # Doctor info card
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── styles/                # Global styles & Tailwind config
├── next.config.js         # Next.js configuration
└── package.json           # Scripts & dependencies
```

## Available Scripts

- `dev` – Start Next.js in development mode.
- `build` – Create a production build.
- `start` – Run the production server.
- `lint` – Run ESLint and TypeScript checks.
- `format` – Format code with Prettier.

## Deployment

Deploy easily on Vercel:

1. Push your repo to GitHub, GitLab, or Bitbucket.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Vercel will detect Next.js and set up CI/CD automatically.

## Future Enhancements

- **AI Chatbot**: Integrate the BOT_DOCTOR AI for personalized symptom assessment using Decision Tree and SVM models.
- **Pagination/Infinite Scroll**: Handle large doctor datasets gracefully.
- **Server-Side Filtering**: Move filtering logic to server for performance and security.
- **User Accounts**: Allow users to save favorites and view booking history.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

