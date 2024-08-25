<template>
    <v-container>
        <v-sheet class="mx-auto" :max-width="maxWidth">
            <v-row>
                <v-col cols="12">
                    <h1>マイページ</h1>
                    <p v-if="user">ユーザーUID: {{ user.uid }}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-sheet>
                        <v-data-table :headers="headers" :items="userSongs" class="elevation-1">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn color="error" @click="deleteSong(item)">削除</v-btn>
                            </template>
                        </v-data-table>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { sql } from "@vercel/postgres";

const user = ref(null);
const maxWidth = '80%';

const headers = [
    { title: 'タイトル', value: 'title', sortable: true },
    { title: 'アーティスト', value: 'artist', sortable: true },
    { title: 'アルバム', value: 'album', sortable: true },
    { title: 'アクション', value: 'actions', sortable: false }
];

const userSongs = ref([]);

async function fetchSongs({ params }) {
    const { rows } = await sql`SELECT songs.title, songs.artist, songs.album
                           FROM mylist
                           LEFT JOIN songs ON mylist.musicid = songs.musicid
                           WHERE mylist.uid = ${params.uid}`;

    return rows;
}

onMounted(async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.value = JSON.parse(storedUser);
        userSongs.value = await fetchSongs(user.value);
    }
});


function deleteSong(song) {
    const index = userSongs.value.findIndex(s => s.id === song.id);
    if (index !== -1) {
        userSongs.value.splice(index, 1);
    }
};

useHead({
    title: 'MyPage'
});
</script>

<style scoped>
.v-sheet {
    margin-top: 20px;
}
</style>
