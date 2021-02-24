<template>
    <div>
         <br>
        <v-row
            align="center"
            justify="space-around"
        >
        <v-divider></v-divider>
            <v-btn 
            text
            @click="ratingChange('G')"
            >
            G
            </v-btn>
            <v-divider></v-divider>
            <v-btn
            text
            @click="ratingChange('NC-17')"
            >
            NC-17
            </v-btn>
            <v-divider></v-divider>
            <v-btn
            text
            @click="ratingChange('PG')"
            >
            PG
            </v-btn>
            <v-divider></v-divider>
            <v-btn
            text
            @click="ratingChange('PG-13')"
            >
            PG-13
            </v-btn>
            <v-divider></v-divider>
            <v-btn
            text
            @click="ratingChange('R')"
            >
            R
            </v-btn>
            <v-divider></v-divider>
        </v-row>
        <br>
        <MovieFilter :dataMovie="movieScroll" />
        <infinite-loading v-if="rating != '' && enabled" @infinite="getMovieRating"></infinite-loading> 
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
        rating: '',
        enabled: true,

    }),
    components: {
        MovieFilter,
        InfiniteLoading
    },

    methods:{
        ratingChange(name){
            this.rating = name;
            this.movieScroll = [];
            this.page=1;
            setTimeout(() => {
                this.enabled = true;
            }, 10)
            this.enabled = false;
        },

        async getMovieRating($state){
            if(this.rating != ''){
                const api = new Api();
                this.movie = await api.consultRatingFilm(this.rating,this.page);
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
}
</script>