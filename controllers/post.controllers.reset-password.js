const sendEmail = require('../utils/sendEmail')
const argon2 = require('argon2')

module.exports = (req, res) => {
  const { token, password } = req.body

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Token invalide ou expiré"
      })
    }

    const hashedPassword = await argon2.hash(password)
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    await sendEmail({
      to: user.email,
      subject: 'Mot de passe réinitialisé',
      html: `
        <p>Bonjour ${user.name},</p>
        <p>Votre mot de passe a été réinitialisé avec succès.</p>
      `
    })

    res.json({
      error: false,
      message: "Mot de passe réinitialisé avec succès"
    })
  } catch (error) {
    console.error('Error during reset password:', error)
    res.status(500).json({
      error: true,
      message: "Erreur lors de la réinitialisation du mot de passe"
    })
  }
}