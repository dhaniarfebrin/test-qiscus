<script lang="ts">
import ChatCard from './components/ChatCard.vue'
import chatResponse from './mock/chat_response.json'

export default {
  components: {
    ChatCard
  },
  data() {
    return {
      chatResponse
    }
  }
}
</script>

<template>
  <div class="container md:max-w-xl min-h-screen mx-auto border border-primary">
    <div class="flex flex-col max-h-screen overflow-y-auto relative">
      <header class="flex bg-primary p-3 px-5 sticky top-0 w-full">
        <div class="rounded-full overflow-hidden">
          <img
            :src="chatResponse.results.room.image_url"
            alt="group-img"
            class="h-[50px] w-[50px]"
          />
        </div>
        <div class="ml-4 flex-col flex justify-center text-background">
          <h1 class="text-xl font-bold">{{ chatResponse.results.room.name }}</h1>
          <div class="flex gap-1">
            <small
              class="text-sm"
              v-for="item in chatResponse.results.room.participant"
              :key="item.id"
              >{{ item.name }},
            </small>
          </div>
        </div>
      </header>
      <main class="flex flex-col gap-2 my-2">
        <ChatCard
          v-for="item in chatResponse.results.comments"
          :key="item.id"
          :comments="item"
          :participants="chatResponse.results.room.participant"
        />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
