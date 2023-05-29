<template>
    <div class="site-header">
        <img alt="Pokemon logo" src="../assets/icons/poke-ball.png" width="100"/>
        <h1>PokeDex</h1>
    </div>

</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
    name: "NavBar",
    components: {SearchBar}
}
</script>

<style scoped>
.site-header {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-header h1 {
    margin: .7em 0 .3em 0;
}
.site-header img {
    max-width: 55px;
    margin: 0 10px 0 0;
}
</style>