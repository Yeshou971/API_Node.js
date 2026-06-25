const sendEmail = require('../lib/nodemailer')
const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')

module.exports = async (req, res) => {

  // On récupère les informations envoyées par l'utilisateur.
  const { name, lastName, email, password } = req.body

  // On rassemble prénom et nom pour stocker un nom complet proprement.
  const fullName = `${name || ''} ${lastName || ''}`.trim()

  try {
    const hash = await argon2.hashPassword(password)
    
    await prisma.user.create({
      data: {
        name: fullName || name,
        email,
        password: hash
      }
    })

    await sendEmail(
      email,
      'Bienvenue sur notre site !',
      `Bonjour ${fullName || name},\n\nMerci de vous être inscrit sur notre site. Votre compte a été créé avec succès.\n\nCordialement,\nL'équipe de notre site.`
    )

    return res.status(201).json({
      error: false,
      message: 'Utilisateur créé avec succès'
    })
  } catch (error) {
    console.error('Erreur POST /register :', error)
    return res.status(500).json({
      error: true,
      message: 'Erreur lors de la création du compte'
    })
  }
}