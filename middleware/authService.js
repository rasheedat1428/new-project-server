import jwt from 'jsonwebtoken';

export const generateToken = async (payload, options = {expiresIn: 800000000000}) => {
    const token = await jwt.sign(payload, process.env.AUTH_SECRET_KEY, options);
    return token;
};

export const decodeToken = async(token) => {
    const decoded = await jwt.verify(token, process.env.AUTH_SECRET_KEY);
    return decoded; 
};

export const authenticate = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken && bearerToken.startsWith("Bearer ")) {
        const token = bearerToken.split(" ")[1];
        try {
            const payload = await decodeToken(token);
            req.payload = payload;
        } catch (err) {
            console.log(err.message);
        }
    }
    next();
};
