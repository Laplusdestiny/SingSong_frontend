<template>
    <v-container>
        <v-card max-width="500" class="mx-auto">
            <v-card-actions>
                <v-col>
                    <v-text-field v-model="email" type="email" label="Email"></v-text-field>
                    <v-btn color="primary" @click="resetPassword" :disabled="loading">
                        <span v-if="!loading">Send Reset Link</span>
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
import { ref } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const email = ref('');
const error = ref(null);
const success = ref(null);
const loading = ref(false);

const resetPassword = async () => {
    loading.value = true;
    error.value = null;
    success.value = null;

    try {
        await sendPasswordResetEmail(auth, email.value);
        success.value = 'Password reset link has been sent to your email.';
    } catch (err) {
        console.error(err);
        error.value = 'Failed to send password reset link. Please try again.';
    } finally {
        loading.value = false;
    }
};

useHead({
    title: 'Reset password'
})
</script>

<style scoped>
.v-container {
    justify-content: center;
    align-items: center;
}
</style>
