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

// selecting all from userhomepage
module.exports.selectingUserInfo = (id) => {
    const q = ` SELECT id, first_name, last_name, url, bio
                FROM users
                WHERE id = $1`;
    return db.query(q, [id]);
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
    console.log("url, id", url, id);
    const q = ` UPDATE users 
                SET url = $1
                WHERE ID = $2 
                RETURNING url, ID, first_name, last_name`;
    return db.query(q, [url, id]);
};

//DATABASE inswert for for adding bio
module.exports.updateUserBio = (bio, id) => {
    const q = ` UPDATE users
                SET bio = $1
                WHERE ID = $2
                RETURNING bio, ID`;
    return db.query(q, [bio, id]);
};

// Database select for other users profiles
module.exports.retrivingOtherUserProfileInformation = (id) => {
    const q = ` SELECT id, first_name, last_name, url, bio
                FROM users
                WHERE id= $1
                `;
    return db.query(q, [id]);
};

//Getting 3 newest users from Database
module.exports.showingTopThreeUsers = () => {
    const q = ` SELECT id, first_name, last_name, url
                FROM users
                ORDER BY id DESC
                LIMIT 6`;
    return db.query(q);
};

// Searching the Database for other users
module.exports.searchForOtherUsers = (input) => {
    const q = ` SELECT id, first_name, last_name, url
                FROM users
                WHERE (first_name || last_name) ILIKE $1
                ORDER BY id DESC
                LIMIT 9
                `;
    return db.query(q, [input + "%"]);
};

// Querying the friendships DATABASE to find the connection for adding users buttons
module.exports.decideFriendshipButtonToSend = (recipient_id, sender_id) => {
    const q = ` SELECT * FROM friendships
                WHERE (recipient_id = $1 AND sender_id = $2)
                OR (recipient_id = $2 AND sender_id = $1);`;
    return db.query(q, [recipient_id, sender_id]);
};

// inserting friend request into database
module.exports.friendRequestSent = (recipient_id, sender_id, accepted) => {
    const q = ` INSERT INTO friendships (recipient_id, sender_id, accepted)
                VALUES ($1, $2, $3)
                RETURNING accepted`;
    return db.query(q, [recipient_id, sender_id, accepted]);
};
// updating database when friend request is sent
module.exports.acceptRequestSent = (recipient_id, sender_id) => {
    // const q = ` UPDATE friendships
    //             SET recipient_id = $1, sender_id = $2, accepted =  $3
    //             RETURNING accepted`;
    const q = `
        UPDATE friendships
        SET accepted = true
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (recipient_id = $1 AND sender_id = $2)
        RETURNING id
        `;
    return db.query(q, [recipient_id, sender_id]);
};
// deleteing friend request from database
module.exports.deleteFriend = (recipient_id, sender_id) => {
    const q = ` DELETE FROM friendships
                WHERE (recipient_id = $1 AND sender_id = $2)
                OR (recipient_id = $2 AND sender_id = $1)`;
    return db.query(q, [recipient_id, sender_id]);
};

//  returning a list of friends or friend requests from the Database
module.exports.selectingFriendsOrFriendRequests = (id) => {
    const q = ` SELECT users.id, first_name, last_name, url, accepted
                FROM friendships
                JOIN users
                ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
                OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
                OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`;
    return db.query(q, [id]);
};

// getting the 10 most receient messages
module.exports.getting10MostRecentMessages = () => {
    const q = `SELECT users.id, first_name, last_name, url, sender_id, text, messages.created_at
                FROM messages
                JOIN users
                ON users.id = messages.sender_id
                ORDER BY messages.created_at DESC
                LIMIT 10`;
    return db.query(q);
};

// inserting a new message
module.exports.insertNewMessage = (sender_id, text) => {
    const q = `INSERT INTO messages (sender_id, text)
                VALUES ($1, $2)
                RETURNING ID, sender_id, text`;
    return db.query(q, [sender_id, text]);
};

// // retrieving latest messgage
module.exports.retrieveInsertedNewMessage = (sender_id) => {
    const q = `SELECT users.id, first_name, last_name, url, sender_id, text, messages.created_at
                FROM messages
                JOIN users
                ON users.id = sender_id
                WHERE sender_id = $1
                ORDER BY messages.id DESC
                LIMIT 1`;
    return db.query(q, [sender_id]);
};

// getting the 5 most receient messages
module.exports.latestComments = (id) => {
    const q = `SELECT users.id, first_name, last_name, url, recipient_id, sender_id, comment_text, comments.created_at
                FROM comments
                JOIN users
                ON sender_id = users.id
                WHERE recipient_id = $1
                ORDER BY comments.created_at DESC
                LIMIT 5`;
    return db.query(q, [id]);
};

//DATABASE insert for posting comments
module.exports.postingComments = (recipient_id, sender_id, comment_text) => {
    const q = ` INSERT INTO comments (recipient_id, sender_id, comment_text)
                VALUES ($1, $2, $3)
                RETURNING recipient_id, sender_id, comment_text`;
    const params = [recipient_id, sender_id, comment_text];
    return db.query(q, params);
};
//DATABASE select for getting the latest comments
module.exports.retrievePostedComment = (recipient_id, sender_id) => {
    const q = ` SELECT users.id, first_name, last_name, url, comments.comment_text, comments.created_at 
                FROM comments
                JOIN users
                ON users.id = sender_id
                WHERE (sender_id = $1 AND recipient_id = $2)
                OR (recipient_id = $1 AND sender_id = $2)
                ORDER BY comments.id DESC
                LIMIT 1`;
    return db.query(q, [recipient_id, sender_id]);
};

// deleting user from user table
module.exports.deleteUserFromUsers = (id) => {
    const q = ` DELETE FROM users
                WHERE ID = $1`;
    return db.query(q, [id]);
};
// deleting user from Messages table
module.exports.deleteUserFromMessages = (id) => {
    const q = ` DELETE FROM messages
                WHERE ID = $1`;
    return db.query(q, [id]);
};

// deleting user from comments table
module.exports.deleteUserFromComments = (id) => {
    const q = ` DELETE FROM comments
                WHERE ID = $1`;
    return db.query(q, [id]);
};
