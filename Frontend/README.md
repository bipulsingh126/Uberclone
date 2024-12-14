# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Frontend Documentation

## Overview

This project is a React application built with Vite, implementing an Uber-like interface with separate authentication flows for users and captains (drivers).

## Project Structure

- **src/**: Contains all the source code for the application.
  - **pages/**: Contains the main pages of the application.
    - **Home.jsx**: Landing page with Uber branding
    - **UserLogin.jsx**: Login page for passengers
    - **UserSignup.jsx**: Registration page for new passengers
    - **CaptainLogin.jsx**: Login page for drivers/captains

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Components

### Home
The landing page component that displays:
- Uber logo
- Background image of a taxi scene
- "Get Started with Uber" call-to-action
- Navigation link to login page

### UserLogin
User authentication component for passengers with features:
- Email and password login form
- Social login options (Google and Twitter)
- Link to signup page
- Form validation
- Remember me option

### UserSignup
User registration component for new passengers featuring:
- Name, email, and password fields
- Password visibility toggle
- Social signup options (Google and Twitter)
- Form validation
- Navigation to login page

### CaptainLogin
Driver/Captain authentication component with:
- Email and password login form
- Social login options (Google and Twitter)
- Remember me functionality
- Form validation
- Specialized UI for drivers

## Authentication Features

### Social Login Integration
Both user and captain login pages support:
- Google OAuth authentication
- Twitter OAuth authentication

### Form Validation
All authentication forms include:
- Required field validation
- Email format validation
- Password field security

## Styling

The application uses:
- Tailwind CSS for styling
- Responsive design
- Custom SVG icons
- Consistent color scheme and branding

## Contributing

If you would like to contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## License

This project is licensed under the MIT License.
