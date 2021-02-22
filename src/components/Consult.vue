<template>
    <div>
        <v-sheet
            color="grey lighten-4"
            class="pa-4"
        >
        <div>LENGUAGE</div>
        </v-sheet>
        <v-list>
            <v-list-item
            v-for="text in language"
            :key="text.id"
            link
            >
            <v-list-item-icon>
                <v-icon>mdi-send</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
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
        language: [
            
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