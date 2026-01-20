<template>
    <button type="button" class="hamburger-btn" :class="stateClass" :style="btnStyle" @mouseenter="isHovered = true"
        @mouseleave="isHovered = false" @click="$emit('click', $event)" aria-label="Toggle menu">
        <span class="line line--top" aria-hidden="true"></span>
        <span class="line line--mid" aria-hidden="true"></span>
        <span class="line line--bot" aria-hidden="true"></span>
    </button>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
    open: { type: Boolean, default: false },
    size: { type: Number, default: 44 }, // px
});

defineEmits(["click"]);

const isHovered = ref(false);

const stateClass = computed(() => {
    if (!props.open && !isHovered.value) return "state--burger";
    if (!props.open && isHovered.value) return "state--chev-down";
    if (props.open && !isHovered.value) return "state--x";
    return "state--chev-up";
});

// scala relativa: 44px è il baseline
const btnStyle = computed(() => {
    const s = props.size;
    const scale = s / 44;

    return {
        "--btn": `${s}px`,
        "--lineW": `${22 * scale}px`,
        "--chevW": `${16 * scale}px`,
        "--offset": `${7 * scale}px`,
        "--thick": `${2 * Math.max(1, scale)}px`,
    };
});
</script>

<style scoped>
.hamburger-btn {
    width: var(--btn);
    height: var(--btn);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    color: currentColor;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition: transform 180ms ease;
}

.hamburger-btn:active {
    transform: scale(0.98);
}

.line {
    position: absolute;
    left: 50%;
    height: var(--thick);
    background: currentColor;
    border-radius: 999px;
    transition:
        transform 320ms cubic-bezier(0.2, 0.9, 0.2, 1),
        width 320ms cubic-bezier(0.2, 0.9, 0.2, 1),
        opacity 220ms ease;
    will-change: transform, width, opacity;
}

/* BURGER */
.state--burger .line--top {
    width: var(--lineW);
    transform: translate(-50%, calc(var(--offset) * -1)) rotate(0deg);
}

.state--burger .line--mid {
    width: var(--lineW);
    opacity: 1;
    transform: translate(-50%, 0px) rotate(0deg);
}

.state--burger .line--bot {
    width: var(--lineW);
    transform: translate(-50%, var(--offset)) rotate(0deg);
}

/* CHEVRON DOWN */
.state--chev-down .line--top {
    width: var(--chevW);
    transform: translate(-50%, 0px) rotate(45deg);
}

.state--chev-down .line--mid {
    width: var(--lineW);
    opacity: 0;
    transform: translate(-50%, 0px) rotate(0deg);
}

.state--chev-down .line--bot {
    width: var(--chevW);
    transform: translate(-50%, 0px) rotate(-45deg);
}

/* X */
.state--x .line--top {
    width: var(--lineW);
    transform: translate(-50%, 0px) rotate(45deg);
}

.state--x .line--mid {
    width: var(--lineW);
    opacity: 0;
    transform: translate(-50%, 0px) rotate(0deg);
}

.state--x .line--bot {
    width: var(--lineW);
    transform: translate(-50%, 0px) rotate(-45deg);
}

/* CHEVRON UP */
.state--chev-up .line--top {
    width: var(--chevW);
    transform: translate(-50%, 0px) rotate(-45deg);
}

.state--chev-up .line--mid {
    width: var(--lineW);
    opacity: 0;
    transform: translate(-50%, 0px) rotate(0deg);
}

.state--chev-up .line--bot {
    width: var(--chevW);
    transform: translate(-50%, 0px) rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {

    .hamburger-btn,
    .line {
        transition: none !important;
    }
}
</style>
