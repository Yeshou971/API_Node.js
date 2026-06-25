module.exports = (req, res) => {
  const { id } = req.params

  return res.json({
    error: false,
    message: 'Avis autorisé avec succès',
    id
  })
}
