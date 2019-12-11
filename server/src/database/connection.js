import "dotenv/config"
import Sequelize from "sequelize"
// Option 1: Passing parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres'
});

async function getConnectionStatus() {
    try {
        connection = await sequelize.authenticate()
        console.log('Bağlantı Başarıyla Kuruldu. ',connection);
    } catch (err) {
        console.error('Veritabanına bağlanılamıyor:', err);
    }
}

getConnectionStatus()

// Option 2: Passing a connection URI
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');