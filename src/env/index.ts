import 'dotenv/config'

import { z } from 'zod'
// zod = validação de dados // process.env.DATABASE_URL
// enum = alguma das opções

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)
// passa o schema oara process.env ew o zod faz a validação

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
