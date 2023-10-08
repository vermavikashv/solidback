import MESSAGE from "../utils/constants/messages.js";

const requireUser = (request, reply, done) => {
  const user = request.user;
  if (!user) {
    return reply.code(401).send({ message: MESSAGE.unauthorizeError });
  } else {
    done();
  }
};
export const requireAdmin = (request, reply, done) => {
  const user = request.admin;
  request.isAdmin = true;
  if (!user) {
    return reply.code(401).send({ message: MESSAGE.unauthorizeError });
  } else {
    done();
  }
};

export default requireUser;
