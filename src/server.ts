import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

/*
API REST 

GET 
POST
PUT 
PATCH
DELETE 
*/

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'transação de teste',
      amount: 1000,
    })
    .returning('*')
  return transaction
})

app.get('/busca', async () => {
  const transactionWhere = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactionWhere
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on port 3333`)
  })
