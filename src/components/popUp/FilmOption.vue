<template>
    <div>
        <v-stepper v-model="step" non-linear>
            <v-stepper-header>
                <v-stepper-step
                complete
                editable
                step="1"
                >
                Agregar
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                complete
                editable
                step="2"
                >
                Editar
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                complete
                step="3"
                editable
                >
                Eliminar
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                        <v-form
                            ref="formRegister"
                            v-model="validRegister"
                            lazy-validation
                        >
                            <v-text-field v-model="titleAdd"
                                :rules="nameRules"
                                label="Titulo"
                                required
                            ></v-text-field>
                            <v-text-field v-model="descriptionAdd"
                                label="Descripcion"
                            ></v-text-field>

                            <v-text-field v-model="releaseYearAdd"
                                :rules="releaseYearRule"
                                label="Año Realizada"
                                required>
                            </v-text-field>

                            <v-select
                                v-model="languageAdd"
                                :items="languageItems"
                                :rules="[v => !!v || 'El lenguaje es requerido']"
                                label="Lenguajes"
                                required
                            ></v-select>

                            <v-text-field v-model="rentalDurationAdd"
                                :rules="rentalDurattionRule"
                                label="Duracion de Renta"
                                required>
                            </v-text-field>

                            <v-text-field v-model="rentalRateAdd"
                                :rules="rentalRateRule"
                                label="Precio de renta"
                                required>
                            </v-text-field>

                            <v-text-field v-model="replacementCostAdd"
                                :rules="replacementCostRule"
                                label="Precio de venta"
                                required>
                            </v-text-field>

                            <v-select
                                v-model="ratingAdd"
                                :items="ratingItems"
                                :rules="[v => !!v || 'La clasificacion es requerido']"
                                label="Clasificacion"
                                required
                            ></v-select>
                        </v-form>
                    <v-btn @click="validateRegister"
                    color="primary"
                    :disabled="!validRegister"
                    >
                    Guardar
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    

                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-form
                        ref="formEliminate"
                        v-model="validEliminate"
                        lazy-validation
                            >
                        <v-text-field
                            label="Titulo"
                            v-model="titleSearch"
                            required
                        >
                        </v-text-field>
                    </v-form>
                    <v-btn
                    @click="searchFilm"
                    color="primary"
                    >Buscar
                    </v-btn>
                    <v-form
                        ref="formEliminateList"
                        v-model="validEliminateList"
                        lazy-validation
                    >
                    <v-select
                        v-model="titleSelect"
                        :items="listTitleSearch"
                        label="Selecciona Pelicula"
                        required
                    >
                    </v-select>
                    </v-form>
                    <v-btn
                    color="primary" 
                    @click="eliminateFilm"
                    >
                    Eliminar
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import Api from '../../services/api';

export default {
    name: 'FilmOption',
    data: () => ({
        step: 1,
        languageItems:[],
        ratingItems:['G', 'PG', 'PG-13', 'R', 'NC-17'],

        validRegister: true,
        validEliminate: true,
        titleSearch: '',
        listTitleSearch: [],
        titleSelect: '',

        titleAdd: '',
        descriptionAdd: '',
        releaseYearAdd: '',
        languageAdd: '',
        rentalDurationAdd: '',
        rentalRateAdd: '',
        replacementCostAdd: '',
        ratingAdd: '',

        nameRules: [
            v => !!v || 'El titulo de la pelicula es requerida',
            v => (v && v.length > 2) || 'El titulo debe tener mas de 2 letras' 
        ],
        
        releaseYearRule: [
            v => (v.length == 4)  || 'El año debe tener 4 digitos',
            v => (v && v <= 2021 && v >= 1920) || 'El rango de año es de 1920 hasta 2021'
        ],

        rentalDurattionRule:[
            v => (v > 0 && v<=10) || 'El rango de renta es de 1 hora mínimo y máximo 10'
        ],

        rentalRateRule:[
            v => (v > 0 && v<=40) || 'El rango de precio de renta esta en 1 dolar y 40 dolares'
        ],

        replacementCostRule:[
            v => (v > 0) || 'El costo de la pelicula debe tener un precio mayor a 1 dolar'
        ]
    }),
   
    mounted(){
        this.getLanguage();
    },
    methods:{
        ...mapMutations(['enableRegister']),
        validateRegister(){
            if(this.$refs.formRegister.validate()){
                this.createFilm();
                this.enableRegister()
            }
        },

        async getLanguage(){
            const api = new Api();
            this.languageItems = await api.getLanguage();
        },

        async searchFilm(){
            const api = new Api();
            this.listTitleSearch = await api.getFilmSearch(this.titleSearch);
        },

        async createFilm(){
            const body = {
            'title': this.titleAdd,
            'description': this.descriptionAdd,
            'release_year': this.releaseYearAdd,
            'language_id': this.languageItems.indexOf(this.languageAdd)+1,
            'rental_duration': this.rentalDurationAdd,
            'rental_rate': this.rentalRateAdd,
            'replacement_cost': this.replacementCostAdd,
            'rating': this.ratingAdd
            }
            const api = new Api();
            await api.filmCreate(body);
            this.titleAdd = this.descriptionAdd = this.releaseYearAdd = this.languageAdd = this.rentalDurationAdd = this.rentalRateAdd = ''
            this.replacementCostAdd = this.ratingAdd = ''
        },

        async eliminateFilm(){
            const api = new Api();
            api.deletFilmSearch(this.titleSelect)
        }
    }
    
}
</script>