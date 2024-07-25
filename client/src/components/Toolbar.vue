<template>
    <div class='bar'>
      <button
        type='button'
        class='bar__btn brush'
      ></button>
      <button
        type='button'
        class='bar__btn rect'
      ></button>
      <button
        type='button'
        class='bar__btn circle'
      ></button>
      <button
        type='button'
        class='bar__btn eraser'
      ></button>
      <button
        type='button'
        class='bar__btn line'
      ></button>
      <input
        type='color'
        :style="{ marginLeft: 10 }"
      />
      <button
        type='button'
        class='bar__btn undo'
      ></button>
      <button
        type='button'
        class='bar__btn redo'
      ></button>
      <button type='button' class='bar__btn save'></button>
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

	&__btn {
		height: 25px;
		width: 25px;
		border: none;
		outline: none;
		cursor: pointer;
		background-size: cover;
		margin-left: 10px;
	}

	.brush {
		background: url('../assets/images/brush.png') no-repeat center center;
	}

	.rect {
		background: url('../assets/images/rect.png') no-repeat center center;
	}

	.circle {
		background: url('../assets/images/circle.png') no-repeat center center;
	}

	.eraser {
		background: url('../assets/images/eraser.png') no-repeat center center;
	}

	.line {
		background: url('../assets/images/line.png') no-repeat center center;
	}

	.undo {
		margin-left: auto;
		background: url('../assets/images/undo.png') no-repeat center center;
	}

	.redo {
		background: url('../assets/images/redo.png') no-repeat center center;
	}

	.save {
		background: url('../assets/images/save.png') no-repeat center center;
		margin-right: 10px;
	}
}
</style>
