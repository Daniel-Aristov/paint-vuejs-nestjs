<template>
	<div class="bg-purple-950 h-[100vh] text-slate-100">
		<div class="flex justify-between items-center px-[100px] py-[50px]">
			<div class="max-w-[700px]">
				<p class="font-bold text-4xl">Sketch & Chat: Рисуйте и общайтесь в реальном времени!</p>
				<p class="text-lg mt-4">Создавайте идеи вместе с другими – в любое время и в любом месте! Откройте для себя безграничные возможности совместного творчества и живого общения на нашей платформе</p>
				<router-link to="/paint" type="button" class="inline-block bg-slate-100 text-purple-950 rounded-lg py-[6px] px-[40px] text-lg mt-5 border-2 border-purple-950 hover:bg-purple-950 hover:text-slate-100 hover:border-slate-100">Начать рисовать</router-link>
			</div>
			<img class="block w-[500px] h-[500px] rounded-lg" src="../assets/images/main-bg.jpg" alt="Главное фото">
		</div>
	</div>
</template>
