export const auth = {
  login: {
    title: "Login",
    fields: {
      email: "Email",
      password: "Password",
    },
    fieldsRules: {
      emailRequired: "Email is required",
      passwordRequired: "Password is required",
    },
    actions: {
      submit: "Login",
      forgot: "Forgot your password?",
      register: "Register",
    },
    messages: {
      loading: "Logging in...",
      invalidEmailOrPassword: "Invalid email or password",
      tooManyRequests: "Too many login attempts... Please try again later",
    },
  },
  register: {
    title: "Register",
    fields: {
      name: "Name",
      email: "Email",
      password: "Password",
      confirm: "Confirm Password",
      inviteCode: "Invite Code",
    },
    fieldsRules: {
      nameRequired: "Name is required",
      nameValid: "Name must be between 2 and 30 characters long.",
      emailRequired: "Email is required",
      mustBeEmail: "Must be a valid email",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 8 characters long",
      passwordMatch: "Passwords must match",
    },
    actions: {
      submit: "Register",
      login: "Login",
    },
    messages: {
      loading: "Registering...",
      error: "Invalid email or password",
      tooManyRequests: "Too many register attempts... Please try again later",
      invalidInviteCode: "Registration is restricted to invitees only. Please enter a valid invite code.",
      registrationDisabled: "Registration is currently disabled",
      userAlreadyExists: "User already exists",
    },
  },
};
