
// identité de l'auteur 
// date de création 
// description 
// note de l'avis 

module.exports = (req, res) => {
  const { author, date, description, rating } = req.body

  

  res.send('/add/avis')
}