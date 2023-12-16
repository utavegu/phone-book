<template>
  <div className="wrapper">
    <slot />
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 0 24px;
  max-width: 1440px;
}

@media (min-width: 1440px) {
  .wrapper {
    padding: 0 116px;
  }
}
</style>
