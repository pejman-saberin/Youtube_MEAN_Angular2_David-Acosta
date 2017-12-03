//copied from https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback and customziedz
// Asynchronous
const crypto = require('crypto').randomBytes(256).toString();

module.exports={
  uri: 'mongodb://pejman:111111@ds129796.mlab.com:29796/mean',
  secret:crypto,
  db:'mean'
}
