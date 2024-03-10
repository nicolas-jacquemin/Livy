<template>
  <VContainer class="d-flex expand h-screen align-center">
    <VRow align="center" justify="center">
      <VCol cols="12" md="8" lg="6">
        <VCard class="py-10" elevation="6">
          <slot />
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
