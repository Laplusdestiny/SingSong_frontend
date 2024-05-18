<template>
    <v-container>
        <v-card max-width="500" class="mx-auto">
            <v-card-actions>
                <v-col>
                    <v-text-field v-model="name" type="text" label="Name"></v-text-field>
                    <v-text-field v-model="password" :error-messages="passwordErrors" type="password"
                        label="Password"></v-text-field>
                    <v-text-field v-model="retypePassword" :error-messages="retypePasswordErrors" type="password"
                        label="Retype"></v-text-field>
                    <v-btn color="primary" @click="signUp"
                        :disabled="loading || passwordErrors.length > 0 || retypePasswordErrors.length > 0">
                        <span v-if="!loading">Sign up</span>
                        <v-progress-circular v-else indeterminate size="24" color="white"></v-progress-circular>
                    </v-btn>
                    <v-alert v-if="error" type="error">
                        {{ error }}
                    </v-alert>
                    <v-alert v-if="success" type="success">
                        {{ success }}
                    </v-alert>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useRouter } from 'vue-router';

const name = ref('');
const password = ref('');
const retypePassword = ref('');
const error = ref(null);
const success = ref(null);
const loading = ref(false);
const router = useRouter();

const passwordErrors = computed(() => {
    const errors = [];
    if (password.value.length === 0) {
        // errors.push('パスワードを入力してください');
    } else if (password.value.length < 8) {
        errors.push('パスワードは8文字以上で入力してください');
    } else if (password.value !== retypePassword.value) {
        errors.push('パスワードが一致していません');
    }
    return errors;
});

const retypePasswordErrors = computed(() => {
    const errors = [];
    if (retypePassword.value !== password.value) {
        errors.push('パスワードが一致していません');
    }
    return errors;
});

const signUp = async () => {
    loading.value = true;
    error.value = null;
    success.value = null;

    try {
        // 既存のユーザーを確認
        const response = await axios.get(`http://localhost:3050/users?name=${name.value}`);
        if (response.data.length > 0) {
            error.value = 'このユーザー名は既に使用されています';
            loading.value = false;
            return;
        }

        // パスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(password.value, 10);

        // 新しいユーザーを追加
        await axios.post('http://localhost:3050/users', {
            name: name.value,
            password: hashedPassword
        });

        success.value = 'ユーザー登録が成功しました！';

        // 5秒後にログインページにリダイレクト
        setTimeout(() => {
            router.push('/login');
        }, 5000);
    } catch (err) {
        error.value = 'サインアップ中にエラーが発生しました';
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
