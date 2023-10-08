import adminDetails from "../models/admin.mode.js";
import UserDetalis from "../models/user.model.js";
// import Jwt from "@fastify/jwt";

export const verifyJwt = (Jwt, token) => {
  try {
    const decoded = Jwt.verify(token);
    if (typeof decoded === "object") {
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } else {
      throw new Error("Invalid Jwt");
    }
  } catch (error) {
    console.log(error);
    return {
      valid: false,
      expired: error.code === "FAST_JWT_EXPIRED",
      decoded: null,
    };
  }
};
function deserializer(model, field) {
  return async function (request, reply) {
    const accessToken = (request.headers["authorization"] || "").replace(
      /^Bearer\s/,
      ""
    );

    const refreshToken = (request.headers["authorization"] || "").replace(
      /^Bearer\s/,
      ""
    );

    if (!accessToken) {
      return;
    }
    const { expired, decoded } = verifyJwt(this.jwt, accessToken);

    if (decoded) {
      const currentUser = await model.findById(decoded._id);
      request[field] = currentUser;
    }
    if (expired && refreshToken) {
      const { decoded, expired } = verifyJwt(this.jwt, refreshToken);

      if (expired) {
        return;
      } else {
        const user = await model.findById(decoded._id);
        if (!user) return done();
        request[field] = user;

        const newAccessToken = this.jwt.sign(user._id, {
          expiresIn: process.env.REFRESHTOKEN,
        });

        reply.headers("x-access", newAccessToken);
      }
    }
  };
}

export const deserializedUser = deserializer(UserDetalis, "user");
export const deserializedAdmin = deserializer(adminDetails, "admin");
