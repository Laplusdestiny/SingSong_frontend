<template>
    <v-container>
        <v-sheet class="mx-auto" :max-width="maxWidth">
            <v-row>
                <v-col cols="12">
                    <h1>検索</h1>
                    <v-text-field v-model="searchQuery" label="曲を検索" @input="fetchSongs"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-sheet>
                        <v-data-table :headers="headers" :items="filteredSongs" class="elevation-1">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn @click="showDetails(item)">詳細</v-btn>
                            </template>
                        </v-data-table>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-dialog v-model="dialog" max-width="500">
                <v-card>
                    <v-card-title>{{ selectedSong.title }}</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>アーティスト</v-list-item-title>
                                    <v-list-item-subtitle>{{ selectedSong.artist }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>アルバム</v-list-item-title>
                                    <v-list-item-subtitle>{{ selectedSong.album }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>リリース日</v-list-item-title>
                                    <v-list-item-subtitle>{{ selectedSong.release_date }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">閉じる</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
    title: 'Search - SingSong'
});

const searchQuery = ref('');
const songs = ref([
    { title: 'らいおんハート', artist: 'TOKIO', album: 'TOK10', release_date: '2001-01-01' },
    { title: 'WAになっておどろう', artist: 'TOKIO', album: 'TOK10', release_date: '2001-03-01' },
    { title: 'A・RA・SHI', artist: '嵐', album: 'A・RA・SHI', release_date: '1995-01-01' }
]);

const headers = [
    { title: 'タイトル', value: 'title', sortable: true },
    { title: 'アーティスト', value: 'artist', sortable: true },
    { title: 'アルバム', value: 'album', sortable: true },
    { title: 'アクション', value: 'actions', sortable: false }
];

const maxWidth = '80%';

const filteredSongs = computed(() => {
    if (!searchQuery.value.trim()) {
        return songs.value;
    }
    return songs.value.filter(song =>
        song.title.includes(searchQuery.value) ||
        song.artist.includes(searchQuery.value) ||
        song.album.includes(searchQuery.value)
    );
});

const dialog = ref(false);
const selectedSong = ref({ title: '', artist: '', album: '', release_date: '' });

function showDetails(song) {
    selectedSong.value = song;
    dialog.value = true;
}

function fetchSongs() {
    // デバッグ中は何もしない
}
</script>

<style scoped>
.v-sheet {
    margin-top: 20px;
}
</style>
