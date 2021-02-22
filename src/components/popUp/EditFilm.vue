<template>
    <div>
        <v-form
            ref="formEdit"
            v-model="validEditList"
            lazy-validation
        >
            <v-text-field v-model="titleEdit"
                :rules="nameRules"
                label="Titulo"
                required
            ></v-text-field>
            <v-text-field v-model="descriptionEdit"
                label="Descripcion"
            ></v-text-field>

            <v-text-field v-model="releaseYearEdit"
                :rules="releaseYearRule"
                label="Año Realizada"
                required>
            </v-text-field>

            <v-select
                v-model="languageEdit"
                :items="languageItems"
                :rules="[v => !!v || 'El lenguaje es requerido']"
                label="Lenguajes"
                required
            ></v-select>

            <v-text-field v-model="rentalDurationEdit"
                :rules="rentalDurationRule"
                label="Duracion de Renta"
                required>
            </v-text-field>

            <v-text-field v-model="rentalRateEdit"
                :rules="rentalRateRule"
                label="Precio de renta"
                required>
            </v-text-field>

            <v-text-field v-model="replacementCostEdit"
                :rules="replacementCostRule"
                label="Precio de venta"
                required>
            </v-text-field>

            <v-select
                v-model="ratingEdit"
                :items="ratingItems"
                :rules="[v => !!v || 'La clasificacion es requerido']"
                label="Clasificacion"
                required
            ></v-select>
        </v-form>
        <v-btn @click="validateEdit"
            color="primary"
            :disabled="!validEditList"
            >
            Guardar
        </v-btn>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import Api from '../../services/api';

export default {
    name: 'EditFilm',
    data: () =>({
        validEditList: true,
        infoPrint: [],
        
        titleEdit: '',
        descriptionEdit: '',
        releaseYearEdit: '',
        languageEdit: '',
        rentalDurationEdit: '',
        rentalRateEdit: '',
        replacementCostEdit: '',
        ratingEdit: '',




        nameRules: [
            v => !!v || 'El titulo de la pelicula es requerida',
            v => (v && v.length > 2) || 'El titulo debe tener mas de 2 letras' 
        ],
        
        releaseYearRule: [
            v => (v.length == 4)  || 'El año debe tener 4 digitos',
            v => (v && v <= 2021 && v >= 1920) || 'El rango de año es de 1920 hasta 2021'
        ],

        rentalDurationRule:[
            v => (v > 0 && v<=10) || 'El rango de renta es de 1 hora mínimo y máximo 10'
        ],

        rentalRateRule:[
            v => (v >= 0 && v<=40) || 'El rango de precio de renta esta en 0.5 dolar y 40 dolares'
        ],

        replacementCostRule:[
            v => (v > 0) || 'El costo de la pelicula debe tener un precio mayor a 1 dolar'
        ]
    }),
    props: ['infoName', 'languageItems', 'ratingItems'],
    mounted(){
        this.getInfo()
    },
    methods:{
        ...mapMutations(['enableRegister']),

        validateEdit(){
            if(this.$refs.formEdit.validate()){
                this.updateInfo();
                this.enableRegister();
            }
        },

        async getInfo(){
            const api = new Api();
            this.infoPrint = await api.getOneFilm(this.infoName);
            this.titleEdit = this.infoPrint.title;
            this.descriptionEdit = this.infoPrint.description;
            this.languageEdit = this.languageItems[this.infoPrint.language_id-1];
            this.rentalDurationEdit = this.infoPrint.rental_duration;
            this.ratingEdit = this.infoPrint.rating;
        },
        
        async updateInfo(){
            const body = {
                "title": this.titleEdit,
                "description": this.descriptionEdit,
                "release_year": this.releaseYearEdit,
                "language_id": this.languageItems.indexOf(this.languageEdit)+1,
                "rental_duration": this.rentalDurationEdit,
                "rental_rate": this.rentalRateEdit,
                "replacement_cost": this.replacementCostEdit,
                "rating": this.ratingEdit
            }
            const api = new Api()
            await api.filmUpdate(body, this.infoPrint.film_id)
        }
    }

}
</script>