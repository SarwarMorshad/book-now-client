# 🎫 Book Now - Ticket Booking Platform

<div align="center">

![Book Now Logo](https://img.shields.io/badge/Book-Now-FF6B6B?style=for-the-badge&logo=ticket&logoColor=white)

**A modern, full-featured ticket booking platform built with React**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [API Services](#-api-services)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Book Now** is a comprehensive ticket booking platform that enables users to discover, book, and manage tickets for various events. The platform supports multiple user roles (Admin, Vendor, and User) with distinct functionalities, integrated payment processing, real-time booking management, and an intuitive dashboard for analytics.

### ✨ Why Book Now?

- 🚀 **Modern & Fast** - Built with Vite and React 19 for lightning-fast performance
- 🎨 **Beautiful UI** - Sleek design with Tailwind CSS and DaisyUI components
- 🔐 **Secure** - Firebase authentication with role-based access control
- 💳 **Easy Payments** - Seamless Stripe integration for secure transactions
- 📊 **Analytics** - Real-time dashboards with interactive charts
- 📱 **Responsive** - Works perfectly on all devices

---

## ✨ Features

### 🎫 For Users

- **Browse Tickets** - Explore available tickets with advanced filtering
- **Secure Booking** - Easy booking process with seat selection
- **Payment Integration** - Safe payments via Stripe
- **Track Bookings** - Monitor booking status in real-time
- **Download Tickets** - Generate PDF tickets instantly
- **Transaction History** - View all past transactions
- **Profile Management** - Update personal information

### 🏢 For Vendors

- **Add Tickets** - Create and publish event tickets
- **Manage Inventory** - Update ticket details and availability
- **Booking Requests** - Review and approve booking requests
- **Revenue Analytics** - Track sales with interactive charts
- **Performance Metrics** - Monitor ticket performance

### 👨‍💼 For Admins

- **User Management** - Manage all user accounts and roles
- **Booking Oversight** - View and manage all bookings
- **Ticket Management** - Approve, edit, or remove tickets
- **System Analytics** - Comprehensive dashboard with insights
- **Revenue Reports** - Track platform-wide revenue

### 🎯 Additional Features

- 🌙 **Dark Mode** - Toggle between light and dark themes
- ⏱️ **Countdown Timers** - Live countdowns for upcoming events
- 🔔 **Notifications** - Real-time toast notifications
- 🔍 **Search & Filter** - Advanced search capabilities
- 📧 **Support System** - Contact, FAQ, and Support sections
- 🎨 **Smooth Animations** - Framer Motion powered transitions
- 📅 **Schedule Viewing** - Browse event schedules
- 🎁 **Offers & Deals** - Discover special promotions
- 🛡️ **Travel Insurance** - Optional insurance coverage
- 📦 **Booking Tracking** - Track booking status by ID

---

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - Latest React with modern features
- **Vite 7.2.4** - Next-generation frontend tooling
- **React Router DOM 7.10.1** - Declarative routing
- **TanStack Query 5.90.12** - Powerful data synchronization

### Styling & UI

- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **DaisyUI 5.5.13** - Tailwind CSS component library
- **Framer Motion 12.23.26** - Production-ready animations
- **React Icons 5.5.0** - Popular icon library
- **Swiper 12.0.3** - Modern touch slider

### Backend & Services

- **Firebase 12.6.0** - Authentication & backend services
- **Axios 1.13.2** - Promise-based HTTP client
- **Stripe** - Payment processing (@stripe/react-stripe-js & @stripe/stripe-js)

### State & Forms

- **Zustand 5.0.9** - Bear-bones state management
- **React Hook Form 7.68.0** - Performant form validation
- **React Hot Toast 2.6.0** - Notification system
- **SweetAlert2 11.26.10** - Beautiful popup boxes

### Visualization & Documents

- **Recharts 3.5.1** - Composable charting library
- **jsPDF 3.0.4** - PDF generation
- **date-fns 4.1.0** - Modern date utility

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS transformations

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git**
- **Firebase Account** (for authentication)
- **Stripe Account** (for payment processing)

### Step-by-Step Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/book-now-client.git
   cd book-now-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your configuration:

   ```env
   # See Environment Variables section below
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Backend API
VITE_API_BASE_URL=your_backend_api_url

# Image Upload (Optional)
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### Getting Your Keys

**Firebase:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Navigate to Project Settings > General
4. Scroll down to "Your apps" and copy the config values

**Stripe:**

1. Visit [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to Developers > API keys
3. Copy your Publishable key

**ImgBB (Optional):**

1. Sign up at [ImgBB](https://imgbb.com/)
2. Go to API section to get your key

---

## 📖 Usage

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### User Roles & Access

1. **Regular User**
   - Register and login
   - Browse and book tickets
   - Track bookings
   - View transaction history

2. **Vendor**
   - All user features
   - Add and manage tickets
   - View booking requests
   - Access revenue analytics

3. **Admin**
   - All vendor features
   - Manage all users
   - Manage all tickets and bookings
   - Access system-wide analytics

---

## � Screenshots

<div align="center">

### 🏠 Home Page

_Modern landing page with hero section and featured tickets_

### 🎫 Ticket Listing

_Browse all available tickets with filtering options_

### 📊 Dashboard

_Interactive dashboard with real-time analytics_

### 💳 Payment Flow

_Secure Stripe payment integration_

### 📱 Responsive Design

_Seamless experience across all devices_

</div>

> **Note:** Add your actual screenshots to the repository and update these placeholders with:
>
> ```markdown
> ![Home Page](screenshots/home.png)
> ![Dashboard](screenshots/dashboard.png)
> ```

---

## �📁 Project Structure

```
book-now-client/
├── public/                      # Static assets
│   └── _redirects              # Netlify redirects
├── src/
│   ├── assets/                 # Images, fonts, etc.
│   ├── components/             # React components
│   │   ├── cards/              # Card components
│   │   ├── charts/             # Chart components
│   │   ├── countdown/          # Countdown timer
│   │   ├── forms/              # Form components
│   │   ├── modals/             # Modal dialogs
│   │   └── shared/             # Shared components
│   ├── config/                 # Configuration files
│   │   ├── firebase.config.js  # Firebase setup
│   │   └── stripe.config.js    # Stripe setup
│   ├── context/                # React Context
│   │   ├── AuthContext.jsx     # Auth state
│   │   └── ThemeContext.jsx    # Theme state
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.jsx         # Auth hook
│   │   ├── useAxiosSecure.jsx  # Axios interceptors
│   │   ├── useRole.js          # Role checking
│   │   └── useTheme.jsx        # Theme hook
│   ├── layouts/                # Page layouts
│   │   ├── DashboardLayout.jsx # Dashboard wrapper
│   │   └── MainLayout.jsx      # Main app wrapper
│   ├── pages/                  # Page components
│   │   ├── Auth/               # Login & Register
│   │   ├── Dashboard/          # Dashboard pages
│   │   │   ├── Admin/          # Admin pages
│   │   │   ├── User/           # User pages
│   │   │   └── Vendor/         # Vendor pages
│   │   ├── help/               # Help pages
│   │   ├── Home/               # Landing page
│   │   ├── services/           # Service pages
│   │   └── Tickets/            # Ticket pages
│   ├── provider/               # Context providers
│   ├── routes/                 # Routing configuration
│   │   ├── PrivateRoute.jsx    # Protected routes
│   │   └── Routes.jsx          # Main router
│   ├── services/               # API services
│   │   ├── adminService.jsx    # Admin APIs
│   │   ├── api.jsx             # Base API config
│   │   ├── authService.jsx     # Auth APIs
│   │   ├── bookingService.jsx  # Booking APIs
│   │   ├── paymentService.jsx  # Payment APIs
│   │   ├── ticketService.jsx   # Ticket APIs
│   │   └── uploadService.jsx   # Upload APIs
│   ├── utils/                  # Utility functions
│   │   ├── constants.jsx       # App constants
│   │   ├── dateUtils.jsx       # Date helpers
│   │   ├── helpers.jsx         # Helper functions
│   │   └── validators.jsx      # Validation logic
│   ├── App.jsx                 # Root component
│   ├── App.css                 # Global styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Base styles
├── .env                        # Environment variables
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS config
├── tailwind.config.js          # Tailwind config
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

---

## 👥 User Roles

### Role Hierarchy

```
┌─────────────────────────────────────┐
│             ADMIN                   │
│  (Full system access & management)  │
└─────────────────────────────────────┘
              ↑
              │
┌─────────────────────────────────────┐
│            VENDOR                   │
│  (Ticket management & analytics)    │
└─────────────────────────────────────┘
              ↑
              │
┌─────────────────────────────────────┐
│             USER                    │
│    (Browse & book tickets)          │
└─────────────────────────────────────┘
```

### Permission Matrix

| Feature             | User |  Vendor  |  Admin   |
| ------------------- | :--: | :------: | :------: |
| Browse Tickets      |  ✅  |    ✅    |    ✅    |
| Book Tickets        |  ✅  |    ✅    |    ✅    |
| Track Bookings      |  ✅  |    ✅    |    ✅    |
| Add Tickets         |  ❌  |    ✅    |    ✅    |
| Manage Own Tickets  |  ❌  |    ✅    |    ✅    |
| View Revenue        |  ❌  | ✅ (Own) | ✅ (All) |
| Manage All Users    |  ❌  |    ❌    |    ✅    |
| Manage All Tickets  |  ❌  |    ❌    |    ✅    |
| Manage All Bookings |  ❌  |    ❌    |    ✅    |

---

## 🔌 API Services

The application uses a modular service architecture:

### Service Files

- **`api.jsx`** - Base Axios instance with interceptors
- **`authService.jsx`** - Authentication endpoints
- **`ticketService.jsx`** - Ticket CRUD operations
- **`bookingService.jsx`** - Booking management
- **`paymentService.jsx`** - Payment processing
- **`adminService.jsx`** - Admin operations
- **`uploadService.jsx`** - File upload handling

### Example API Call

```javascript
import { ticketService } from "@/services/ticketService";

// Fetch all tickets
const tickets = await ticketService.getAllTickets();

// Create a new ticket
const newTicket = await ticketService.createTicket(ticketData);
```

---

## 🎨 Customization

### Theme Configuration

The app supports light and dark themes. Modify [tailwind.config.js](tailwind.config.js) to customize colors:

```javascript
module.exports = {
  // ... existing config
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
```

### Adding New Routes

1. Create your page component in `src/pages/`
2. Add route in [src/routes/Routes.jsx](src/routes/Routes.jsx)
3. Wrap with `PrivateRoute` if authentication is required

```javascript
<Route
  path="/new-page"
  element={
    <PrivateRoute>
      <NewPage />
    </PrivateRoute>
  }
/>
```

---

## � Deployment

### Deploy to Netlify

1. **Connect your repository**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Choose your repository

2. **Configure build settings**

   ```bash
   Build command: npm run build
   Publish directory: dist
   ```

3. **Add environment variables**
   - Go to Site settings > Environment variables
   - Add all your `VITE_*` variables

4. **Add redirects**
   - The `public/_redirects` file is already configured
   - This ensures React Router works correctly

### Deploy to Vercel

1. **Import your repository**
   - Visit [Vercel](https://vercel.com/)
   - Click "Import Project"
   - Select your repository

2. **Configure project**

   ```bash
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Add environment variables**
   - Go to Project Settings > Environment Variables
   - Add all your `VITE_*` variables

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Build your app
npm run build

# Deploy
firebase deploy
```

---

## �🐛 Troubleshooting

### Common Issues

**Problem: Firebase authentication not working**

```bash
Solution: Verify your Firebase config in .env matches Firebase Console
```

**Problem: Stripe payment fails**

```bash
Solution: Check if you're using the correct Stripe publishable key
Make sure you're not using a test key in production
```

**Problem: Build fails**

```bash
Solution: Clear cache and reinstall dependencies
npm run clean
rm -rf node_modules package-lock.json
npm install
```

**Problem: Port already in use**

```bash
Solution: Change the port in vite.config.js or kill the process
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

---

## 🔒 Security

### Security Features

- 🔐 **Firebase Authentication** - Secure user authentication
- 🛡️ **Role-Based Access Control (RBAC)** - Protected routes and resources
- 🔑 **JWT Tokens** - Secure API authentication
- 🚫 **XSS Protection** - React's built-in XSS protection
- 🔒 **HTTPS Only** - All production traffic encrypted
- 💳 **PCI Compliant** - Stripe handles all payment data

### Best Practices

1. **Never commit `.env` files**

   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env.production
   ```

2. **Use environment variables for sensitive data**

   ```javascript
   // ✅ Good
   const apiKey = import.meta.env.VITE_API_KEY;

   // ❌ Bad
   const apiKey = "hardcoded-key-12345";
   ```

3. **Validate user input**

   ```javascript
   import { z } from "zod";

   const schema = z.object({
     email: z.string().email(),
     password: z.string().min(8),
   });
   ```

4. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

### Reporting Security Issues

If you discover a security vulnerability, please email security@booknow.com instead of using the issue tracker.

---

## ⚡ Performance Optimization

### Built-in Optimizations

- ✅ **Code Splitting** - Automatic route-based code splitting
- ✅ **Lazy Loading** - Components loaded on demand
- ✅ **React Query Caching** - Efficient data caching and synchronization
- ✅ **Vite HMR** - Lightning-fast hot module replacement
- ✅ **Optimized Images** - Lazy loading and responsive images
- ✅ **Tree Shaking** - Unused code eliminated in production

### Performance Tips

```javascript
// Use React.lazy for code splitting
const MyComponent = lazy(() => import("./MyComponent"));

// Memoize expensive computations
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Use TanStack Query for data fetching
const { data, isLoading } = useQuery({
  queryKey: ["tickets"],
  queryFn: fetchTickets,
  staleTime: 5 * 60 * 1000, // Cache for 5 minutes
});
```

### Build Optimization

```bash
# Analyze bundle size
npm run build -- --mode production

# Preview production build locally
npm run preview
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Steps to Contribute

1. **Fork the repository**

   ```bash
   Click the 'Fork' button at the top right of this page
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/book-now-client.git
   cd book-now-client
   ```

3. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**

   ```bash
   # Write your code
   # Test thoroughly
   ```

5. **Commit your changes**

   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**
   ```bash
   Go to the original repository and click 'New Pull Request'
   ```

### Contribution Guidelines

- ✅ Follow the existing code style
- ✅ Write meaningful commit messages
- ✅ Add comments for complex logic
- ✅ Update documentation if needed
- ✅ Test your changes thoroughly
- ❌ Don't commit `.env` files
- ❌ Don't include large binary files

---

## ❓ FAQ

### General Questions

**Q: Is Book Now free to use?**  
A: Yes, Book Now is open-source and free to use. You only need to set up your own Firebase and Stripe accounts.

**Q: What payment methods are supported?**  
A: We support all major credit cards, debit cards, and digital wallets through Stripe.

**Q: Can I customize the design?**  
A: Absolutely! The entire UI is built with Tailwind CSS and can be easily customized.

**Q: Does it work on mobile devices?**  
A: Yes, Book Now is fully responsive and works on all devices.

### Technical Questions

**Q: What's the minimum Node.js version required?**  
A: Node.js v18 or higher is recommended.

**Q: Can I use this with a different backend?**  
A: Yes, the API services are modular and can be adapted to work with any backend.

**Q: How do I add a new user role?**  
A: Extend the role checking logic in `src/hooks/useRole.js` and update the routing in `src/routes/Routes.jsx`.

**Q: Does it support multiple languages?**  
A: Currently, it's in English only, but you can add i18n support using libraries like `react-i18next`.

**Q: How do I change the color scheme?**  
A: Modify the `tailwind.config.js` file to customize colors and themes.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact & Support

### Get Help

- 📧 **Email**: support@booknow.com
- 💬 **Discord**: [Join our community](https://discord.gg/booknow)
- 🐛 **Issues**: [Report bugs](https://github.com/yourusername/book-now-client/issues)
- 📖 **Documentation**: [Read the docs](https://docs.booknow.com)

### Follow Us

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/booknow)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/company/booknow)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)

---

## 🗺️ Roadmap

### ✅ Completed

- [x] User authentication with Firebase
- [x] Role-based access control
- [x] Ticket booking system
- [x] Stripe payment integration
- [x] Admin dashboard
- [x] Vendor dashboard
- [x] User dashboard
- [x] Dark mode support
- [x] Responsive design
- [x] PDF ticket generation

### 🚧 In Progress

- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

### 📋 Planned Features

- [ ] Multi-language support (i18n)
- [ ] Social media login (Google, Facebook)
- [ ] QR code ticket scanning
- [ ] Seat selection with interactive maps
- [ ] Discount codes and coupons
- [ ] Refund management
- [ ] Event calendar view
- [ ] Reviews and ratings
- [ ] Waitlist functionality
- [ ] Group booking discounts
- [ ] API documentation with Swagger
- [ ] Automated testing suite
- [ ] Performance monitoring
- [ ] A/B testing framework

### 💡 Future Ideas

- [ ] AI-powered ticket recommendations
- [ ] Blockchain-based ticket verification
- [ ] NFT tickets
- [ ] Virtual event support
- [ ] Live chat support
- [ ] Progressive Web App (PWA)

Want to contribute? Check out our [Contributing](#-contributing) section!

---

## 🌟 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [Vite Team](https://vitejs.dev/) for the blazing-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Firebase](https://firebase.google.com/) for authentication services
- [Stripe](https://stripe.com/) for payment processing
- All our [contributors](https://github.com/yourusername/book-now-client/graphs/contributors)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/book-now-client?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/book-now-client?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/book-now-client?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/book-now-client)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/book-now-client)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/book-now-client)

---

<div align="center">

### Made with ❤️ by the Book Now Team

**[⬆ Back to Top](#-book-now---ticket-booking-platform)**

</div>
