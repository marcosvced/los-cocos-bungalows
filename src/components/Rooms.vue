<script lang="ts">
import img1 from '../assets/img/room_1.png';
import img3 from '../assets/img/room_3.png';
import { defineComponent } from 'vue';
import img2 from '../assets/img/room_2.png';
export default defineComponent({
  props: {
    selectRoom: {
      type: Function,
      required: true,
    },
  },
  setup () {
    const my_rooms = [
      {
        name: 'Mini Dreamy Room',
        description: 'Generous and comfortable these modern furnished rooms offer two queen-size beds and are on the first floor.',
        size: '20m2',
        beds: '2',
        people: '2',
        amount: '200€',
        img: img1,
      },
      {
        name: 'Seet Bungalow',
        description: 'The perfect blend of comfort and culture, our superior room with a central graden view has the stunning, and comes with a jacuzzi.',
        size: '50m2',
        beds: '2',
        people: '4',
        amount: '350€',
        img: img2,
      },
      {
        name: 'Los Cocos Suite',
        description: 'If you want a little extra form your stay, you might like our superior rooms. A ocean view room has a private beach and a helicopter :-).',
        size: '125m2',
        beds: '3',
        people: '4',
        amount: '450€',
        img: img3,
      }
    ]

    return {
      my_rooms,
    };
  }
})
</script>
<template>
  <div class="space-y-4">
    <div 
      v-for="n in my_rooms"
      class="p-4 transition-all duration-300 border cursor-pointer border-gray-light hover:bg-gray-light hover:bg-opacity-20 hover:shadow-sm"
      :key="n.name"
      @click="selectRoom(n)"
    >
      <div class="flex space-x-4">
        <div class="w-1/3">
          <img :src="n.img" alt="Mini Dreamy Room" class="object-cover w-full h-full">
        </div>
        <div class="flex flex-col w-2/3 text-sm">
          <p class="mb-2 text-base font-display"><strong>{{ n.name ? n.name : undefined }}</strong></p>
          <p class="flex-1">{{ n.description }}</p>
          <p class="mb-6">Size: {{ n.size }}</p>
          <div class="flex items-baseline space-x-16">
            <div>
              <img src="../assets/img/double-bed.svg" class="w-8 mb-1">
              <p>Beds: {{ n.beds }}</p>
            </div>
              <div class="flex-1">People: {{ n.people }}</div>
          <div class="text-xl"><strong>{{ n.amount }}</strong></div>
        </div>
          </div>
        </div>
  </div>
  </div>
</template>
<style scoped>

</style>