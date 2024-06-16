<template>
    <v-container>
        <v-card max-width="500" class="mx-auto">
            <v-card-text>
                <h1>Welcome to your My Page!</h1>
                <p v-if="user">User UID: {{ user.uid }}</p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref(null);

onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.value = JSON.parse(storedUser);
    }
});
</script>

<style scoped>
.v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
