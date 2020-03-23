const db = require("../../database/dbConfig");

const addUser = async newUser => {
    return (
        db("users")
            .insert(newUser)
    )
}

const findUsersBy = filter => db("users").where(filter)



module.exports = {
    addUser,
    findUsersBy,
}
