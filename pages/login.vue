<template>
    <v-container>
        <v-card max-width="500" class="mx-auto">
            <v-card-actions>
                <v-col>
                    <v-text-field v-model="name" type="text" label="Name"></v-text-field>
                    <v-text-field v-model="password" type="password" label="Password"></v-text-field>
                    <v-btn color="primary" @click="logIn" :disabled="loading">
                        <span v-if="!loading">Login</span>
                        <v-progress-circular v-else indeterminate size="24" color="white"></v-progress-circular>
                    </v-btn>
                    <v-alert v-if="error" type="error">
                        {{ error }}
                    </v-alert>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useRouter } from 'vue-router';

const name = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter();

const logIn = async () => {
    loading.value = true;
    error.value = null;

    try {
        // ユーザー情報の取得
        const response = await axios.get(`http://localhost:3050/users?name=${name.value}`);
        if (response.data.length === 0) {
            error.value = 'Invalid name or password';
            loading.value = false;
            return;
        }

        const user = response.data[0];
        const isValidPassword = await bcrypt.compare(password.value, user.password);

        if (isValidPassword) {
            // ユーザー情報をローカルストレージに保存
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/mypage');
        } else {
            error.value = 'Invalid name or password';
        }
    } catch (err) {
        error.value = 'An error occurred during login';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.v-container {
    justify-content: center;
    align-items: center;
}
</style>
