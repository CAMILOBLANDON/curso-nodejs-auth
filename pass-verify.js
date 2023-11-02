const bcrypt = require('bcrypt');

async function verifyPassword(password) {
  const hash = '$2b$10$t/RFayLFvI/r6ZQcUDTUYebko.ZawWY85d0ewAGuTFEleZgWn5fiK';
  const compare = await bcrypt.compareSync(password, hash);
  console.log(compare);
  return compare;
}
verifyPassword('myPassword');
