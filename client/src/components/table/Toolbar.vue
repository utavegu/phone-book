<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
    default: 'Заголовок',
  },
});

const emit = defineEmits(['open-create-form-modal']);
</script>

<template>
  <v-toolbar flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-divider
      class="mx-4"
      inset
      vertical
    />
    <v-btn
      color="primary"
      dark
      class="mb-2"
      v-on:click="() => emit('open-create-form-modal')"
    >
      Добавить запись (ВЫРОВНЯТЬ ПО ВЫСОТЕ)
    </v-btn>
  </v-toolbar>
</template>
