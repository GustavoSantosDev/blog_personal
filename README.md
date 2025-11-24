# Plataforma Familiar

Una aplicación web para gestionar tareas, recordatorios y lista de compras entre parejas.

## Características

- **Autenticación**: Registro e inicio de sesión con email/contraseña
- **Tareas**: Crear, asignar y gestionar tareas del hogar
- **Recordatorios**: Configurar recordatorios con notificaciones en el navegador
- **Lista de Compras**: Organizar compras por categorías con cantidades

## Tecnologías

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: NextAuth.js + Supabase Auth
- **Despliegue**: Vercel/Netlify

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url>
   cd blog_personal
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura Supabase:
   - Crea un proyecto en [Supabase](https://supabase.com)
   - Ejecuta el SQL en `src/lib/schema.sql` en el SQL Editor de Supabase
   - Copia las credenciales del proyecto

4. Configura variables de entorno en `.env.local`:
   ```
   NEXTAUTH_SECRET=tu-secreto-aqui
   NEXTAUTH_URL=http://localhost:3000

   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_ANON_KEY=tu-anon-key
   DATABASE_URL=tu-database-url
   ```

5. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

6. Abre [http://localhost:3000](http://localhost:3000)

## Uso

1. Regístrate con tu email
2. Crea tareas, recordatorios y agrega items a la lista de compras
3. Gestiona todo desde el dashboard

## Estructura del Proyecto

- `src/app/` - Páginas y API routes de Next.js
- `src/components/` - Componentes reutilizables
- `src/lib/` - Utilidades y configuraciones
- `src/lib/schema.sql` - Esquema de base de datos

## Próximas Mejoras

- [ ] Notificaciones push
- [ ] Calendario integrado
- [ ] Compartir listas entre usuarios
- [ ] App móvil
