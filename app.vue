<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        <v-btn to="/">
          <v-icon icon="mdi-music"></v-icon>
        </v-btn>
        SingSong
        <v-btn to="/about">
          <v-icon icon="mdi-information" size="large"></v-icon>
          <v-tooltip activator="parent" location="bottom">About</v-tooltip>
        </v-btn>
      </v-app-bar-title>
      <template v-slot:append>
        <template v-if="isAuthenticated">
          <v-btn to="/mypage">
            <v-icon icon="mdi-account"></v-icon>
            <v-tooltip activator="parent" location="bottom">My page</v-tooltip>
          </v-btn>
          <v-btn @click="logout">
            <v-icon icon="mdi-logout"></v-icon>
            <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
          </v-btn>
        </template>
        <template v-else>
          <v-btn to="/signup">
            <v-icon icon="mdi-account-plus"></v-icon>
            <v-tooltip activator="parent" location="bottom">Sign up</v-tooltip>
          </v-btn>
          <v-btn to="/login">
            <v-icon icon="mdi-login"></v-icon>
            <v-tooltip activator="parent" location="bottom">Login</v-tooltip>
          </v-btn>
        </template>
      </template>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const router = useRouter();

const checkAuthentication = () => {
  isAuthenticated.value = !!localStorage.getItem('auth');
};

onMounted(() => {
  checkAuthentication();
});

watch(() => localStorage.getItem('auth'), () => {
  checkAuthentication();
});

const logout = () => {
  // ローカルストレージから認証情報を削除
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
  isAuthenticated.value = false;
  router.push('/');
};
</script>

<style scoped>
.v-app-bar-title {
  display: flex;
  align-items: center;
}
</style>
