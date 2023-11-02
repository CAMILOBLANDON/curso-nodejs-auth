const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5ODQ0OTY0NH0.M-_uMLDPS5ODj3nANjQGrKIn2Ji0T_AJZSOfNr2d9aI';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
