<script setup lang="ts">
import type { Ref } from "vue";

let email: Ref<string> = ref("");
let emailRef: Ref<HTMLInputElement | undefined> = ref();
let emailRules = computed((v: string) => {
    console.log(v)
    return [
        !!v || "Email is required"
    ]
})
let password: Ref<string> = ref("");
let passwordRules = computed((v: string) => {
    return [
        !!v || "Email is required"
    ]
})
let showPassword: Ref<boolean> = ref(false);
let valid: Ref<boolean> = ref(false);
let loader: Ref<boolean> = ref(false);
let error: Ref<boolean> = ref(false);
let errorMessage: Ref<string> = ref("");

async function login() {
    if (valid.value) {
        loader.value = true;
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(`user=${data.token}; expires=${new Date(data.expires).toUTCString()}; path=/;`);
                    document.cookie = `user=${data.token}; expires=${new Date(data.expires).toUTCString()}; path=/;`;
                })
            }
            else {
                loader.value = false;
                error.value = true;
                password.value = "";
                if (res.status == 401) {
                    errorMessage.value = 'Invalid email or password';
                }
                else if (res.status == 429) {
                    errorMessage.value = 'Too many login attempts... Please try again later';
                }
                else {
                    errorMessage.value = 'An error occurred';
                }
            }
        })
    }
}

onMounted(() => {
    if (emailRef.value)
        emailRef.value.focus();
});
</script>

<template>
    <div>
        {{ valid }}
        <div class="container">
            <div class="loginCard">
                <v-form class="form" v-model="valid" @submit.prevent="login">
                    <v-text-field class="input" type="email" v-model="email" label="Email" required ref="emailRef"
                        :rules="emailRules"></v-text-field>
                    <v-text-field class="input" v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'" label="Password" required
                        @click:append="showPassword = !showPassword"
                        :rules="passwordRules"></v-text-field>
                    <div class="actions">
                        <nuxt-link to="/auth/register"><v-btn text>Register</v-btn></nuxt-link>
                        <v-btn color="primary" type="submit">Login</v-btn>
                    </div>
                </v-form>
            </div>
            <IndeterminateLoader v-model="loader"></IndeterminateLoader>

            <v-dialog v-model="error" persistent max-width="290">
                <v-card>
                    <v-card-title class="text-h5">
                        Error
                    </v-card-title>
                    <v-card-text>{{ errorMessage }}</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="error = false">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
}

.loginCard {
    height: 300px;
    width: 100%;
    max-width: 700px;

    .form {
        height: 200px;
    }
}

.actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0px 20px;
    margin-top: 50px;
}
</style>