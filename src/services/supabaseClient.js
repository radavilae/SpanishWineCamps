import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase configurado con variables de entorno
 *
 * Para configurar:
 * 1. Crea un proyecto en https://supabase.com/dashboard
 * 2. Ve a Settings → API
 * 3. Copia Project URL y anon public key
 * 4. Crea archivo .env en la raíz con:
 *    VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
 *    VITE_SUPABASE_ANON_KEY=tu-clave-anon
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validación de credenciales
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Credenciales de Supabase no configuradas')
  console.error('Por favor configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env')
  console.error('Verifica SECURITY.md para más información')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
