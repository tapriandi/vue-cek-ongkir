<template>
  <div class="flex flex-col justify-center items-center min-h-screen px-5 pt-20 pb-10">
    <div class="w-[400px] flex flex-col py-16 xs:w-full">
      <label for="" class="input-group">
        <p>Kota/Kab. Asal</p>
        <v-select
          :options="cities"
          label="city_name"
          class="w-[250px] text-xs xs:w-full"
          v-model="payload.origin"
        ></v-select>
      </label>

      <label for="" class="input-group">
        <p>Kota/Kab. Tujuan</p>
        <v-select
          :options="cities"
          label="city_name"
          class="w-[250px] text-xs xs:w-full"
          v-model="payload.destination"
        ></v-select>
      </label>

      <label for="" class="input-group">
        <p>Berat</p>
        <input
          type="number"
          v-model="payload.weight"
        >
        <span class="absolute right-[10px] text-xs font-bold text-[#9D9D9D] xs:bottom-[12px]">Kg</span>
      </label>

      <ErrorMessage v-if="message.length" :message="message" />

      <button
        class="mt-5 font-semibold"
        @click="handleCost()"
      >
        Cek Tarif
      </button>
    </div>

    <OngkirTable v-if="costs.length" :title="payload" />
    <span v-if="loading" class="pt-3 text-xs">Loading ...</span>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import OngkirTable from '../components/OngkirTable'
import ErrorMessage from '../components/ErrorMessage'

export default {
  name: 'Home',
  components: {
    OngkirTable,
    ErrorMessage
  },
  data: () => ({
    payload: {
      origin: '',
      destination: '',
      weight: 1
    },
    message: '',
    loading: false
  }),

  created () {
    this.$store.dispatch('checkLogin')
    this.$store.dispatch('getCities')
  },

  computed: {
    ...mapState(['cities', 'costs', 'isLogin'])
  },

  methods: {
    handleDesc (service, desc) {
      return (service !== desc) ? `${desc} (${service})` : service
    },
    async handleCost () {
      if (this.isLogin) {
        const newPayload = {
          origin: this.payload?.origin?.city_id,
          destination: this.payload?.destination?.city_id,
          weight: this.payload?.weight
        }
        if (!newPayload.origin) this.message = 'Pilih kota/kab. asal pengiriman'
        else if (!newPayload.destination) this.message = 'Pilih kota/kab. tujuan pengiriman'
        else if (!newPayload.weight) this.message = 'Inputkan berat barang'
        else {
          this.loading = true
          await this.$store.dispatch('getCost', newPayload)
          this.loading = false
        }
      } else {
        this.message = 'Maaf, Anda belum login!'
        this.loading = true
        setTimeout(() => {
          this.$router.push('/login')
          this.loading = false
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
.input-group {
  position: relative;
  display: flex;
  margin: 8px 0;
  align-items: center;
  justify-content: space-between;
}
.input-group p {
  font-weight: bold;
  font-size: 13px;
}
.input-group input {
  border: 1px solid gray;
  padding: 8px 10px;
  font-size: 13px;
  width: 250px;
  border-radius: 2px;
}

@media (max-width: 480px) {
  .input-group {
    flex-direction: column;
    align-items: flex-start;
  }
  .input-group p {
    padding-bottom: 5px;
  }
  .input-group input {
    width: 100%;
  }
}
</style>
