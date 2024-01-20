

const authBase = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  authLevel: {
    type: Number,
    required: true,
    default: 0,
  },
  idToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  }
}

export default authBase