const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

//adding user registration data
module.exports.addUserRegistrationInformation = (
    first_name,
    last_name,
    email,
    password_hash,
    url
) => {
    const q = ` INSERT INTO users (first_name, last_name, email, password_hash, url)
                VALUES ($1, $2, $3, $4, $5) RETURNING ID`;
    const params = [first_name, last_name, email, password_hash, url];
    return db.query(q, params);
};

//retreiving user email & password from users database
module.exports.retrivingUserEmail = (email) => {
    const q = ` SELECT users.id, password_hash
                FROM users
                WHERE email = $1`;
    return db.query(q, [email]);
};

//inserting code in to reset_codes DB
module.exports.addResetCode = (code, email) => {
    const q = ` INSERT INTO reset_codes (code, email) VALUES ($1, $2) RETURNING code, email`;
    return db.query(q, [code, email]);
};

//inserting code in to reset_codes DB
module.exports.compareCodeToEmail = () => {
    const q = ` SELECT code, email FROM reset_codes
                WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' `;
    return db.query(q);
};

//Update password of users comparing email.
module.exports.updateUserPassword = (password_hash, email) => {
    const q = ` UPDATE users SET password_hash = $1 
                WHERE email = $2 RETURNING password_hash, email`;
    return db.query(q, [password_hash, email]);
};

//DATABASE insert for uploading the images to AWS
module.exports.addImageUploadToAWS = (url, id) => {
    const q = ` UPDATE users 
                SET url = $1
                WHERE ID = $2 
                RETURNING url, ID, first_name, last_name`;
    return db.query(q, [url, id]);
};
