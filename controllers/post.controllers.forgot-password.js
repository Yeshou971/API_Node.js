const sendEmail = require('../utils/sendEmail')
const { User } = require('../models/user.model')

module.exports= (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Email non trouvé"
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 1800000 // 30 minutes

    await user.save()

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`

    await sendEmail({
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      html: `
        <p>Bonjour ${user.name},</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
        <a href="${resetUrl}" target="_blank">Réinitialiser le mot de passe</a>
        <p>Ce lien expire dans 30 minutes.</p>
      `
    })

    res.json({
      error: false,
      message: "Email de réinitialisation envoyé avec succès"
    })
  } catch (error) {
    console.error('Error during forgot password:', error)
    res.status(500).json({
      error: true,
      message: "Erreur lors de la demande de réinitialisation du mot de passe"
    })
  }
}