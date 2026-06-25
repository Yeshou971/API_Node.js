const argon2 = require('../lib/argon2')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Email ou mot de passe incorrect'
      })
    }

    const isMatch = await argon2.verifyPassword(user.password, password)
    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: 'Email ou mot de passe incorrect'
      })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    )

    return res.json({
      error: false,
      message: 'Connexion réussie',
      token
    })
  } catch (error) {
    console.error('Erreur POST /login :', error)
    return res.status(500).json({
      error: true,
      message: 'Erreur lors de la connexion'
    })
  }
}