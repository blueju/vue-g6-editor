<template>
  <div id="app">
    <VueG6Editor />
    <!-- <cankao /> -->
  </div>
</template>

<script>
import VueG6Editor from './views/index'
import cankao from './views/cankao'

export default {
  name: 'App',
  components: {
    VueG6Editor,
    cankao
  }
}
</script>