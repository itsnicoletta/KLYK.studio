<template>
    <component :is="tag" :type="isButtonTag ? type : undefined" :href="isLinkTag ? href : undefined"
        :target="isLinkTag ? target : undefined" :rel="isLinkTag ? computedRel : undefined"
        :disabled="isButtonTag ? isActuallyDisabled : undefined"
        :aria-disabled="!isButtonTag ? String(isActuallyDisabled) : undefined"
        :tabindex="!isButtonTag && isActuallyDisabled ? -1 : undefined" :class="[rootClasses, $attrs.class]"
        v-bind="passThroughAttrs" @click="onClick">
        <!-- wrapper testo: serve per posizionare le due copie -->
        <span class="relative block overflow-hidden">
            <!-- testo "normale": in hover scorre a destra ed esce -->
            <span class="block whitespace-nowrap transition-transform duration-[2000ms] ease-in-out will-change-transform
               group-hover:translate-x-[110%]" :class="isActuallyDisabled ? '' : ''">
                <slot />
            </span>

            <!-- testo "di rientro": parte a sinistra ed entra in hover -->
            <span class="absolute inset-0 block whitespace-nowrap transition-transform duration-[2000ms] ease-in-out will-change-transform
               -translate-x-[110%] group-hover:translate-x-0" aria-hidden="true">
                <slot />
            </span>
        </span>
    </component>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        // allinea davvero i valori supportati
        validator: (value) => ['primary', 'secondary', 'outline', 'simple'].includes(value),
    },
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large', 'noPadding'].includes(value),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    href: {
        type: String,
        default: null,
    },
    target: {
        type: String,
        default: '_self',
    },
    rel: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: 'button',
    },
});

const emit = defineEmits(['click']);
const attrs = useAttrs();

const tag = computed(() => (props.href ? 'a' : 'button'));
const isLinkTag = computed(() => tag.value === 'a');
const isButtonTag = computed(() => tag.value === 'button');

const isActuallyDisabled = computed(() => props.disabled || (isLinkTag.value && !props.href));

const computedRel = computed(() => {
    if (props.rel) return props.rel;
    if (props.target === '_blank') return 'noopener noreferrer';
    return null;
});

const passThroughAttrs = computed(() => {
    const { class: _class, ...otherAttrs } = attrs;
    return otherAttrs;
});

const rootClasses = computed(() => {
    // - relative + overflow-hidden: “maschera”
    // - group: abilita group-hover sui figli
    // - select-none: evita selezione del testo durante l’animazione (opzionale ma spesso migliora)
    const baseClasses =
        'group relative overflow-hidden select-none ' +
        'cursor-pointer inline-flex items-center justify-center font-semibold rounded-full ' +
        'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
        primary: 'bg-white text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
        secondary: 'bg-gray-900 text-white hover:bg-gray-600 focus:ring-gray-500',
        outline: 'bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 focus:ring-white',
        simple: 'bg-transparent border-0 text-white hover:text-gray-200 focus:ring-white rounded-none px-0 py-0',
    };

    const sizeClasses = {
        small: 'px-4 py-2 text-md',
        medium: 'px-6 py-3 text-lg',
        large: 'px-8 py-4 text-2xl',
        noPadding: 'px-0 py-0 text-lg',
    };

    return [
        baseClasses,
        variantClasses[props.variant],
        sizeClasses[props.size],
        isActuallyDisabled.value ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    ].join(' ');
});

const onClick = (event) => {
    if (isActuallyDisabled.value) {
        event.preventDefault();
        return;
    }
    emit('click', event);
};
</script>
