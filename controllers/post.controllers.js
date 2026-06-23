const autorID = require('../models/autor.model')
// identité de l'auteur 
// date de création 
// description 
// note de l'avis 

module.exports = (req, res) => {
  const { author, date, description, rating } = req.body

  const newReview = {
    author: autorID,
    date,
    description,
    rating
  }

  res.send('/add/avis')
}