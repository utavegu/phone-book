<template>
  <v-app>
    <div class="layout">
      <common-header />
      <main class="main">
        <slot />
      </main>
      <common-footer />
    </div>
  </v-app>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}

.main {
  padding: 30px 0 30px;
}
</style>
