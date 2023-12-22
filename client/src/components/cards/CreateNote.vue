<script setup lang="ts">
const emit = defineEmits(['close-dialog']);
</script>

<template>
  <v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn size="x-small">
        <v-icon
          size="large"
          v-on:click="() => emit('close-dialog')"
        >
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-actions>
    <vuetify-form />
  </v-card>
</template>
