import app from './app';
const PORT = process.env.PORT || 3001;

const server = app.listen(() => {
  console.log(`Listening on port ${PORT}...`);
});

export default server;
