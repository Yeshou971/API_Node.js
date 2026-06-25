const prisma = require('../lib/prisma')
const argon2 = require('../lib/argon2')

module.exports = async (req, res) => {
  const { email, token, password } = req.body

  try {
    if (!token) {
      return res.status(400).json({
        error: true,
        message: 'Token invalide ou expiré'
      })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Utilisateur introuvable'
      })
    }

    const hashedPassword = await argon2.hashPassword(password)
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    return res.json({
      error: false,
      message: 'Mot de passe réinitialisé avec succès'
    })
  } catch (error) {
    console.error('Erreur POST /reset-password :', error)
    return res.status(500).json({
      error: true,
      message: 'Erreur lors de la réinitialisation du mot de passe'
    })
  }
}