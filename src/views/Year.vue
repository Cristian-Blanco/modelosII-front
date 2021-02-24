<template>
    <div>
        <MovieFilter :dataMovie="movieScroll" />
        <infinite-loading @infinite="getMovieYear"></infinite-loading> 
    </div>
</template>

<script>

import Api from '../services/api';
import MovieFilter from '../components/MovieFilter.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
    name: 'Language',
    data: () => ({
        page:1,
        movie: [],
        movieScroll: [],

    }),
    components: {
        MovieFilter,
        InfiniteLoading
    },

    methods:{
        

        async getMovieYear($state){
            const api = new Api();
            this.movie = await api.consultYearFilm(this.page);
            if(this.page <= this.movie.last_page){
                this.page+=1;
                this.movieScroll.push(...this.movie.data);
                $state.loaded();
            }else{
                $state.complete();
            }
        }
    }
}
</script>