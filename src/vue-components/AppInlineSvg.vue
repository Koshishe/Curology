<template>
  <div
    class="svg"
    :class="`svg-${name}`"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
