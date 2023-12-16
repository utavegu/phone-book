<script lang="ts">
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    window.addEventListener('keydown', this.escCloseModal);
  },
  destroy() {
    window.removeEventListener('keydown', this.escCloseModal);
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false);
    },
    escCloseModal(evt) {
      if (this.show && (evt.key === 'Escape' || evt.key === 'Esc')) {
        this.closeModal();
      }
    },
  },
};
</script>

<template>
  <div
    v-if="show"
    class="overlay"
    role="presentation"
    @click="closeModal"
  >
    <div
      class="modal"
      @click.stop
    >
      <button
        class="close-modal-button"
        @click="closeModal"
      />
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal {
  position: relative;
  margin: auto auto 0 auto;
  padding: 24px;
  width: 100%;
  background: var(--main-background);
}

.close-modal-button {
  position: absolute;
  top: 31px;
  right: 30px;
  width: 22px;
  height: 22px;
  border: none;
  background: url(~/assets/icons/cross-black.svg) center / 22px 22px no-repeat transparent;
  cursor: pointer;
}

@media (min-width: 768px) {
  .modal {
    margin: auto;
    width: 448px;
    min-height: 456px;
    border-radius: 16px;
  }
}
</style>
