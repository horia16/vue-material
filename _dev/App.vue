<script setup lang="ts">
import { VmButton } from "../src";
</script>

<template>
  <div class="flex-gap" style="flex-direction: column">
    <div class="flex-gap">
      <vm-button>Button</vm-button>
      <vm-button icon="mdi-light:home">Button</vm-button>
      <vm-button disabled>Button</vm-button>
    </div>
    <div class="flex-gap">
      <vm-button type="outlined">Button</vm-button>
      <vm-button type="outlined" disabled>Button</vm-button>
    </div>

    <div class="flex-gap">
      <vm-button type="text">Button</vm-button>
      <vm-button type="text" disabled>Button</vm-button>
    </div>

    <div class="flex-gap">
      <vm-button type="elevated">Button</vm-button>
      <vm-button type="elevated" disabled>Button</vm-button>
    </div>

    <div class="flex-gap">
      <vm-button type="tonal">Button</vm-button>
      <vm-button type="tonal" disabled>Button</vm-button>
    </div>
  </div>
</template>
<style>
.flex-gap {
  display: flex;
  gap: 2rem;
}
</style>
