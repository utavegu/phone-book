<script setup lang="ts">
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
  <v-toolbar
    flat
    color="blue-darken-1"
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-tooltip text="Добавить новую запись">
      <template v-slot:activator="{ props }">
        <v-btn icon>
          <v-icon
            size="large"
            v-bind="props"
            v-on:click="() => emit('open-create-form-modal')"
          >
            mdi-plus-thick
          </v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>
</template>
