<template>
  <v-app>
    <div v-if="this.$route.path == '/login' || this.$route.path == '/cadastro'" class="allscreen">
      <router-view/>
    </div>
    <div v-else class="allscreen">
      <Menu/>
      <div :class="this.$vuetify.theme.dark ? 'grow allheight grey darken-3':'grow allheight grey lighten-2'">
        <v-toolbar dense class="toolbarFinansys">
          <v-toolbar-title class="title">
            {{ this.$route.name }}  
          </v-toolbar-title>      
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container fluid >
          <v-row>
            <v-col sm="12" style="padding:0px;">
              <router-view/>

            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import Menu from '../src/components/Menu';

export default {
  name: 'App',
  components: {
    Menu
  },
  created() {
    console.log(this.$route);
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
  .allscreen {
    width:100%;
    height:100%;
    display: -webkit-box;
  }

  .blueGradient {
    background-image: linear-gradient(to top, #30cfd0 0%, #080b67 100%);
  }

  .grow {
    flex-grow: 1;
  }
  .allheight {
    max-height: 100vh;
    overflow-y: auto;
  }
  .toolbarFinansys ,.toolbarFinansys > * {
    background-color:transparent !important;
    box-shadow: none !important;
    height:60px;
  }
</style>
