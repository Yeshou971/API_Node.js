const MiddlewareRegister = (req, res, next) => {

    const { firstname, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        return res.status(409).json({
            error: true,
            message: "[M802] Les mots de passe ne correspondent pas"
        })
    }

    if (!firstname || !email || !password || !confirmPassword) {
        return res.status(400).json({
            error: true,
            message: "[M803] Tous les champs sont requis"
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
            error: true,
            message: "[M804] Le mot de passe doit contenir au moins 8 caractères"
        })
    }
  
    next()
}

module.exports = MiddlewareRegister