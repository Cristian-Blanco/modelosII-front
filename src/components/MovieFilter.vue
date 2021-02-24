<template>
    <div>
        <v-row no-gutters>
            <v-col
                v-for="film in dataMovie"
                :key="film.id"
                cols="6"
                class="pa-3"
            >
                <v-card
                :color="'#1F7087'"
                dark
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                                class="headline"
                                v-text="film.title"
                            ></v-card-title>
                            <v-card-subtitle v-text="film.description"></v-card-subtitle>
                            <v-row>
                                <v-col>
                                    <v-card-text>Año Realizada: </v-card-text>
                                </v-col>
                                <v-col>
                                    <v-card-text v-text="film.release_year"></v-card-text>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-card-text>Clasificacion: </v-card-text>
                                </v-col>
                                <v-col>
                                    <v-card-text v-text="film.rating"></v-card-text>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-card-text>Precio de Renta: </v-card-text>
                                </v-col>
                                <v-col>
                                    <v-card-text v-text="film.rental_rate"></v-card-text>
                                </v-col>
                            </v-row>


                            
                        </div>
                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-img src="https://institutolap.com/sites/ilap-internacional/files/636055955513037869162211565_movie.jpg"></v-img>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'MovieFilter',
    props: ['dataMovie']
}
</script>