const MiddlewareReviewsId = (req, res, next) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            error: true,
            message: "[M805] L'identifiant de l'avis est requis"
        })
    }
}

module.exports = MiddlewareReviewsId