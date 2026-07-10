# Security Guide - Spanish Wine Camps

## Row Level Security (RLS) Configuration

**CRITICAL:** Para que el frontend funcione correctamente con Supabase, debes habilitar Row Level Security (RLS) en todas las tablas que crees en tu base de datos de Supabase.

### ¿Qué es RLS?

Row Level Security (RLS) es una característica de Supabase/PostgreSQL que permite controlar qué datos puede ver o modificar cada usuario basándose en su autenticación. Esto es esencial para la seguridad de tu aplicación.

### Por qué es necesario

Sin RLS habilitado, cualquier persona con la `anon key` podría acceder, modificar o eliminar datos de tu base de datos. Con RLS habilitado, solo los usuarios autenticados pueden acceder a sus propios datos.

### Cómo habilitar RLS

#### 1. En el Dashboard de Supabase

1. Ve a tu proyecto en [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Navega a **Database** → **Tables**
3. Para cada tabla que crees:
   - Selecciona la tabla
   - Haz clic en **RLS policies** en el menú lateral
   - Habilita **Enable RLS**

#### 2. Políticas RLS Básicas

Para cada tabla, necesitas crear políticas que permitan:

- **Lectura:** Usuarios autenticados pueden leer sus propios datos
- **Escritura:** Usuarios autenticados pueden escribir sus propios datos
- **Lectura pública:** (opcional) Datos que pueden ser leídos por cualquiera

#### Ejemplo de Políticas SQL

Para una tabla `reservations`:

```sql
-- Habilitar RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios pueden ver sus propias reservas
CREATE POLICY "Users can view own reservations"
ON reservations
FOR SELECT
USING (auth.uid() = user_id);

-- Política: Usuarios pueden crear sus propias reservas
CREATE POLICY "Users can create own reservations"
ON reservations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Política: Usuarios pueden actualizar sus propias reservas
CREATE POLICY "Users can update own reservations"
ON reservations
FOR UPDATE
USING (auth.uid() = user_id);

-- Política: Usuarios pueden eliminar sus propias reservas
CREATE POLICY "Users can delete own reservations"
ON reservations
FOR DELETE
USING (auth.uid() = user_id);
```

### Tablas Comunes para Spanish Wine Camps

Cuando crees tablas para tu aplicación, asegúrate de incluir una columna `user_id` que referencia al usuario autenticado:

#### Tabla: reservations
```sql
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  journey_id TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view own reservations"
ON reservations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reservations"
ON reservations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reservations"
ON reservations FOR UPDATE USING (auth.uid() = user_id);
```

#### Tabla: user_profiles
```sql
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Seguridad de Variables de Entorno

- **Nunca** commits el archivo `.env` a Git
- El archivo `.env` ya está en `.gitignore`
- Usa `.env.example` como plantilla para otros desarrolladores
- En producción, usa variables de entorno del hosting (Vercel, 等)

### Buenas Prácticas de Seguridad

1. **Validación en el Frontend:** Valida los datos antes de enviarlos a Supabase
2. **Validación en el Backend:** Usa triggers de PostgreSQL para validaciones adicionales
3. **Límite de Rate:** Considera implementar rate limiting en Supabase
4. **Auditoría:** Habilita el logging de Supabase para monitorear accesos
5. **Backups:** Configura backups automáticos en Supabase

### Recursos Adicionales

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/security)
- [PostgreSQL Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

### Checklist de Seguridad

- [ ] RLS habilitado en todas las tablas
- [ ] Políticas RLS creadas para cada tabla
- [ ] Columna `user_id` en tablas de usuario
- [ ] Archivo `.env` en `.gitignore`
- [ ] Credenciales de Supabase configuradas correctamente
- [ ] Validación de datos en frontend
- [ ] Backups automáticos configurados
- [ ] Logging habilitado en Supabase
