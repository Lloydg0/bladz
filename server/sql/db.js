const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

module.exports.addUserRegistrationInformation = (
    first_name,
    last_name,
    email,
    password_hash
) => {
    const q = ` INSERT INTO users (first_name, last_name, email, password_hash)
                VALUES ($1, $2, $3, $4) RETURING ID`;
    const params = [first_name, last_name, email, password_hash];
    return db.query(q, params);
};
