import Sequelize from "sequelize"
// Option 1: Passing parameters separately
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'postgres'
});
async function getConnectionStatus() {
    try {
        connection = await sequelize.authenticate()
        console.log('Bağlantı Başarıyla Kuruldu.');
    } catch (err) {
        console.error('Veritabanına bağlanılamıyor:', err);
    }
}
getConnectionStatus()

// Option 2: Passing a connection URI
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');