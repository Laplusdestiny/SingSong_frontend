<template>
    <div class="background-container">
        <div class="overlay"></div>
        <div class="hero">
            <h1>あなたのカラオケライフをもっと楽しく、もっと便利に</h1>
            <button>
                <NuxtLink to="/about">詳しくはこちら</NuxtLink>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'SingSong - あなたのカラオケライフをもっと楽しく、もっと便利に'
})
</script>

<style scoped>
.background-container {
    position: relative;
    background-image: url('/static/background.webp');
    background-size: cover;
    background-position: center;
    height: 100vh;
    /* 画面の高さ全体 */
    width: 100%;
    /* 画面の幅全体 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    /* 必要に応じてテキストの色を変更 */
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    /* 透明度を調整 */
    z-index: 1;
}

.background-container>*:not(.overlay) {
    position: relative;
    z-index: 2;
}

.hero {
    text-align: center;
    padding: 2rem;
    /* 追加 */
}

.hero h1 {
    font-size: 2.5rem;
}

.hero a {
    color: white;
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
