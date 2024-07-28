<template>
    <div class="background-container">
        <div class="overlay"></div>
        <div class="content">
            <section>
                <h2>機能説明</h2>
                <ul>
                    <li>
                        自分だけのレパートリー管理
                        <small>好きな曲を登録して、いつでも簡単にアクセス</small>
                    </li>
                    <li>
                        歌いやすさを記録
                        <small>過去に歌った曲の歌いやすさを評価して、最適な曲を見つけやすく</small>
                    </li>
                    <li>
                        音域に合った曲の提案
                        <small>あなたの声にピッタリな曲を自動で提案</small>
                    </li>
                </ul>
            </section>
            <section>
                <h2>メリット</h2>
                <ul>
                    <li>
                        自分の音域を理解
                        <small>歌いやすかった曲を記録することで、自然と自分の音域を把握できます。</small>
                    </li>
                    <li>
                        新しい曲の発見
                        <small>音域に合った曲を提案するので、レパートリーがどんどん広がります。</small>
                    </li>
                    <li>
                        カラオケがもっと楽しくなる
                        <small>自信を持って歌える曲が増え、カラオケの時間がさらに充実。</small>
                    </li>
                </ul>
            </section>
            <section>
                <h2>ユーザーの声</h2>
                <blockquote>「このサイトのおかげで、いつも最高の曲を選べるようになりました！」</blockquote>
                <blockquote>「歌いやすい曲がすぐに見つかるので、カラオケがもっと楽しくなりました！」</blockquote>
            </section>
            <section v-if="!isAuthenticated">
                <h2>今すぐ始める</h2>
                <p>簡単登録、無料で始められます。今すぐアカウント作成！</p>
                <v-btn to="/signup">Sign up</v-btn>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isAuthenticated = ref(false);

onMounted(() => {
    isAuthenticated.value = !!localStorage.getItem('auth');
});

useHead({
    title: 'About'
});
</script>

<style scoped>
.background-container {
    position: relative;
    background-image: url('/static/background.webp');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding-top: 64px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
}

.background-container>*:not(.overlay) {
    position: relative;
    z-index: 2;
}

.content {
    padding: 64px 2rem 2rem 2rem;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
}

.content section {
    margin-bottom: 2rem;
}

.content ul {
    list-style-type: none;
    padding: 0;
}

.content ul li {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.content ul li small {
    display: block;
    font-size: 0.8rem;
    color: gray;
}

blockquote {
    font-size: 1.2rem;
    margin: 1rem 0;
    padding: 1rem;
    border-left: 5px solid #ccc;
    background-color: rgba(40, 40, 40, 0.5);
}

h2 {
    position: relative;
    margin: 2rem 0;
    text-align: center;
}

h2::before,
h2::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #ccc;
}

h2::before {
    left: 0;
}

h2::after {
    right: 0;
}

button {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    background-color: #0056b3;
}
</style>
