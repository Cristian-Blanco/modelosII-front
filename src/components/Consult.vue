<template>
    <div>
        <v-sheet
            color="grey lighten-4"
            class="pa-4"
        >
        <div>FILTROS</div>
        </v-sheet>
        <v-list>
            <v-list-item
            v-for="text in items"
            :key="text.id"
            link
            >
            <v-list-item-icon>
                <v-icon>mdi-send</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <router-link :to="{path: text.router}">
                    <v-list-item-title>{{ text.name }}</v-list-item-title>
                </router-link>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>


<script>

import Api from '../services/api';

  export default {
    data: () => ({
        select: [],
        items: [
            {name: 'Idioma', router: '/idioma' },
            {name: 'Año', router: '/idioma' },
            {name: 'Calificacion', router: '/idioma' },
            {name: 'Orden', router: '/idioma' },
        ],
        
    }),
    mounted(){
        this.getLanguage()
    },
    methods:{
        async getLanguage(){
            const api = new Api();
            this.language = await api.getLanguage();
        }
    }
  }
</script>