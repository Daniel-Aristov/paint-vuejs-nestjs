<template>
  <div class="flex flex-col justify-start items-center my-[20px]">
    <div class="w-[400px] h-[435px] overflow-y-auto overflow-x-hidden border-2 border-purple-950 rounded-lg" ref="messages">
      <p class="p-[10px]">Ваши сообщения:</p>
      <ul>
        <li v-for="(message, index) in messages" :key="index" class="text-slate-100 bg-purple-800 rounded-lg my-[6px] mx-[10px] p-[12px]">
          <p class="font-medium mb-[3px]">{{ message.username }}:</p>
          <p class="max-w-[300px] break-words">{{ message.text }}</p>
        </li>
      </ul>
    </div>
    <form class="w-[400px] mt-[15px]">
      <textarea
      class="w-[100%] h-[120px] resize-none p-[6px] rounded-lg border-2 border-purple-950"
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Введите сообщение..."
      ></textarea>
      <button id="send" class="w-[100%] bg-purple-950 text-slate-100 border-none rounded-3xl cursor-pointer p-[7px] mt-[4px]" @click.prevent="sendMessage">
        Отправить
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '@/store/authStore'
import { mapStores } from 'pinia'
import ChatMessage from '@/types/chatMessage'

export default defineComponent({
  data() {
    return {
      id: 0 as number,
      message: '' as string,
      date: '' as string,
      messages: [] as ChatMessage[],
      socket: null as Socket | null,
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  },
  mounted() {
    this.socket = io('http://localhost:3000')

    this.socket.on('message', (message) => {
      this.messages.push(message)
      this.scrollToBottom()
    })

    const userId = this.authStore.user.id
    if (userId) this.authStore.getUser(userId)
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        const message = {
          id: uuidv4(),
          username: this.authStore.user.name,
          text: this.message,
          date: new Date().toISOString(),
        }
        this.socket?.emit('message', message)
        this.message = ''
        this.scrollToBottom()
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messages as HTMLElement
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
      })
    },
  },
})
</script>
