<template>
  <div class="bar settings-bar">
		<div class="settings-item">
			<label htmlFor="line-width">Толщина линии</label>
			<input id="line-width" type="number" defaultValue="1" min="1" max="50" />
		</div>
		<div class="settings-item">
			<label htmlFor="stroke-color">Цвет обводки</label>
			<input type="color" id="stroke" />
		</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.bar {
	height: $bar-height;
	background-color: white;
	display: flex;
	align-items: center;
	position: absolute;
	width: 100%;
	box-shadow: 0 2px 3px gray;
	z-index: 20;
}

.settings-bar {
	height: $bar-height;
	background-color: white;
	display: flex;
	align-items: center;
	position: absolute;
	width: 100%;
	box-shadow: 0 2px 3px gray;
	top: $bar-height;
	gap: 20px;
	z-index: 10;
}

.settings-item {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 10px 0;
}

.settings-item:nth-child(1) {
	margin-left: 10px;
}
</style>
