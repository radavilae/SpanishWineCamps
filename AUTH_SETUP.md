# Configuración de Autenticación con Supabase

Este proyecto incluye un sistema de autenticación completo utilizando Supabase Auth.

## Archivos Creados

- `src/services/supabaseClient.js` - Cliente de Supabase inicializado
- `src/contexts/AuthContext.jsx` - Contexto global de autenticación
- `src/components/auth/AuthForm.jsx` - Formulario de Login/Registro con pestañas
- `src/components/auth/AuthForm.module.css` - Estilos del formulario
- `src/components/auth/Profile.jsx` - Componente para mostrar datos del usuario
- `src/components/auth/Profile.module.css` - Estilos del perfil
- `.env.example` - Plantilla para variables de entorno

## Configuración

### 1. Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice (puede tomar 1-2 minutos)

### 2. Obtener credenciales

1. En tu dashboard de Supabase, ve a **Settings** → **API**
2. Copia:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
VITE_SUPABASE_URL=tu_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
```

**Importante:** El archivo `.env` ya está en `.gitignore` para no exponer tus credenciales.

## Uso de los Componentes

### AuthForm (Login/Registro)

```jsx
import AuthForm from './components/auth/AuthForm'

// En tu componente
<AuthForm />
```

El componente incluye:
- Pestañas para cambiar entre "Iniciar Sesión" y "Registrarse"
- Validación de email y contraseña
- Manejo de errores
- Estados de carga

### Profile (Perfil de Usuario)

```jsx
import Profile from './components/auth/Profile'

// En tu componente
<Profile />
```

El componente muestra:
- Email del usuario
- Metadatos adicionales (nombre, teléfono)
- ID de usuario
- Fecha de creación
- Último acceso
- Botón para cerrar sesión

### AuthContext (Estado Global)

```jsx
import { useAuth } from './contexts/AuthContext'

function MiComponente() {
  const { user, loading, signIn, signUp, signOut } = useAuth()

  if (loading) return <p>Cargando...</p>

  if (!user) {
    return <p>No autenticado</p>
  }

  return <p>Hola, {user.email}</p>
}
```

## Integración con "Mis Reservas"

El `AuthContext` ya está integrado en `App.jsx`, por lo que puedes usar el hook `useAuth` en cualquier componente de tu aplicación.

Para proteger rutas o componentes:

```jsx
import { useAuth } from './contexts/AuthContext'

function MisReservas() {
  const { user, loading } = useAuth()

  if (loading) return <p>Cargando...</p>

  if (!user) {
    return <AuthForm /> // Redirigir al login
  }

  return (
    <div>
      <h1>Mis Reservas</h1>
      {/* Contenido protegido */}
    </div>
  )
}
```

## Funciones Disponibles

### signUp(email, password)
Registra un nuevo usuario con email y contraseña.

```jsx
const { signUp } = useAuth()
await signUp('usuario@email.com', 'password123')
```

### signIn(email, password)
Inicia sesión con email y contraseña.

```jsx
const { signIn } = useAuth()
await signIn('usuario@email.com', 'password123')
```

### signOut()
Cierra la sesión del usuario actual.

```jsx
const { signOut } = useAuth()
await signOut()
```

## Estructura del Código

- **Limpio y modular**: Cada componente tiene su responsabilidad única
- **CSS Modules**: Estilos encapsulados para evitar conflictos
- **Type-safe**: Usa TypeScript-ready patterns
- **Error handling**: Manejo de errores con mensajes claros
- **Loading states**: Estados de carga para mejor UX

## Próximos Pasos

1. Configura las credenciales de Supabase en `.env`
2. Prueba el componente `AuthForm` en una página de prueba
3. Integra con tu sección "Mis Reservas"
4. Agrega validaciones adicionales si es necesario
5. Personaliza los estilos según tu diseño

## Soporte

Para más información sobre Supabase Auth:
- [Documentación oficial](https://supabase.com/docs/guides/auth)
- [API Reference](https://supabase.com/docs/reference/javascript/auth-signup)
