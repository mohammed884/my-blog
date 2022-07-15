import jwt from "jsonwebtoken"
const exportToken = token => {
    const {JWT_SECRET, ADMIN_PASSWORD} = process.env
    const decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return null
        if (decoded.password !== ADMIN_PASSWORD) return null;
        else return decoded;
    });
    return decoded;
}
export default exportToken;