<template>
  <div>
    <MovieFilter :dataMovie="listFilm" />
      <infinite-loading @infinite="getFilm"></infinite-loading>
    </div>
</template>

<script>

import Api from '../services/api';
import InfiniteLoading from 'vue-infinite-loading';
import MovieFilter from '../components/MovieFilter';

  export default {
    name: 'ListMovie',
    data: () => ({
      page: 1,
      film: [],
      listFilm: []
    }),

    components:{
      InfiniteLoading,
      MovieFilter

    },

    methods:{


      async getFilm($state){
        const api = new Api();
        this.film = await api.paginatorFilm(this.page);
        if(this.page <= this.film.last_page){
          this.page+=1;
          this.listFilm.push(...this.film.data);
          $state.loaded();
        }else{
          $state.complete();
        }
      }
    }
  }
</script>
