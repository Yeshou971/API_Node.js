module.exports = (req, res, next) => {
  // Les données de connexion arrivent dans le corps de la requête.
  const { email, password } = req.body

  // L'email et le mot de passe doivent être présents.
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: '[M806] Email et mot de passe requis'
    })
  }

  // Cette expression régulière vérifie qu'un email a un format correct.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({
      error: true,
      message: '[M807] Adresse email invalide'
    })
  }

  // Le mot de passe doit être assez long pour être sécurisé.
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      error: true,
      message: '[M808] Le mot de passe doit contenir au moins 6 caractères'
    })
  }

  next()
}
