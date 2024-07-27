<template>
	<div>
		<NavigationBar/>
		<slot/>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

export default defineComponent({
	components: {
		NavigationBar
	}
})
</script>
