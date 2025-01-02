# 🍲 Tupperware

**Tupperware** es una aplicación web diseñada para gestionar recetas de cocina de forma sencilla y accesible. Los usuarios pueden crear, visualizar y marcar como favoritas sus recetas. La aplicación cuenta con una interfaz de usuario amigable desarrollada en React y un backend en Node.js con ExpressJs que utiliza MongoDB para la persistencia de datos.

## 🚀 Características

-   **Gestión de Recetas**: Crear, editar, eliminar y visualizar recetas.
-   **Favoritos**: Los usuarios pueden marcar sus recetas favoritas para acceder a ellas rápidamente.
-   **Etiquetas (Tags)**: Clasifica las recetas por etiquetas personalizadas.
-   **Autenticación**: Sistema seguro de registro e inicio de sesión.
-   **Fotos de Recetas**: Opción de agregar una foto para cada receta.

## 🛠️ Stack Tecnológico

-   **React** con **Vite**: Interfaz de usuario rápida y moderna.
-   **TypeScript**: Tipado estático para facilitar el mantenimiento y escalabilidad.
-   **CSS con TailwindCSS**: Diseño rápido y personalizado para una buena experiencia de usuario.
-   **Shadcn**: Librería de componentes
-   **Zustand**: Para la gestión del estado global
-   **Zod**: Validación de inputs

### Despliegue

-   WIP

## 📁 Estructura del Proyecto

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

## 🚀 Instalación y Configuración

### Requisitos Previos

-   **Node.js** (v18 o superior)

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto para almacenar tus variables de entorno:

```plaintext
REACT_APP_API_URL=http://localhost:5000
```

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/EKallens/recipes-app-client.git
    cd recipes-app-client
    ```

2. Instala las dependencias:

    ```bash
    $ npm install
    ```

### Ejecución en Desarrollo

1. Inicia el servidor frontend:

    ```bash
    $ npm run dev
    ```

2. Accede a la aplicación en el navegador:

    - [http://localhost:5173](http://localhost:5173)

## 🎨 Capturas de Pantalla

Work in progress

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar esta aplicación, siéntete libre de abrir un `pull request` o de reportar problemas en el apartado de `issues`.
