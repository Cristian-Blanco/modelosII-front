<template>
    <div>
        <br>
        <v-row
            align="center"
            justify="space-around"
        >
            <v-btn 
            text
            @click="languageChange('English')"
            >
            Ingles
            </v-btn>
            <v-btn
            text
            @click="languageChange('Italian')"
            >
            Italiano
            </v-btn>
            <v-btn
            text
            @click="languageChange('Japanese')"
            >
            Japones
            </v-btn>
            <v-btn
            text
            @click="languageChange('Mandarin')"
            >
            Mandarin
            </v-btn>
            <v-btn
            text
            @click="languageChange('French')"
            >
            Frances
            </v-btn>
            <v-btn
            text
            @click="languageChange('German')"
            >
            Aleman
            </v-btn>
        </v-row>
        <br>
        <MovieFilter :dataMovie="movieScroll" />
        <infinite-loading v-if="language != '' && enabled" @infinite="getMovieLanguage"></infinite-loading>            

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
        language: '',
        enabled: true,
    }),
    components: {
        MovieFilter,
        InfiniteLoading
    },

    methods:{
        languageChange(name){
            this.language = name;
            console.log(this.language)
            this.movieScroll = [];
            this.page=1;
            setTimeout(() => {
                this.enabled = true;
            }, 10)
            this.enabled = false;
        },

        async getMovieLanguage($state){
            console.log('entro y cambio')
            if(this.language != ''){
                console.log('el nuevo lenguage es:'+this.language)
                const api = new Api();
                this.movie = await api.consultLanguageFilm(this.language, this.page);
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