<script setup lang="ts">
let props = defineProps<{
    modelValue: boolean
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
    <v-dialog v-model="loading" persistent max-width="290">
        <v-card class="d-flex" style="height: 220px;">
            <v-card-text class="text-center my-auto">
                <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>