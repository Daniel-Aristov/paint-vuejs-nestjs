<template>
	<div class="navigation">
		<div class="logo-wrapper">
			<img src="../assets/images/icon.png" alt="logo">
			<p>AriPaint</p>
		</div>
		<nav class="nav">
			<router-link class="nav__item" to="/">Главная</router-link>
			<router-link class="nav__item" to="/paint">Рисование</router-link>
			<router-link class="nav__item" to="/about">О нас</router-link>
		</nav>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	
})
</script>

<style scoped lang="scss">
	.navigation {
		width: 100%;
		position: sticky;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgb(58, 24, 78);
		padding: 0 20px;
		z-index: 100;
	}

	.logo-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;

		p {
			font-weight: bold;
			color: white;
			font-size: 23px;
		}

		img {
			width: 50px;
			height: 50px;
		}
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;

		&__item {
			display: block;
			background-color: rgb(131, 49, 183);
			color: white;
			text-decoration: none;
			padding: 5px 18px;
			border-radius: 8px;
		}
	}
</style>
