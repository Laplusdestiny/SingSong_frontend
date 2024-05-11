<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>
        <v-btn icon="mdi-music" to="/"></v-btn>SingSong
        <v-btn to="/about">
          <v-icon icon="mdi-information" size="large"></v-icon>
          <v-tooltip activator="parent" location="bottom">About</v-tooltip>
        </v-btn>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-account-plus" to="/signup"></v-btn>
        <v-btn icon="mdi-account" to="/login"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
