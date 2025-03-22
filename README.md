# Notepadfy

A modern, fast, and secure online notepad application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 Fast and responsive interface
- 🌙 Dark/Light mode
- 💾 Auto-save functionality
- 🔗 Shareable note links
- ⌨️ Keyboard shortcuts
- 📱 Mobile-friendly design
- 💰 Stripe integration for premium features
- 🎯 SEO optimized

## Prerequisites

- Node.js 18+ and npm
- A Stripe account for payment processing
- A database (SQLite by default)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/notepadfy.git
cd notepadfy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
```

4. Initialize the database:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

- `DATABASE_URL`: Your database connection string
- `NEXT_PUBLIC_SITE_URL`: The public URL of your site
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

## Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Create a webhook endpoint in the Stripe Dashboard pointing to `your-domain.com/api/webhooks`
4. Add the webhook secret to your environment variables

## Development

- `npm run dev`: Start the development server
- `npm run build`: Build the application
- `npm start`: Start the production server
- `npm run lint`: Run ESLint
- `npx prisma studio`: Open Prisma Studio to manage your database

## Directory Structure

```
notepadfy/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── components/    # React components
│   └── ...           # Other app files
├── prisma/            # Prisma schema and migrations
├── public/           # Static files
└── ...              # Config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@notepadfy.com or open an issue in the GitHub repository. 