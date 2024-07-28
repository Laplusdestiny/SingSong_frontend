<template>
    <v-container>
        <v-card max-width="500" class="mx-auto">
            <v-card-actions>
                <v-col>
                    <v-text-field v-model="email" type="email" label="Email"></v-text-field>
                    <v-text-field v-model="password" type="password" label="Password"></v-text-field>
                    <div class="d-flex justify-space-between align-center">
                        <v-btn color="primary" @click="logIn" :disabled="loading">
                            <span v-if="!loading">Login</span>
                            <v-progress-circular v-else indeterminate size="24" color="white"></v-progress-circular>
                        </v-btn>
                        <NuxtLink to="/resetpassword" class="text-right">Reset password</NuxtLink>
                    </div>
                    <v-alert v-if="error" type="error" class="mt-3">
                        {{ error }}
                    </v-alert>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter();

const logIn = async () => {
    loading.value = true;
    error.value = null;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // ユーザー情報をローカルストレージに保存
        localStorage.setItem('auth', 'true');
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid
        }));

        router.push('/mypage');
    } catch (err) {
        error.value = 'Invalid email or password';
        localStorage.setItem('auth', 'false')
    } finally {
        loading.value = false;
    }
};

useHead({
    title: 'Login'
})
</script>

<style scoped>
.v-container {
    justify-content: center;
    align-items: center;
}
</style>
