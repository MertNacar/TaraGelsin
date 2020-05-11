import crypto from "crypto"
import "dotenv/config"

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    // iterasyon değeri belirlenir / hash işlemi için değerler ayar dosyasından alınır.
    let userPassword;
    let byte = Number(process.env.HASH_BYTE);
    let digest = process.env.HASH_DIGEST;
    let iteration = Math.ceil((1 + Math.random()) * 280000);

    // Rastgele olarak hash şifreye eklemek için tuz(salt) değeri oluşturulur.
    crypto.randomBytes(byte, (err, salt) => {
      if (err) {
        return reject(err);
      }

      let saltHex = salt.toString("hex");

      // Kayıt için şifre hash işlemi geçirir.
      crypto.pbkdf2(password, saltHex, iteration, byte, digest, (err, hash) => {
        if (err) {
          return reject(err);
        }
        // tuz (salt), hashlenmiş şifre ve iterasyon değeri veri tabanı için formatlanır.
        let hashHEX = hash.toString("hex");
        userPassword = `${iteration}:${hashHEX}:${saltHex}`;
        // formatlanmış veri döndürülür.
        return resolve(userPassword);
      });
    });
  });
}

function verifyPassword(password, hashed) {
  return new Promise((resolve, reject) => {
    //ayar dosyalardan bilgilerin alınması
    let IndexIteration = process.env.HASH_ITERATION;
    let IndexSalt = process.env.HASH_SALT;
    let IndexHash = process.env.HASH_HASHING;
    let byte = Number(process.env.HASH_BYTE);
    let digest = process.env.HASH_DIGEST;

    //Formatlanmış şifre verisinin ayrıştırılması
    let hashedPass = hashed.toString("hex").split(":");
    let salt = hashedPass[IndexSalt];
    let iteration = parseInt(hashedPass[IndexIteration]);
    let hash = hashedPass[IndexHash];

    // Girilen şifrenin hashlenerek kontol edilmesi
    crypto.pbkdf2(password, salt, iteration, byte, digest, (err, verify) => {
      if (err) {
        return reject(err);
      } else {
        //giriş için doğru(true) veya yanlış(false) değer döner
        return resolve(verify.toString("hex") === hash);
      }
    });
  });
}

export { hashPassword, verifyPassword }