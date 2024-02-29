<script setup lang="ts">
import type { Ref } from "vue";
import { useRegister } from "@/composables/api/auth/register.api";

definePageMeta({
  layout: "centered-card",
});

const { t } = useI18n();
const registerApi = useRegister();
const saveTokenToCookies = useSaveTokenToCookies();
const router = useRouter();

const fields = reactive({
  name: {
    value: "",
    rules: [
      (): string | boolean =>
        !!fields.name.value || t("views.auth.register.fieldsRules.nameRequired"),
      (): string | boolean =>
        (fields.name.value.length >= 2 && fields.name.value.length <= 30) ||
        t("views.auth.register.fieldsRules.nameValid"),
    ],
  },
  email: {
    value: "",
    rules: [
      (): string | boolean =>
        !!fields.email.value || t("views.auth.register.fieldsRules.emailRequired"),
      (): string | boolean =>
        /.+@.+\..+/.test(fields.email.value) ||
        t("views.auth.register.fieldsRules.mustBeEmail"),
    ],
  },
  password: {
    value: "",
    rules: [
      (): string | boolean =>
        !!fields.password.value ||
        t("views.auth.register.fieldsRules.passwordRequired"),
      (): string | boolean =>
        fields.password.value.length >= 8 ||
        t("views.auth.register.fieldsRules.passwordLength"),
    ],
  },
  confirmPassword: {
    value: "",
    rules: [
      (): string | boolean =>
        fields.confirmPassword.value === fields.password.value ||
        t("views.auth.register.fieldsRules.passwordMatch"),
    ],
  },
  inviteCode: {
    value: "",
  },
});

const nameComponent = ref<HTMLInputElement | undefined>();
let showPassword: Ref<boolean> = ref(false);
let valid: Ref<boolean> = ref(false);
let loader: Ref<boolean> = ref(false);
let error: Ref<boolean> = ref(false);
let errorMessageKey: Ref<string> = ref("");

async function register() {
  if (!valid.value) return;
  const name = fields.name;
  const email = fields.email;
  const password = fields.password;
  const inviteCode = fields.inviteCode;
  loader.value = true;
  try {
    const user = await registerApi(name.value, email.value, password.value, inviteCode.value);
    saveTokenToCookies(user.token, user.expires);
    router.push("/");
  } catch (e: any) {
    loader.value = false;
    error.value = true;
    password.value = "";
    fields.confirmPassword.value = "";
    if (e.status == 401) {
      errorMessageKey.value =
        "views.auth.register.messages.invalidEmailOrPassword";
    } else if (e.status == 429) {
      errorMessageKey.value = "views.auth.register.messages.tooManyRequests";
    } else if (e.data?.message === "Invite code is not valid.") {
      errorMessageKey.value = "views.auth.register.messages.invalidInviteCode";
    } else if (e.data?.message === "Email already exists.") {
      errorMessageKey.value = "views.auth.register.messages.userAlreadyExists";
    } else if (e.data?.message === "Registration is currently disabled.") {
      errorMessageKey.value = "views.auth.register.messages.registrationDisabled";
    } else {
      errorMessageKey.value = "glossary.messages.anErrorOccurred";
    }
  }
}

onMounted(() => {
  if (document.cookie.includes("userToken=")) router.push("/");
  if (nameComponent.value) nameComponent.value.focus();
});
</script>

<template>
  <div>
    <div class="card-title">
      <LogoPrimary class="logo" />
      <VCardTitle class="m-plus fw-900 text-center">{{
        $t("views.auth.register.title")
      }}</VCardTitle>
    </div>
    <VForm class="form px-15 pt-15" v-model="valid" @submit.prevent="register">
      <VTextField
        ref="nameComponent"
        :label="$t(`views.auth.register.fields.name`)"
        v-model="fields.name.value"
        :rules="fields.name.rules"
        type="text"
        required
      ></VTextField>
      <VTextField
        :label="$t(`views.auth.register.fields.email`)"
        v-model="fields.email.value"
        :rules="fields.email.rules"
        type="email"
        required
      ></VTextField>
      <VTextField
        :label="$t(`views.auth.register.fields.password`)"
        v-model="fields.password.value"
        :rules="fields.password.rules"
        :type="showPassword ? 'text' : 'password'"
        required
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      ></VTextField>
      <VTextField
        :label="$t(`views.auth.register.fields.confirm`)"
        v-model="fields.confirmPassword.value"
        :rules="fields.confirmPassword.rules"
        :type="showPassword ? 'text' : 'password'"
        required
      ></VTextField>
      <VTextField
        :label="$t(`views.auth.register.fields.inviteCode`)"
        v-model="fields.inviteCode.value"
      ></VTextField>
      <div class="actions pt-10 pb-5">
        <NuxtLink to="/auth/login"
          ><VBtn color="secondary" variant="text">{{
            $t("views.auth.register.actions.login")
          }}</VBtn></NuxtLink
        >
        <VBtn color="primary" type="submit">{{
          $t("views.auth.register.actions.submit")
        }}</VBtn>
      </div>
    </VForm>
  
    <IndeterminateLoader :info="t('views.auth.register.messages.loading')" v-model="loader"></IndeterminateLoader>
  
    <VDialog v-model="error" persistent max-width="500">
      <v-card>
        <VCardTitle class="text-h5">
          {{ $t("glossary.messages.error") }}
        </VCardTitle>
        <VCardText>{{ $t(errorMessageKey) }}</VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="primary" variant="text" @click="error = false">
            {{ $t("glossary.actions.close") }}
          </VBtn>
        </VCardActions>
      </v-card>
    </VDialog>
  </div>
</template>

<style scoped lang="scss">
.card-title {
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    height: 48px;
    width: 48px;
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
