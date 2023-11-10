/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

database.$connect().then(() => {
    console.log('Connected to database')
})

module.exports = database
