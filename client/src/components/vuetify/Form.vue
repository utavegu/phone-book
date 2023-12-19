<script setup>
import { useField, useForm } from 'vee-validate';
import { noteCreatingValidationSchema } from '@/validation/noteCreatingValidationSchema';

const { handleSubmit, handleReset } = useForm({ validationSchema: noteCreatingValidationSchema });

const surname = useField('surname');
const name = useField('name');
const patronymic = useField('patronymic');
const phone = useField('phone');
const email = useField('email');
const city = useField('city');
const street = useField('street');
const house = useField('house');
const flat = useField('flat');

const submit = handleSubmit(async (values) => {
  try {
    await $fetch(`http://localhost:5000/api/abonents`, {
      method: 'post',
      body: {
        ...values,
        house: values.house && Number(values.house),
        flat: values.flat && Number(values.flat),
      },
    });
    handleReset();
  } catch (err) {
    // console.error(err);
  }
});
</script>

<template>
  <form v-on:submit.prevent="submit">
    <v-text-field
      v-model="surname.value.value"
      v-bind:counter="20"
      v-bind:error-messages="surname.errorMessage.value"
      label="Фамилия"
    />

    <v-text-field
      v-model="name.value.value"
      v-bind:counter="20"
      v-bind:error-messages="name.errorMessage.value"
      label="Имя"
    />

    <v-text-field
      v-model="patronymic.value.value"
      v-bind:counter="20"
      v-bind:error-messages="patronymic.errorMessage.value"
      label="Отчество"
    />

    <v-text-field
      v-model="phone.value.value"
      v-bind:error-messages="phone.errorMessage.value"
      label="Телефон"
    />

    <v-text-field
      v-model="email.value.value"
      v-bind:error-messages="email.errorMessage.value"
      label="Почта"
    />

    <v-text-field
      v-model="city.value.value"
      v-bind:counter="50"
      v-bind:error-messages="city.errorMessage.value"
      label="Город"
    />

    <v-text-field
      v-model="street.value.value"
      v-bind:counter="50"
      v-bind:error-messages="street.errorMessage.value"
      label="Улица"
    />

    <v-text-field
      v-model="house.value.value"
      v-bind:error-messages="house.errorMessage.value"
      label="Дом"
    />

    <v-text-field
      v-model="flat.value.value"
      v-bind:error-messages="flat.errorMessage.value"
      label="Квартира"
    />

    <v-btn
      class="me-4"
      type="submit"
    >
      Отправить форму
    </v-btn>

    <v-btn
      color="grey-lighten-3"
      v-on:click="handleReset"
    >
      Очистить поля
    </v-btn>
  </form>
</template>
