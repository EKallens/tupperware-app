![Vercel Deploy](https://deploy-badge.vercel.app/vercel/recipes-app-client-woad?style=flat-square)
![Node.js](https://img.shields.io/badge/node-22-brightgreen?logo=node.js&style=flat-square)
![React](https://img.shields.io/badge/react-18-blue?logo=react&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-v3.4-green?logo=tailwindcss&style=flat-square)

# 🍲 Tupperware

**Tupperware** is a web application designed to easily and efficiently manage cooking recipes. Users can create, view, and mark their recipes as favorites. The application features a user-friendly interface built with `React` and a backend in `Node.js` using `ExpressJs` and `MongoDB` for data persistence.

## 🚀 Features

-   **Recipe Management**: Create, edit, delete, and view recipes.
-   **Favorites**: Users can mark their favorite recipes for quick access.
-   **Tags**: Classify recipes with custom tags.
-   **Authentication**: Secure system for user registration and login.
-   **Recipe Photos**: Option to add a photo for each recipe.

## 🛠️ Tech Stack

-   **React** with **Vite**: Fast and modern user interface.
-   **TypeScript**: Static typing to facilitate maintenance and scalability.
-   **CSS with TailwindCSS**: Quick and customizable design for a great user experience.
-   **Shadcn**: Component library.
-   **Zustand**: For global state management.
-   **Zod**: Input validation.

### Deployment

-   Work in Progress (WIP)

## 📁 Project Structure

```plaintext
recipes-app-client/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── interfaces/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── router/
│   ├── schemas/
│   ├── store/
│   ├── utils/
│   ├── index.css
│   ├── main.tsx
│   └── Root.tsx
│
└── README.md
```

## 🚀 Installation and Setup

### Prerequisites

-   **Node.js** (v18 or higher)

### Environment Variables

Create a `.env` file at the root of the project to store your environment variables:

```plaintext
REACT_APP_API_URL=http://localhost:5000
```

### Installation

1. Clone the repository:

    ```bash
    $ git clone https://github.com/EKallens/recipes-app-client.git
    $ cd recipes-app-client
    ```

2. Install dependencies:

    ```bash
    $ npm install
    ```

### Running in Development Mode

1. Start the frontend server:

    ```bash
    $ npm run dev
    ```

2. Access the application in your browser:

    - [http://localhost:5173](http://localhost:5173)

## 🎨 Screenshots

Work in Progress

## 🤝 Contributions

Contributions are welcome! If you wish to improve this application, feel free to open a `pull request` or report issues in the `issues` section.
