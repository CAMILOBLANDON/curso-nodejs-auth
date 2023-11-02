const bcrypt = require('bcrypt');

const myPassword = 'myPassword';

// const hash = bcrypt.hashSync(myPassword, 10);
// console.log(hash);
// async function hashPassword(password) {
//   const pass = await bcrypt.hash(password, 10);
//   console.log(pass);
//   return pass;
// }
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}
// console.log(hashPassword(myPassword));
hashPassword(myPassword);
