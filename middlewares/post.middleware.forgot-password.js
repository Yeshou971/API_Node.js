module.exports = (req, res, next) => {
  const { email } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      error: true,
      message: '[M813] Une adresse email est requise'
    })
  }

  // On veut contrôler qu'un email ressemble à : texte@domaine.com
  // - [^\s@]+ : au moins un caractère qui n'est ni un espace ni @
  // - @ : il doit y avoir un arobase
  // - \.[^\s@]+ : ensuite un point suivi d'au moins un caractère
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: true,
      message: '[M814] Adresse email invalide'
    })
  }

  next()
}
