<script setup lang="ts">
let props = defineProps<{
    modelValue: boolean
    info?: string
}>();

let emits = defineEmits(["update:modelValue"]);

let loading = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits("update:modelValue", value);
    }
})
</script>

<template>
    <VDialog v-model="loading" persistent max-width="300">
        <VCard>
            <VCardText class="text-center my-auto">
                <div v-if="info" class="loader-bar py-2 px-5">
                    <div class="loader-info text-center py-13">{{ info }}</div>
                    <VProgressLinear indeterminate color="primary" size="64"></VProgressLinear>
                </div>
                <VProgressCircular v-else class="py-15" indeterminate color="primary" size="64"></VProgressCircular>
            </VCardText>
        </VCard>
    </VDialog>
</template>