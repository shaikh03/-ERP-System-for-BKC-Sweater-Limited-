import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token: ", token);
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, "sEcReT");
      console.log("Decode Data:", decodedData);
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
