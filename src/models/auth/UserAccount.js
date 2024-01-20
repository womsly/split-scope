import authBase from "./AuthBase";

const userAccount = {
  ...authBase,
  companyId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    maxLength: 50,
    required: true,
  },
  lastName: {
    type: String,
    maxLength: 50,
    required: true,
  }
}

export default userAccount;