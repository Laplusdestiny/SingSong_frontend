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
        { id: 5, title: '青春アミーゴ', artist: '修二と彰', album: '修二と彰', release_date: '2005-11-02', writer: '秋元康', composer: '松浦晃久' },
        { id: 10, title: 'LOVE LOVE LOVE', artist: 'DREAMS COME TRUE', album: 'LOVE GOES ON...', release_date: '1995-07-07', writer: '吉田美和', composer: '中村正人' },
        { id: 13, title: 'DEPARTURES', artist: 'globe', album: 'CRUISE RECORD', release_date: '1996-01-17', writer: '小室哲哉', composer: '小室哲哉' },
        { id: 14, title: 'CAN YOU CELEBRATE?', artist: '安室奈美恵', album: 'Concentration 20', release_date: '1997-02-19', writer: '小室哲哉', composer: '小室哲哉' },
        { id: 18, title: 'Happiness', artist: '嵐', album: 'Time', release_date: '2007-07-11', writer: 'SPIN', composer: 'SPIN' },
        { id: 19, title: 'ハナミズキ', artist: '一青窈', album: 'TSUIOKU', release_date: '2004-03-17', writer: '一青窈', composer: 'マシコタツロウ' },
        { id: 20, title: 'YELL', artist: 'いきものがかり', album: 'My Song Your Song', release_date: '2009-03-04', writer: '水野良樹', composer: '水野良樹' },
        { id: 23, title: 'キセキ', artist: 'GReeeeN', album: 'あっ、ども。はじめまして。', release_date: '2008-06-04', writer: 'GReeeeN', composer: 'GReeeeN' },
        { id: 24, title: '桜', artist: 'コブクロ', album: 'All Singles Best', release_date: '2003-03-26', writer: '小渕健太郎', composer: '小渕健太郎' },
        { id: 26, title: 'ありがとう', artist: 'いきものがかり', album: 'いきものばかり〜メンバーズBESTセレクション〜', release_date: '2012-02-15', writer: '水野良樹', composer: '水野良樹' },
        { id: 27, title: '奏', artist: 'スキマスイッチ', album: 'golden tower', release_date: '2004-03-03', writer: '大橋卓弥', composer: '常田真太郎' },
        { id: 28, title: '虹', artist: '福山雅治', album: '5年モノ', release_date: '2006-08-23', writer: '福山雅治', composer: '福山雅治' },
        { id: 29, title: '粉雪', artist: 'レミオロメン', album: '粉雪', release_date: '2003-12-03', writer: '藤巻亮太', composer: '藤巻亮太' },
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
