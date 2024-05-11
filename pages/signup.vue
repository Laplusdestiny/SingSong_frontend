<template>
    <v-container>
        <v-card max-width="500" class="mx-auto">
            <v-card-actions>
                <v-col>
                    <v-text-field v-model="email" type="email" label="Email"></v-text-field>
                    <v-text-field v-model="password" :error-messages="passwordErrors" type="password"
                        label="Password"></v-text-field>
                    <v-text-field v-model="retypePassword" :error-messages="retypePasswordErrors" type="password"
                        label="Retype"></v-text-field>
                    <v-btn color="primary" @click="signUp"> Sign up </v-btn>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const retypePassword = ref('')

const passwordErrors = computed(() => {
    const errors = []
    if (password.value.length == 0) {

    }
    else if (password.value.length < 8) {
        errors.push('パスワードは8文字以上で入力してください')
    }
    else if (password.value !== retypePassword.value) {
        errors.push('パスワードが一致していません')
    }
    return errors
})

const retypePasswordErrors = computed(() => {
    const errors = []
    if (retypePassword.value !== password.value) {
        errors.push('パスワードが一致していません')
    }
    return errors
})

const signUp = () => {
    // サインアップ処理を実装する
    console.log('Email:', email.value)
    console.log('Password:', password.value)
}
</script>
