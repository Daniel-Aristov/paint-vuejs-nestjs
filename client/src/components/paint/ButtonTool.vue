<template>
  <button
		type="button"
    :style="{ backgroundSize: size + 'px', backgroundImage: `url(${bgImgUrl})` }"
    class="w-[25px] h-[25px] border-none outline-none cursor-pointer bg-cover bg-center bg-no-repeat"
		:title="title"
  >
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    size: Number,
    bgImgUrl: String,
		title: String
  },
})
</script>
