
import app from '../app.js';
import config from './config/config.js'; 

app.listen(config.PORT, () => {
  console.log(`Servidor rodando na porta ${config.PORT}`);
});