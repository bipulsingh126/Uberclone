# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Frontend Documentation

## Overview

This project is a React application built with Vite, providing a minimal setup for developing a web application with modern features like Hot Module Replacement (HMR) and ESLint rules.

## Project Structure

- **src/**: Contains all the source code for the application.
  - **pages/**: Contains the main pages of the application.
    - **UserLogin.jsx**: The login page for users.
    - **Home.jsx**: The home page that welcomes users.

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

### UserLogin

The `UserLogin` component allows users to log into their accounts. It includes fields for email and password, as well as a "Remember me" checkbox.

### Home

The `Home` component serves as the landing page for the application, providing a link to the login page.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
