module.exports = (req, res, next) => {
  const { id } = req.params
  const reviewId = Number(id)

  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    return res.status(400).json({
      error: true,
      message: '[M809] L\'identifiant de l\'avis est invalide'
    })
  }

  next()
}
