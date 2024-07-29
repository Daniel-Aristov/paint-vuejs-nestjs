<template>
	<div>
		<NavigationBar/>
		<slot/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

export default defineComponent({
	components: {
		NavigationBar
	}
})
</script>
