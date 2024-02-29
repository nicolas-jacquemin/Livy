export const auth = {
  login: {
    title: "Connexion",
    fields: {
      email: "Email",
      password: "Mot de passe",
    },
    fieldsRules: {
        emailRequired: "Un email est requis",
        passwordRequired: "Un mot de passe est requis",
    },
    actions: {
      submit: "Se connecter",
      forgot: "Mot de passe oublié ?",
      register: "S'inscrire",
    },
    messages: {
      loading: "Connexion en cours...",
      invalidEmailOrPassword: "Email ou mot de passe invalide",
      tooManyRequests: "Trop de tentatives de connexion... Veuillez réessayer plus tard",
    },
  },
  register: {
    title: "S'inscrire",
    fields: {
      name: "Nom",
      email: "Email",
      password: "Mot de passe",
      confirm: "Confirmation",
      inviteCode: "Code d'invitation",
    },
    fieldsRules: {
        nameRequired: "Un nom est requis",
        nameValid: "Le nom doit faire entre 2 et 30 caractères",
        emailRequired: "Un email est requis",
        mustBeEmail: "Doit être un email valide",
        passwordRequired: "Un mot de passe est requis",
        passwordLength: "Le mot de passe doit faire au moins 8 caractères",
        passwordMatch: "Les mots de passe doivent correspondre",
    },
    actions: {
      submit: "S'inscrire",
      login: "Se connecter",
    },
    messages: {
      loading: "Inscription en cours...",
      error: "Email ou mot de passe invalide",
      tooManyRequests: "Trop de tentatives d'inscription... Veuillez réessayer plus tard",
      invalidInviteCode: "L'inscription est réservée aux invités. Veuillez entrer un code d'invitation valide.",
      registrationDisabled: "L'inscription est actuellement désactivée",
      userAlreadyExists: "L'utilisateur existe déjà",
    },
  },
};
