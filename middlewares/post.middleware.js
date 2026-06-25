module.exports = (req, res, next) => {
  // req.body contient les données envoyées par le client en JSON.
  const { author, date, description, rating } = req.body

  // On vérifie que tous les champs nécessaires sont présents.
  if (!author || !date || !description || !rating) {
    return res.status(400).json({
      error: true,
      message: '[M801] Tous les champs de l\'avis sont requis'
    })
  }

  if (typeof author !== 'string' || author.trim().length < 2) {
    return res.status(400).json({
      error: true,
      message: '[M802] Le nom de l\'auteur est invalide'
    })
  }

  if (typeof description !== 'string' || description.trim().length < 5) {
    return res.status(400).json({
      error: true,
      message: '[M803] La description doit contenir au moins 5 caractères'
    })
  }

  // On transforme la note en nombre pour vérifier qu'elle est correcte.
  const parsedRating = Number(rating)
  if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({
      error: true,
      message: '[M804] La note doit être comprise entre 1 et 5'
    })
  }

  // On transforme la date en objet Date pour vérifier qu'elle est bien formée.
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      error: true,
      message: '[M805] La date est invalide'
    })
  }

  // On remplace les valeurs d'origine par les versions nettoyées et validées.
  req.body.rating = parsedRating
  req.body.date = parsedDate
  next()
}
