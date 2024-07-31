<template>
	<div class="px-[400px] py-[70px]">
		<div class="flex justify-center items-start gap-[70px]">
			<img class="block w-[120px] h-[120px] rounded-xl" src="../assets/images/avatar-placeholder.jpg" alt="Аватар">
			<div class="text-lg">
				<div class="mb-4">
					<p class="font-bold">Имя:</p>
					<p>{{ userStore.user.name }}</p>
				</div>
				<div class="mb-4">
					<p class="font-bold">Фамилия:</p>
					<p>{{ userStore.user.surname }}</p>
				</div>
				<div class="mb-4">
					<p class="font-bold">Электронная почта:</p>
					<p>{{ userStore.user.email }}</p>
				</div>
				<div class="mb-4">
					<p class="font-bold">Возраст:</p>
					<p>{{ userStore.user.age ? userStore.user.age : 'Не указано' }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/userStore'
import { mapStores } from 'pinia'

export default defineComponent({
	computed: {
		...mapStores(useUserStore)
	}
})
</script>
