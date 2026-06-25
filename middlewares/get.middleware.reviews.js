const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // On récupère la valeur de l'en-tête Authorization envoyé par le client.
  // Exemple : "Bearer abc123". On garde uniquement la partie après "Bearer".
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  // Si aucun token n'est envoyé, l'accès est refusé.
  if (!token) {
    return res.status(401).json({
      error: true,
      message: '[M811] Token d\'authentification manquant'
    })
  }

  try {
    // On vérifie que le token est valide avec la clé secrète.
    // Si tout est correct, on récupère les données de l'utilisateur à l'intérieur.
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = decoded
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: '[M812] Token d\'authentification invalide'
    })
  }

  next()
}