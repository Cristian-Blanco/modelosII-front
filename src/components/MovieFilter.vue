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
                            <v-card-actions>
                                <v-btn  class="ml-2 mt-5"
                                        fab
                                    icon
                                    height="40px"
                                    right
                                    width="40px"
                                >
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                
                                <v-btn  class="ml-2 mt-5"
                                    fab
                                    icon
                                    height="40px"
                                    right
                                    width="40px"
                                    >
                                    <v-icon >mdi-bookmark</v-icon>
                                </v-btn>
                
                                <v-btn  class="ml-2 mt-5"
                                    fab
                                    icon
                                    height="40px"
                                    right
                                    width="40px"
                                    >
                                    <v-icon >mdi-share-variant</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </div>
                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-img ></v-img>
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