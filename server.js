cat <<EOF > server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from E-commerce App!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
EOF
