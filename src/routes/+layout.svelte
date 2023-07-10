<script lang="ts">
    import "$lib/styles/reset.css";
    import "$lib/styles/main.css";
</script>


<div class="wrapper">
    <slot></slot>
</div>


<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>
