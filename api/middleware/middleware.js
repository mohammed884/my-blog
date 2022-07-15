import exportToken from "../utilities/exportToken.js"
export const isAdmin = (req, res, next) => {
    const { ADMIN_PASSWORD } = process.env;
    const decoded = exportToken(req.cookies.token)
    if (!decoded) return res.send({ success: false, message: "Unauthorized" });
    if (ADMIN_PASSWORD !== decoded.password) return res.send({ success: false, message: "Unauthorized" })
    next();
}