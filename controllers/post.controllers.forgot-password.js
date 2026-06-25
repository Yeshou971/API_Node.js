const crypto = require('crypto')
const prisma = require('../lib/prisma')
const sendEmail = require('../lib/nodemailer')

module.exports = async (req, res) => {
  const { email } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Email non trouvé'
      })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`

    await sendEmail(
      user.email,
      'Réinitialisation du mot de passe',
      `Bonjour ${user.name},\n\nVous avez demandé à réinitialiser votre mot de passe.\nVeuillez cliquer sur le lien suivant : ${resetUrl}`
    )

    return res.json({
      error: false,
      message: 'Email de réinitialisation envoyé avec succès',
      resetToken
    })
  } catch (error) {
    console.error('Erreur POST /forgot-password :', error)
    return res.status(500).json({
      error: true,
      message: 'Erreur lors de la demande de réinitialisation du mot de passe'
    })
  }
}