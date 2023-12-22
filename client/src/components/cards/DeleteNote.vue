<script setup lang="ts">
import { defineProps } from 'vue';
import { deleteNoteApi } from '@/api/services/abonentsApi';

const { deletedItemId } = defineProps<{
  deletedItemId: string;
}>();

const emit = defineEmits(['close-dialog', 'revalidate-data']);

async function deleteNote(noteId) {
  await deleteNoteApi(noteId);
  emit('revalidate-data');
}

function deleteItemConfirm() {
  deleteNote(deletedItemId);
  emit('close-dialog');
}
</script>

<template>
  <v-card>
    <v-card-title
      class="text-h5"
      align="center"
      >Удалить эту запись?</v-card-title
    >
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue-darken-1"
        variant="text"
        v-on:click="() => emit('close-dialog')"
        >Нет</v-btn
      >
      <v-btn
        color="red-darken-1"
        variant="text"
        v-on:click="deleteItemConfirm"
        >Да</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
