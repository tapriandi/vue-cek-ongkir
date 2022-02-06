<template>
  <div class="pb-20">
    <p class="text-[13px] py-4">
      Ongkir dari
      <span class="underline">{{ title.origin.city_name }}</span> ke
      <span class="underline">{{ title.destination.city_name }}</span>
    </p>
    <ul class="bg-[rgba(209,250,229,0.75)] text-xs w-[400px] xs:w-full">
      <li v-for="(courier, i) in costs" :key="i" class="border-b border-gray-300 pb-2">
        <p class="font-bold text-left p-2 px-3 w-full bg-[#b7f8d7]">{{ courier.name }}</p>
        <table class="w-full text-left text-[11px]">
          <tr v-for="(item, i) in courier.costs" :key="i">
            <td class="py-1 w-[70%] pl-4">{{ handleDesc(item.service, item.description) }}</td>
            <td class="py-1">Rp.{{ item.cost[0].value }}</td>
          </tr>
        </table>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  props: ['title'],
  computed: {
    ...mapState(['costs'])
  },
  methods: {
    handleDesc (service, desc) {
      return (service !== desc) ? `${desc} (${service})` : service
    }
  }
}
</script>
