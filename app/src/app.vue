<template>
  <div class="app-container">
    <header>
      <navbar title="jacqui"/>
    </header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/layout/navbar.vue';

export default defineComponent({
  components: {
    Navbar,
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

main {
  height: calc(100vh - 64px);
  overflow: hidden;
}

nav {
  position: relative;
  z-index: 1;
}

header {
  grid-area: header;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0!important;
}

form {
  /* label color */
  // .input-field label {
  //   color: #000!important;
  // }
  /* label focus color */
  .input-field input[type=text]:focus + label {
    color: #000!important;
  }
  /* label underline focus color */
  .input-field input[type=text]:focus {
    border-bottom: 1px solid #000!important;
    box-shadow: 0 1px 0 0 #ddd!important;
  }
  /* valid color */
  .input-field input[type=text].valid {
    border-bottom: 1px solid #000!important;
    box-shadow: 0 1px 0 0 #ddd!important;
  }
  /* invalid color */
  // .input-field input[type=text].invalid {
  //   border-bottom: 1px solid #000!important;
  //   box-shadow: 0 1px 0 0 #000!important;
  // }
  /* icon prefix focus color */
  .input-field .prefix.active {
    color: #000!important;
  }

  .dropdown-content li > a, .dropdown-content li > span {
    color: #000 !important;
  }
}

.app-container {
  display: grid;
  grid-template-rows: 64px 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "header"
    "main";
}

.main {
  grid-area: main;
  height: calc(100vh - 64px);
}

.cursor-copy {
  cursor: copy;
}
</style>
