<template>
    <div>
        <v-dialog v-model="register" persistent width="800">
            <v-card>
                <v-window v-model="step">
                    <!-- Ventana Numero 1 seleccionar film o cliente-->
                    <v-window-item :value="1">
                        <v-toolbar color="rgba(187, 143, 206)" dark class="font-weight-black">¿QUE DESEAS REALIZAR EN FILM?</v-toolbar>
                        <FilmOption/>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-row>
                                <v-col md="2">
                                    <v-btn width="100" rounded color="#D2B4DE" @click="step=1">Atras</v-btn>
                                </v-col>
                                <v-col >
                                    <v-btn width="100" rounded color="#D2B4DE" @click="exitRegister" >Salir</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-window-item>
                    
                </v-window>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import {mapMutations, mapState} from 'vuex';
import FilmOption from '../components/popUp/FilmOption';

export default {
    name: 'PopUp',
    data: () => ({
        step:1,
    }),
    computed:{
        ...mapState(['register'])
    },
    components:{
        FilmOption
    },
    methods:{
        ...mapMutations(['enableRegister']),
        exitRegister(){
            this.step = 1;
            this.enableRegister();
        }
    }
}
</script>