# Proyecto Fullstack con FastAPI y React

Este proyecto consiste en una API desarrollada con FastAPI alojada en la carpeta `backend` y una aplicación frontend construida con React alojada en la carpeta `front`.

## Descripción del Proyecto

- **Backend**: Implementado con FastAPI. Maneja la autenticación de usuarios, el registro y la actualización de perfiles, incluyendo la carga de imágenes de perfil.
- **Frontend**: Construido con React, proporciona una interfaz de usuario para interactuar con las funcionalidades ofrecidas por el backend.

## Estructura del Proyecto

- `backend/`: Contiene el código del backend utilizando FastAPI.
- `front/`: Contiene el código del frontend utilizando React.

## Requisitos Previos

Asegúrate de tener instalado:
- Python 3.7 o superior
- Node.js y npm
- pipenv (opcional, recomendado para gestionar el entorno virtual de Python)
- Yarn (opcional, como alternativa a npm)

## Configuración del Backend

1. Navega a la carpeta `backend`:

```bash
cd backend
```

2. Crea y activa un entorno virtual (opcional, pero recomendado):

```bash
# Con pipenv
pipenv shell
```

3. Instala las dependencias necesarias:

```bash
pip install -r requirements.txt
```

4. Ejecuta el servidor FastAPI:

```bash
uvicorn main:app --reload
```

## Configuración del Frontend

1. Navega a la carpeta `front`:

```bash
cd front
```

2. Instala las dependencias necesarias:

```bash
npm install
```

(O si prefieres usar Yarn)

```bash
yarn install
```

3. Ejecuta la aplicación React:

```bash
npm start
```

(O si usas Yarn)

```bash
yarn start
```

## Uso del Proyecto

1. Accede a la aplicación frontend en tu navegador en `http://localhost:3000`.
2. Interactúa con la API a través de la interfaz de usuario para registrarte, iniciar sesión, y actualizar tu perfil.

## Recursos adicionales

- **FastAPI Docs**: Aprende más sobre cómo usar FastAPI para crear API rápidas y seguras.
- **React Docs**: Aprende a construir interfaces de usuario con React.

Si tienes preguntas o necesitas asistencia adicional, no dudes en abrir un issue o contactarme.