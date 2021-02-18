<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://www.parquelacolina.com/wp-content/uploads/2018/11/movies-logo.png"
          transition="scale-transition"
          width="40"
        />
        <h1>VideoMaker</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="enableRegister"
        target="_blank"
        text
      >
        <span class="mr-2">Registrar</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <ListMovie/>
    </v-main>
  </v-app>
</template>

<script>
import ListMovie from './components/ListMovie';
import {mapMutations} from 'vuex';

export default {
  name: 'App',

  components: {
    ListMovie,
  },

  data: () => ({
  }),

  methods:{
    ...mapMutations(['enableRegister']),
  }
};
</script>
