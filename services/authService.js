const loginUser = async (userId, password) => {
    // Temporary test credentials
    if (userId === "admin" && password === "1234") {
        return {
            success: true,
            message: "Login successful",
            userId: userId
        };
    }

    return {
        success: false,
        message: "Invalid user ID or password"
    };
};

module.exports = {
    loginUser
};
