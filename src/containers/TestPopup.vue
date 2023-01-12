<template>
    <div class="popup">
        <slot/>
        <button class="popup-close">Close Popup</button>
    </div>
</template>
<script>
export default{
    name:'TestPopup',
}
</script>