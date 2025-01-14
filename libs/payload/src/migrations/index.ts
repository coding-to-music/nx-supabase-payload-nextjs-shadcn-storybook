import * as migration_20241219_095028 from './20241219_095028';
import * as migration_20250114_182816_supabase_auth_integration from './20250114_182816_supabase_auth_integration';

export const migrations = [
  {
    up: migration_20241219_095028.up,
    down: migration_20241219_095028.down,
    name: '20241219_095028',
  },
  {
    up: migration_20250114_182816_supabase_auth_integration.up,
    down: migration_20250114_182816_supabase_auth_integration.down,
    name: '20250114_182816_supabase_auth_integration'
  },
];
