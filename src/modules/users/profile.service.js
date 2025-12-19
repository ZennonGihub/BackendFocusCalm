import boom from "@hapi/boom";
import Profile from "./../models/users.model.js";

class ProfileServices {
  async findOne(id) {
    const userFound = await User.findById(id);
    if (!userFound) {
      throw boom.notFound("user not found");
    }
    return userFound;
  }
}
