module.exports = (req, res, next) => {
  const { email, token, password, confirmPassword } = req.body

  if (!email || !token || !password || !confirmPassword) {
    return res.status(400).json({
      error: true,
      message: '[M815] Email, token, mot de passe et confirmation sont requis'
    })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      error: true,
      message: '[M816] Les mots de passe ne correspondent pas'
    })
  }

  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({
      error: true,
      message: '[M817] Le mot de passe doit contenir au moins 8 caractères'
    })
  }

  next()
}
