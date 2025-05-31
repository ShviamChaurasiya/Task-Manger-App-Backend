const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // sync DB (use { force: true } to drop & recreate)
    console.log('✅ Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to sync database or start server:', error);
  }
})();
