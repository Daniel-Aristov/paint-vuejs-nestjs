<template>
  <MasterLayout>
    <router-view></router-view>
  </MasterLayout>
</template>

<script>
import { defineComponent } from 'vue'
import MasterLayout from '@/views/MasterLayout.vue'

export default defineComponent({
	components: {
		MasterLayout
	}
})
</script>
