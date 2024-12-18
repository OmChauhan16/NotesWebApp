const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notesRoutes.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/notes', notesRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
