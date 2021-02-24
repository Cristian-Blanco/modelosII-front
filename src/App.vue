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
        <h1>VideoMaker</h1>

      <v-spacer></v-spacer>

        <v-responsive max-width="400">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            @input="searchFilm"
            v-model="titleFilm"
          ></v-text-field>
        </v-responsive>
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
      <div v-if="titleFilm != ''">
        <MovieFilter :dataMovie="listFilm" />
        <infinite-loading v-if="enabled && titleFilm != ''" @infinite="infoFilm"></infinite-loading>            
      </div>
      <div v-else>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Consult from './components/Consult';
import {mapMutations} from 'vuex';
import PopUp from './components/PopUp'
import Api from './services/api';
import MovieFilter from './components/MovieFilter.vue';
import InfiniteLoading from 'vue-infinite-loading';


export default {
  name: 'App',

  components: {
    Consult,
    PopUp,
    MovieFilter,
    InfiniteLoading
  },

  data: () => ({
    page:1,
    drawer:null,
    titleFilm: '',
    film: [],
    listFilm: [],
    enabled: false
  }),

  methods:{
    ...mapMutations(['enableRegister']),

    searchFilm(){
      this.listFilm = [];
      this.page=1;
      setTimeout(() => {
          this.enabled = true;
      }, 100)
      this.enabled = false;
    },

    async infoFilm($state){
      const api = new Api();
      this.film = await api.searchFilmTitle(this.titleFilm, this.page);
      if(this.page <= this.film.last_page){
          this.page+=1;
          this.listFilm.push(...this.film.data);
          $state.loaded();
      }else{
          $state.complete();
      }
    }
  }
};
</script>
