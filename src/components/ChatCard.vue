<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface IComments {
  id: number
  type: string
  message: string
  attachment_url?: string
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
  data() {
    return {
      hovered: false
    }
  },
  methods: {
    redirect(url: string) {
      window.open(url, '_blank')
    }
  },
  computed: {
    findParticipant() {
      return this.participants.find((item) => item.id === this.comments.sender)
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
        class="flex items-center justify-between"
        :class="{ 'flex-row-reverse': comments.sender === 'admin@mail.com' }"
      >
        <div class="flex text-sm font-bold text-nowrap">
          {{ findParticipant!.name ?? '' }}
        </div>
        <div class="flex text-sm opacity-75 truncate">~{{ findParticipant!.id ?? '' }}</div>
      </div>

      <!-- component attachment file -->
      <div
        class="w-full relative"
        v-if="
          comments.attachment_url &&
          typeof comments.attachment_url == 'string' &&
          comments.type === 'file'
        "
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
      >
        <iframe :src="comments.attachment_url" class="w-full aspect-auto rounded-md"></iframe>
        <div
          v-show="hovered"
          class="absolute w-full h-full flex justify-center items-center top-0 z-20 hover:cursor-pointer bg-primary bg-opacity-30 rounded-md"
          @click="redirect(comments.attachment_url)"
        >
          <button class="py-2 px-6 rounded-xl bg-primary text-white">See</button>
        </div>
      </div>
      <!-- end of  component attachment file -->

      <!-- component attachment image -->
      <div
        class="w-full relative"
        v-if="
          comments.attachment_url &&
          typeof comments.attachment_url == 'string' &&
          comments.type === 'image'
        "
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
      >
        <img
          :src="comments.attachment_url"
          alt="img-attachment "
          class="w-full aspect-video relative z-10 rounded-md"
        />
        <div
          v-show="hovered"
          class="absolute w-full h-full flex justify-center items-center top-0 z-20 hover:cursor-pointer bg-primary bg-opacity-30 rounded-md"
          @click="redirect(comments.attachment_url)"
        >
          <button class="py-2 px-6 rounded-xl bg-primary text-white">See</button>
        </div>
      </div>
      <!-- end of component attachment file -->

      <div class="text-base">
        {{ comments.message }}
      </div>
    </div>
  </div>
</template>
