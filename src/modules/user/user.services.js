import UserDetalis from "../../models/user.model.js";
import MESSAGE from "../../utils/constants/messages.js";
import bcrypt from "bcrypt";
import mediaDetalis from "../../models/media.js";
import UserpersnalInformation from "../../models/detailModal.js";

export const UserRoles = {
  EMPLOYEE: "EMPLOYEE",
  EMPLOYER: "EMPLOYER",
};

export const updatePasswordtest = async (_id, newPassword) => {
  const user = await UserDetalis.findById({ _id });
  user.password = newPassword;
  await user.save();
  return user;
};

export const getuserdetails = async (_id) => {
  const data = await UserDetalis.aggregate([
    {
      $match: {
        $expr: {
          $eq: ["$_id", _id],
        },
      },
    },
    // {
    //   $facet: {
    //     metadata: [{ $count: "total" }, { $addFields: { page: page } }],
    //     data: [{ $skip: skip }, { $limit: limit }],
    //   },
    // },
    {
      $lookup: {
        from: UserpersnalInformation.collection.name,
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$id"],
              },
            },
          },
        ],
        as: "employee",
      },
    },
  ]);

  return data;
  // const user = await UserDetalis.findById({ _id });
  // return user;
};

/**
 * @param {string} userId
 * @param {string} newPassword
 * @param {string} oldPassword
 * @returns {object}
 */

export const comparepassword = async (enteredpassword, oldPassword) => {
  return await bcrypt.compare(enteredpassword, oldPassword);
};

export const findUser = async (email) => {
  const user = await UserDetalis.findOne({ email });
  return user;
};

/**
* @data {string} firstName 
* @data {string} lastName
* @data {string} email 
* @data {string} role
* @data  {number} phoneNumber
* @data {string} password
* @data {Boolean} isGuest
* @data {string}  providerId
/** */
export const createUser = async (data) => {
  const user = await UserDetalis.create(data);
  return user;
};

export const updateUserDetails = async (id, data) => {
  const user = await UserpersnalInformation.findOneAndUpdate(
    {
      userId: id,
    },
    data
  ).populate("userId");
  return user;
};

/**
 * @payload {string}  gender
 * @payload {string}  province
 * @payload {string}  city
 * @payload {string}  transport
 * @payload {Date}  startwork
 * @payload {string}  constructionExperince
 * @payload {string}  companyName
 * @payload {file}  resume
 * @payload {string}  userId
 */
export const createpernalUserDetails = async (payload, _id) => {
  const media = await mediaDetalis.create({
    path: payload.resume,
    type: payload.mimeType,
  });

  payload.resume = media._id;
  const user = await UserpersnalInformation.create(payload);
  return user;
};
