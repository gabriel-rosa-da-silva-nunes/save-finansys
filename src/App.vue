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
            <UserChip style="margin-right:10px;"/>
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" >
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn text @click="mudarTema" style="width:100%;">
                    <v-icon>fas fa-adjust</v-icon><v-spacer></v-spacer> Tema
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn text @click="deslogar">
                    <v-icon>mdi-logout</v-icon><v-spacer></v-spacer>  deslogar
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
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
import Firebase from 'firebase';
import UserChip from '../src/components/UserChip';

export default {
  name: 'App',
  components: {
    Menu,
    UserChip
  },
  created() {
    console.log(this.$route);
  },
  data: () => ({
    //
  }),
  methods: {
    deslogar() {
      Firebase.auth().signOut().then(
        () => {
          this.$router.push({
            path: '/login'
          });
        }
      ).catch(
        error => {
          this.$toastr.e('Houve um erro ao deslogar!');
        }
      )
    },
    mudarTema() {
      this.$store.commit('changeTheme');
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
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

  @media (max-width:768px) {
    .grow {
      min-width: calc(100% - 56px);
    }
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
