import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose';
import cors from 'cors'; 

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/monitorManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');


  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

app.use(express.json());
app.use(cors());
app.use('/api', routes);


app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});

