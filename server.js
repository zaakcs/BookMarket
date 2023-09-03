const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// Configuração do Express
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'sua-chave-secreta',
  resave: false,
  saveUninitialized: true
}));

// Rota raiz
app.get('/', (req, res) => {
  res.render('register', { title: 'Cadastro' });
});

// Rota de cadastro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Aqui você pode adicionar o código para salvar o usuário em um arquivo, se desejar.
    // Por simplicidade, este exemplo não salva o usuário em nenhum lugar.
    res.redirect('/login');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.render('register', { title: 'Cadastro', error: null });
  }
});

// Rota de login
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Rota de autenticação de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Aqui você pode adicionar o código para autenticar o usuário, se desejar.
    // Por simplicidade, este exemplo não realiza a autenticação.
    req.session.user = { username }; // Simulando um usuário logado na sessão
    return res.redirect('/dashboard');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.render('login', { title: 'Login', error: 'Erro ao fazer login' });
  }
});

// Rota do painel de controle
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    const { username } = req.session.user;
    return res.render('dashboard', { title: 'Dashboard', username });
  } else {
    return res.redirect('/login');
  }
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Rota de agendamento
app.get('/agendamento', (req, res) => {
  res.render('agendamento', { title: 'Agendamento' });
});

// Rota de chat de vídeo
app.get('/chat_video', (req, res) => {
  res.render('chat_video', { title: 'Chat de Vídeo' });
});

// Rota de chat de texto
app.get('/chat_texto', (req, res) => {
  res.render('chat_texto', { title: 'Chat de Texto' });
});

const path = require('path');

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

app.get('/video_call', (req, res) => {
  res.sendFile(path.join(__dirname, 'video_call.html'));
});
