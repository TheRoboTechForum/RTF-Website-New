const authService = require("../services/authService");

const login = async (req, res) => {
    try {
        const { userId, password } = req.query;

        if (!userId || !password) {
            return res.status(400).json({
                success: false,
                message: "User ID and password are required"
            });
        }

        const result = await authService.loginUser(userId, password);

        if (!result.success) {
            return res.status(401).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    login
};
