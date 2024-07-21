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

const user = ref(null);
const maxWidth = '80%';

const headers = [
    { title: 'タイトル', value: 'title', sortable: true },
    { title: 'アーティスト', value: 'artist', sortable: true },
    { title: 'アルバム', value: 'album', sortable: true },
    { title: 'アクション', value: 'actions', sortable: false }
];

// デバッグ用のサンプルデータ
const sampleSongs = {
    'zI3V6rANOXh6VzKKpZCfiU5jJit1': [
        { id: 1, title: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
        { id: 2, title: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
        // ... (8 more songs)
    ],
    'zI3V6rANOXh6VzKKpZCfiU5jJit2': [
        { id: 11, title: 'Song 11', artist: 'Artist 11', album: 'Album 11' },
        { id: 12, title: 'Song 12', artist: 'Artist 12', album: 'Album 12' },
        // ... (8 more songs)
    ],
    // ... (more user data)
};

const userSongs = ref([]);

onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.value = JSON.parse(storedUser);
        // UIDに基づいて曲を取得
        userSongs.value = sampleSongs[user.value.uid] || [];
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
