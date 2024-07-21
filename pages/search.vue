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
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>作詞家</v-list-item-title>
                                    <v-list-item-subtitle>{{ selectedSong.writer }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>作曲家</v-list-item-title>
                                    <v-list-item-subtitle>{{ selectedSong.composer }}</v-list-item-subtitle>
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
    title: 'Search'
});

const searchQuery = ref('');
const songs = ref([
    { id: 1, title: 'らいおんハート', artist: 'TOKIO', album: 'TOK10', release_date: '2001-01-01', writer: '野島伸司', composer: 'コモリタミノル' },
    { id: 2, title: 'WAになっておどろう', artist: 'TOKIO', album: 'TOK10', release_date: '2001-03-01', writer: '長万部太郎(角松敏生)', composer: '長万部太郎(角松敏生)' },
    { id: 3, title: 'A・RA・SHI', artist: '嵐', album: 'A・RA・SHI', release_date: '1995-01-01', writer: 'J&T', composer: '馬飼野康二' },
    { id: 4, title: 'Love So Sweet', artist: '嵐', album: 'Time', release_date: '2007-02-21', writer: 'Erik Lidbom', composer: 'Erik Lidbom' },
    { id: 5, title: '青春アミーゴ', artist: '修二と彰', album: '修二と彰', release_date: '2005-11-02', writer: '秋元康', composer: '松浦晃久' },
    { id: 6, title: 'チェリー', artist: 'スピッツ', album: 'ハチミツ', release_date: '1995-04-05', writer: '草野マサムネ', composer: '草野マサムネ' },
    { id: 7, title: 'TSUNAMI', artist: 'サザンオールスターズ', album: 'TSUNAMI', release_date: '2000-01-26', writer: '桑田佳祐', composer: '桑田佳祐' },
    { id: 8, title: 'ロビンソン', artist: 'スピッツ', album: 'ロビンソン', release_date: '1995-04-05', writer: '草野マサムネ', composer: '草野マサムネ' },
    { id: 9, title: '世界に一つだけの花', artist: 'SMAP', album: 'SMAP 012 SMAP', release_date: '2003-03-05', writer: '槇原敬之', composer: '槇原敬之' },
    { id: 10, title: 'LOVE LOVE LOVE', artist: 'DREAMS COME TRUE', album: 'LOVE GOES ON...', release_date: '1995-07-07', writer: '吉田美和', composer: '中村正人' },
    { id: 11, title: 'オリビアを聴きながら', artist: '杏里', album: 'TIMELY!!', release_date: '1983-06-01', writer: '尾崎亜美', composer: '尾崎亜美' },
    { id: 12, title: 'M', artist: 'プリンセス プリンセス', album: 'SINGLES', release_date: '1989-02-01', writer: '岡野昭仁', composer: '岡野昭仁' },
    { id: 13, title: 'DEPARTURES', artist: 'globe', album: 'CRUISE RECORD', release_date: '1996-01-17', writer: '小室哲哉', composer: '小室哲哉' },
    { id: 14, title: 'CAN YOU CELEBRATE?', artist: '安室奈美恵', album: 'Concentration 20', release_date: '1997-02-19', writer: '小室哲哉', composer: '小室哲哉' },
    { id: 15, title: 'オールナイトニッポン', artist: 'ゴールデンボンバー', album: '101回目の呪い', release_date: '2013-01-01', writer: '鬼龍院翔', composer: '鬼龍院翔' },
    { id: 16, title: 'TOMORROW', artist: 'TOKIO', album: 'TOK10', release_date: '2001-05-01', writer: '野島伸司', composer: 'コモリタミノル' },
    { id: 17, title: '君のうた', artist: '嵐', album: '5×20 All the BEST!! 1999-2019', release_date: '2018-10-24', writer: '北川悠仁', composer: '北川悠仁' },
    { id: 18, title: 'Happiness', artist: '嵐', album: 'Time', release_date: '2007-07-11', writer: 'SPIN', composer: 'SPIN' },
    { id: 19, title: 'ハナミズキ', artist: '一青窈', album: 'TSUIOKU', release_date: '2004-03-17', writer: '一青窈', composer: 'マシコタツロウ' },
    { id: 20, title: 'YELL', artist: 'いきものがかり', album: 'My Song Your Song', release_date: '2009-03-04', writer: '水野良樹', composer: '水野良樹' },
    { id: 21, title: 'R.Y.U.S.E.I.', artist: '三代目 J Soul Brothers', album: 'PLANET SEVEN', release_date: '2014-07-30', writer: 'STY', composer: 'Afrojack' },
    { id: 22, title: '366日', artist: 'HY', album: 'TRUNK', release_date: '2005-02-02', writer: '仲宗根泉', composer: '仲宗根泉' },
    { id: 23, title: 'キセキ', artist: 'GReeeeN', album: 'あっ、ども。はじめまして。', release_date: '2008-06-04', writer: 'GReeeeN', composer: 'GReeeeN' },
    { id: 24, title: '桜', artist: 'コブクロ', album: 'All Singles Best', release_date: '2003-03-26', writer: '小渕健太郎', composer: '小渕健太郎' },
    { id: 25, title: 'HANABI', artist: 'Mr.Children', album: 'BOLERO', release_date: '1997-02-05', writer: '桜井和寿', composer: '桜井和寿' },
    { id: 26, title: 'ありがとう', artist: 'いきものがかり', album: 'いきものばかり〜メンバーズBESTセレクション〜', release_date: '2012-02-15', writer: '水野良樹', composer: '水野良樹' },
    { id: 27, title: '奏', artist: 'スキマスイッチ', album: 'golden tower', release_date: '2004-03-03', writer: '大橋卓弥', composer: '常田真太郎' },
    { id: 28, title: '虹', artist: '福山雅治', album: '5年モノ', release_date: '2006-08-23', writer: '福山雅治', composer: '福山雅治' },
    { id: 29, title: '粉雪', artist: 'レミオロメン', album: '粉雪', release_date: '2003-12-03', writer: '藤巻亮太', composer: '藤巻亮太' },
    { id: 30, title: '硝子の少年', artist: 'KinKi Kids', album: 'A album', release_date: '1997-07-21', writer: '井上陽水', composer: '井上陽水' }
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
