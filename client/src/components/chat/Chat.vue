<template>
  <div class="chat">
    <div class="messages">
      <p class="messages__title">Ваши сообщения:</p>
      <ul>
        <li v-for="(message, index) in messages" :key="index" class="message">
          <p class="message__name">{{ message.username }}:</p>
          <p class="message__text">{{ message.text }}</p>
        </li>
      </ul>
    </div>
    <form class="form">
      <input type="text" v-model="username" placeholder="Введите ваше имя" />
      <textarea
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Введите сообщение..."
      ></textarea>
      <button id="send" class="btn" @click.prevent="sendMessage">
        Отправить
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { io, Socket } from 'socket.io-client'
import { ChatMessage } from '../../types/chatMessage'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  data() {
    return {
      id: 0 as number,
      message: '' as string,
      username: '' as string,
      date: '' as string,
      messages: [] as ChatMessage[],
      socket: null as Socket | null,
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000')

    this.socket.on('message', (message) => {
      console.log(message)
      this.messages.push(message)
    })
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '' && this.username.trim() !== '') {
        const message = {
          id: uuidv4(),
          username: this.username,
          text: this.message,
          date: new Date().toISOString(),
        };
        this.socket?.emit('message', message);
        this.message = '';
      }
    },
  },
})
</script>

<style scoped lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 0;
}

.messages {
  height: 430px;
  width: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgb(54, 54, 54);
  border-radius: 10px;

  &__title {
    padding: 10px;
  }
}

.message {
  background-color: rgb(81, 172, 105);
  color: white;
  border-radius: 10px;
  margin: 6px 10px;
  padding: 12px;

  &__name {
    font-weight: bold;
    margin-bottom: 3px;
  }

  &__text {
    max-width: 300px;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
}

.form {
  margin-top: 20px;
  width: 400px;

  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    padding: 6px;
    font-size: 15px;
    border-radius: 7px;
  }

  input {
    width: 100%;
    height: 30px;
    padding: 6px;
    font-size: 15px;
    border-radius: 7px;
    margin-bottom: 5px;
  }

  button {
    background-color: aqua;
    border: none;
    border-radius: 7px;
    padding: 5px 20px;
    color: rgb(59, 59, 59);
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>
