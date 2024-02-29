<script setup lang="ts">
import type { Ref } from "vue";
import { useLogin } from "@/composables/api/auth/login.api";

definePageMeta({
  layout: "centered-card",
});

const { t } = useI18n();
const loginApi = useLogin();
const router = useRouter();

const fields = reactive({
  email: {
    value: "",
    rules: [
      (): string | boolean =>
        !!fields.email.value || t("views.auth.login.fieldsRules.emailRequired"),
    ],
  },
  password: {
    value: "",
    rules: [
      (): string | boolean =>
        !!fields.password.value ||
        t("views.auth.login.fieldsRules.passwordRequired"),
    ],
  },
});

const emailComponent = ref<HTMLInputElement | undefined>();
let showPassword: Ref<boolean> = ref(false);
let valid: Ref<boolean> = ref(false);
let loader: Ref<boolean> = ref(false);
let error: Ref<boolean> = ref(false);
let errorMessageKey: Ref<string> = ref("");

async function login() {
  if (!valid.value) return;
  const email = fields.email;
  const password = fields.password;
  loader.value = true;
  try {
    const user = await loginApi(email.value, password.value);
    document.cookie = `user=${user.token}; expires=${new Date(
      user.expires
    ).toUTCString()}; path=/;`;
    router.push("/");
  } catch (e: any) {
    loader.value = false;
    error.value = true;
    password.value = "";
    if (e.status == 401) {
      errorMessageKey.value =
        "views.auth.login.messages.invalidEmailOrPassword";
    } else if (e.status == 429) {
      errorMessageKey.value = "views.auth.login.messages.tooManyRequests";
    } else {
      errorMessageKey.value = "glossary.messages.anErrorOccurred";
    }
  }
}

onMounted(() => {
  if (document.cookie.includes("user=")) router.push("/");
  if (emailComponent.value) emailComponent.value.focus();
});
</script>

<template>
  <div>
    <div class="card-title">
      <LogoPrimary class="logo" />
      <VCardTitle class="m-plus fw-900 text-center">{{
        $t("views.auth.login.title")
      }}</VCardTitle>
    </div>
    <VForm class="form px-15 pt-15" v-model="valid" @submit.prevent="login">
      <VTextField
        ref="emailComponent"
        :label="$t(`views.auth.login.fields.email`)"
        v-model="fields.email.value"
        :rules="fields.email.rules"
        type="email"
        required
      ></VTextField>
      <VTextField
        :label="$t(`views.auth.login.fields.password`)"
        v-model="fields.password.value"
        :rules="fields.password.rules"
        :type="showPassword ? 'text' : 'password'"
        required
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      ></VTextField>
      <div class="actions pt-10 pb-5">
        <NuxtLink to="/auth/register"
          ><VBtn color="secondary" variant="text">{{
            $t("views.auth.login.actions.register")
          }}</VBtn></NuxtLink
        >
        <VBtn color="primary" type="submit">{{
          $t("views.auth.login.actions.submit")
        }}</VBtn>
      </div>
    </VForm>
  
    <IndeterminateLoader :info="t('views.auth.login.messages.loading')" v-model="loader"></IndeterminateLoader>
  
    <VDialog v-model="error" persistent max-width="290">
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
