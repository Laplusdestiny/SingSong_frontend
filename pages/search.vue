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
                        <v-data-table v-model="selected" :headers="headers" :items="filteredSongs" class="elevation-1"
                            show-select></v-data-table>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

useHead({
    title: 'Search - SingSong'
})

const searchQuery = ref('');
// const songs = ref([]);
const songs = ref([
    { id: 48357, title: 'らいおんハート', artist: 'TOKIO', album: 'TOK10' },
    { id: 48893, title: 'WAになっておどろう', artist: 'TOKIO', album: 'TOK10' },
    { id: 20965, title: 'A・RA・SHI', artist: '嵐', album: 'A・RA・SHI' },
])
const headers = [
    { text: 'タイトル', value: 'title' },
    { text: 'アーティスト', value: 'artist' },
    { text: 'アルバム', value: 'album' },
];
const maxWidth = '80%';
const selected = ref([])

const filteredSongs = computed(() => {
    if (!searchQuery.value) {
        return songs.value;
    } else if (searchQuery.value === '') {
        return songs.value
    }
    return songs.value.filter(song =>
        song.title.includes(searchQuery.value) ||
        song.artist.includes(searchQuery.value) ||
        song.album.includes(searchQuery.value)
    );
});

async function fetchSongs() {
    if (searchQuery.value === '') {
        songs.value = [];
        return;
    }

    try {
        const response = await fetch(`https://api.example.com/songs?query=${searchQuery.value}`);
        const data = await response.json();
        songs.value = data.songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}
</script>

<style scoped>
.v-sheet {
    margin-top: 20px;
}
</style>
