import authBase from "./AuthBase";

const companyAccount = {
  ...authBase,
  companyName: {
    type: String,
    required: true,
  },
  // other info stored?
}

companyAccount.authLevel.default = 3;

export default companyAccount;