<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface IComments {
  id: number
  type: string
  message: string
  sender: string
}

interface IParticipant {
  id: string
  name: string
  role: number
}

export default defineComponent({
  name: 'ChatCard',
  props: {
    comments: {
      type: Object as PropType<IComments>,
      required: true
    },
    participants: {
      type: Array as PropType<IParticipant[]>,
      required: true
    }
  },
  computed: {
    findParticipant() {
      return this.participants.filter((item) => item.id === this.comments.sender)
    }
  }
})
</script>

<template>
  <div
    class="flex gap-1 justify-start px-3 flex-wrap"
    :class="{ 'flex-row-reverse': comments.sender === 'admin@mail.com' }"
  >
    <div class="rounded-full overflow-hidden">
      <img
        src="https://icon-library.com/images/generic-user-icon/generic-user-icon-13.jpg"
        alt="user-img"
        class="h-[40px]"
      />
    </div>
    <div
      class="bg-accent p-3 rounded-lg text-background flex flex-col gap-2 max-w-[70%]"
      :class="{ 'bg-primary': comments.sender === 'admin@mail.com' }"
    >
      <div
        v-if="comments.sender !== 'admin@mail.com'"
        class="flex items-center justify-between flex-wrap"
        :class="{ 'flex-row-reverse': comments.sender === 'admin@mail.com' }"
      >
        <div class="flex text-sm font-bold" v-for="item in findParticipant" :key="item.id">
          {{ item.name }}
        </div>
        <div class="flex text-sm opacity-75" v-for="item in findParticipant" :key="item.id">
          ~{{ item.id }}
        </div>
      </div>
      <div class="text-base">
        {{ comments.message }}
      </div>
    </div>
  </div>
</template>
