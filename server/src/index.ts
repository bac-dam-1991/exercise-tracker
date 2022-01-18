import app from './app';
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});

export default server;
