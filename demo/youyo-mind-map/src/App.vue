<template>
  <div id="app">
    <!--    <MindMap />-->
    <datasource />
  </div>
</template>

<script>
// import MindMap from './components/MindMap.vue';
import Datasource from './components/Datasource.vue';

export default {
  name: 'App',
  components: {
    Datasource,
    // MindMap,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
