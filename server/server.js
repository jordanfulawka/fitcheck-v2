const app = require('./app');
const mongoose = require('mongoose');
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']);
require('dotenv').config();

const port = 3001;

main()
  .then(() => console.log('connection successful'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
