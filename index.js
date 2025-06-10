const express = require('express'); 
const cors = require('cors');
const path = require('path');
const app = express();

console.log('PORT from env:', process.env.PORT);

const PORT = process.env.PORT || 5000;

// ✅ CORS
app.use(cors({
  origin: ['https://frontend-production-0e8f.up.railway.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ❗️ВАЖНО: НЕ ПАРСИРУЕМ JSON перед multipart/form-data
app.use(express.json()); // Только для обычных JSON-запросов

// 🛠 Роуты
const componentsRouter = require('./routes/components');
const usersRouter = require('./routes/users');
const lkmRouter = require('./routes/lkm');

app.use('/api/components', componentsRouter);
app.use('/api/users', usersRouter);
app.use('/api', lkmRouter);

// 🔎 Тест
app.get('/test', (req, res) => {
  res.json({ message: 'CORS работает!' });
});

// 🚀 Запуск
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
