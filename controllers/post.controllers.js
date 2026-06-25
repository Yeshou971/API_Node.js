const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  const { author, date, description, rating } = req.body

  try {
    const review = await prisma.review.create({
      data: {
        name: author,
        date,
        rating,
        description
      }
    })

    return res.status(201).json({
      error: false,
      message: 'Avis créé avec succès',
      review
    })
  } catch (error) {
    console.error('Erreur POST /add/avis :', error)
    return res.status(500).json({
      error: true,
      message: 'Erreur lors de la création de l\'avis'
    })
  }
}