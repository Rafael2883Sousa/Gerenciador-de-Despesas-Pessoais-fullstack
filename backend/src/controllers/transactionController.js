exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, category, date, description } = req.body;
    // TODO: Implementar inserção no banco usando model
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};