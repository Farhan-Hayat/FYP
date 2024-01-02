const jwt = require("jsonwebtoken");

function generateToken(id, role) {
  console.log(id)
  const token = jwt.sign({ _id: id, role: role }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
  return token;
}

function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const token = req.header('Authorization').split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, "abc111", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded user information to the request for later use
    req.user = decoded;

    // Continue to the next middleware or the controller function
    next();
  });
}

module.exports = {
  generateToken,
  authenticateToken
}
