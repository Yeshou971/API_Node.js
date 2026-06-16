const sendEmail = require('../lib/sendEmail')
const argon2 = require('../lib/argon2')
const prisma = require('../lib/prisma')

module.exports = (req, res) => {
  const {name, lastName, email, password} = req.body

  try {
    const hash = argon2.hashPassword(password)
    const user = prisma.user.create({
    data: {
      name,
      lastName,
      email,
      password: hash
    }
  })

  } catch (error) {
    console.error("Error hashing password:", error)
    return res.status(500).json({
      error: true,
      message: "Erreur lors du hachage du mot de passe"
    })
  }

  const to = email
  const subject = 'Bienvenue sur notre site !'
  const text = `Bonjour ${name},\n\nMerci de vous être inscrit sur notre site. Votre compte a été créé avec succès.\n\nCordialement,\nL'équipe de notre site.`
  try {
    sendEmail(to, subject, text)
  } catch (error) {
    console.error('Error sending email:', error)
  }

  return res.status(201).json({
    error: false,
    message: "Utilisateur créé avec succès"
  })

  res.send('/register')
}