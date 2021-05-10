const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

//adding user registration data
module.exports.addUserRegistrationInformation = (
    first_name,
    last_name,
    email,
    password_hash
) => {
    const q = ` INSERT INTO users (first_name, last_name, email, password_hash)
                VALUES ($1, $2, $3, $4) RETURNING ID`;
    const params = [first_name, last_name, email, password_hash];
    return db.query(q, params);
};

//retreiving user email & password from users database
module.exports.retrivingUserEmail = (email) => {
    const q = ` SELECT users.id, password_hash
                FROM users
                WHERE email = $1`;
    return db.query(q, [email]);
};
