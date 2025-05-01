<script setup lang="ts"></script>
<template>
  <nav>
    <v-toolbar color="light-blue lighten-3" dark title="SquareGPS">
      <v-toolbar-items class="d-flex align-center ml-6 ml-6">
        <router-link class="v-btn" exact to="/">Home</router-link>
        <router-link class="v-btn ml-6" to="/map">Map</router-link>
      </v-toolbar-items>
      <v-spacer />
    </v-toolbar>
  </nav>
</template>
<style scoped>
.v-btn {
  color: blue;
}
.router-link-exact-active {
  color: #3b39ba;
  border-radius: 4px;
}
</style>
