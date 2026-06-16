const { PrismaClient } = require("@prisma/client")

// Instance unique de Prisma Client, partagée par toute l'application.
// On évite ainsi de créer une connexion par requête (ce qui sature la base,
// surtout sur Neon/Postgres serverless).
const prisma = new PrismaClient({
  log: ["warn", "error"],
})

module.exports = prisma