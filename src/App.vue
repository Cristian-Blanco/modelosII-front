<template>
  <v-app id="inspire">
      <PopUp/>
    
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <Consult/>
    </v-navigation-drawer>


    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/">
      <div class="d-flex align-center">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://www.parquelacolina.com/wp-content/uploads/2018/11/movies-logo.png"
                transition="scale-transition"
                width="40"
              />
              
          

         
        </div>
        </router-link> 
        <h1>Application</h1>

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
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Consult from './components/Consult';
import {mapMutations} from 'vuex';
import PopUp from './components/PopUp'

export default {
  name: 'App',

  components: {
    Consult,
    PopUp
  },

  data: () => ({
    drawer:null
  }),

  methods:{
    ...mapMutations(['enableRegister']),
  }
};
</script>
