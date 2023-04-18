const authService = require('../services/authService');
const defaultApiReturn = require('../utils/defaultApiReturn');

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await authService.authentication({ email, password });

    if (!response) {
      return res.status(200).json(defaultApiReturn({ error: { message: 'Usuário não encontrado' } }));
    }

    return res.status(201).json(defaultApiReturn({ apiResponse: response }));
  }
  catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

module.exports = LoginController;
