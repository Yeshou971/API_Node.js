module.exports = (req, res, next) => {
    console.log('Middleware exécuté avant le controleur')
    next()
}