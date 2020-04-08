<template>
    <v-navigation-drawer 
        permanent 
        color="darken-1" 
        style="height:100vh;" 
        class="blueGradient"
        dark 
        :mini-variant="true"
        :expand-on-hover="true">
        <v-list-item style="padding:0 9px !important;">
            <v-list-item-avatar>
                <img src="../assets/money.png"/>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Save Finansys
                </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn text fab small @click="mudarTema"><i style="font-size:20px;" class="fas fa-adjust"></i></v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav>
            <router-link  v-for="item in menuItems" :to="item.link"
                :key="item.icon" tag="span">
                <v-list-item link>
                    <v-list-item-icon >
                        <i style="font-size:20px;margin-left:5px;" :class="item.icon"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
            
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
        menuItems: [
            {title: "Dashboard",icon:"fas fa-chart-line",link:"/"},
            {title: "Ganhos", icon:"fas fa-dollar-sign",link:"/ganhos"},
            {title: "Despesas",icon:"fas fa-hand-holding-usd",link:"/despesas"},
            {title: "Dívidas",icon:"fas fa-book-dead",link:"/dividas"}
        ]
    }),
    methods: {
        mudarTema() {
            this.$store.commit('changeTheme');
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
    },
}
</script>

<style>
    html {
        overflow: hidden;   
    }
    .blueGradient {
        background-image: linear-gradient(to top, #30cfd0 0%, #080b67 100%);
    }
    .toBottomBlueGradient {
        background-image: linear-gradient(to left, #30cfd0 0%, #080b67 100%);

    }
</style>