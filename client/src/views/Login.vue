<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="flex">
      <label class="">
        <input type="text"
          v-model="username"
          placeholder="username"
          class="border h-10 px-5 py-2 text-xs border-gray-400"
        >
      </label>
      <button @click="handleLogin()">Login</button>
    </div>
    <span v-if="loading" class="pt-3 text-xs">Loading ...</span>
    <ErrorMessage v-if="message.length" :message="message" />
  </div>
</template>

<script>
import ErrorMessage from '../components/ErrorMessage'

export default {
  components: { ErrorMessage },
  data: () => ({
    username: '',
    message: '',
    loading: false
  }),
  methods: {
    async handleLogin () {
      console.log(this.username)
      if (this.username?.length > 2) {
        localStorage.setItem('username', this.username)
        this.loading = true
        setTimeout(() => {
          this.$router.push('/')
          this.loading = false
        }, 2000)
      } else {
        this.message = 'Username minimal 3 karakter'
      }
    }
  }
}
</script>
