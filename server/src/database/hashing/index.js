import crypto from "crypto"
import "dotenv/config"

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        // set iteration value / get byte and digest value from config
        let userPassword;
        let byte = process.env.HASH_BYTE;
        let digest = process.env.HASH_DIGEST;
        let iteration = Math.ceil((1 + Math.random()) * 280000);

        //set salt with randombytes
        crypto.randomBytes(byte, (err, salt) => {
            if (err) {
                return reject(err);
            }

            let saltHex = salt.toString("hex");

            //hash password for signup
            crypto.pbkdf2(password, saltHex, iteration, byte, digest, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                //format hashed password, salt and iterations for storage database
                let hashHEX = hash.toString("hex");
                userPassword = `${iteration}:${hashHEX}:${saltHex}`;
                //return format data
                return resolve(userPassword);
            });
        });
    });
}

function verifyPassword(password, hashed) {
    return new Promise((resolve, reject) => {
        //from config get information
        let IndexIteration = process.env.HASH_ITERATION;
        let IndexSalt = process.env.HASH_SALT;
        let IndexHash = process.env.HASH_HASHING;
        let byte = process.env.HASH_BYTE;
        let digest = process.env.HASH_DIGEST;

        //divide hash that will assign to values
        let hashedPass = hashed.toString("hex").split(":");
        let salt = hashedPass[IndexSalt];
        let iteration = parseInt(hashedPass[IndexIteration]);
        let hash = hashedPass[IndexHash];

        //hash parameter password
        crypto.pbkdf2(password, salt, iteration, byte, digest, (err, verify) => {
            if (err) {
                return reject(err);
            } else {
                //true or false for login
                return resolve(verify.toString("hex") === hash);
            }
        });
    });
}

export { hashPassword, verifyPassword }