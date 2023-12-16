<script>
export default {
  props: {
    variant: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String,
      required: false,
      default: 'button',
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<template>
  <button
    :class="['button', variant]"
    :type="buttonType"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  font: var(--buttons);
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  min-height: 48px;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.button:disabled,
.button:disabled:hover {
  color: var(--secondary-text);
  background: var(--main-accent-color-hover);
  cursor: not-allowed;
}

.outlined {
  color: var(--text-color);
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.1);
  line-height: 20px;
  height: 48px;
}

.colored-accent {
  color: var(--main-background);
  background: var(--main-accent-color);
  line-height: 20px;
  height: 48px;

  &:hover {
    background: var(--main-accent-color-hover);
  }
}
</style>
