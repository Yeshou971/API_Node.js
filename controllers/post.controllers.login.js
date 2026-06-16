const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')
const { JWT_SECRET } = require('../config')

module.exports = (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Email ou mot de passe incorrect"
      })
    }

    const isMatch = await argon2.verify(user.password, password)
    if (!isMatch) {
      return res.status(401).json({
        error: true,
        message: "Email ou mot de passe incorrect"
      })
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' })

    res.json({
      error: false,
      message: "Connexion réussie",
      token
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({
      error: true,
      message: "Erreur lors de la connexion"
    })
  }
}