const bcrypt = require('bcrypt');

const hash = "$2b$10$kRHD41L1lYDiHGtAoDs7P.icFG80BZRkmJV/L.8XWfSIl7xHaaq96";
const password = "123";

bcrypt.compare(password, hash).then(match => {
  console.log("Manual check password match:", match);
});
