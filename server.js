const dotevn = require('dotenv');
dotevn.config({ path: './config.env' });
const app = require('./app');
const port = process.env.PORT || 3000;

// console.log(process.env);

app.listen(port, () => {
  console.log(`Server loading from port ${port}`);
});
