<template>
  <v-app>
    <div v-if="this.$route.path == '/login' || this.$route.path == '/cadastro'" class="allscreen">
      <router-view/>
    </div>
    <div v-else class="allscreen">
      <v-navigation-drawer 
        v-if="openMiniMenu"
        mini-variant
        expand-on-hover
        v-model="openMiniMenu"
        color="darken-1" 
        class="blueGradient"
        dark >
        <v-list-item style="padding:0 9px !important;">
            <v-list-item-avatar>
                <img src="./assets/money.png"/>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Save Finansys
                </v-list-item-title>
            </v-list-item-content>
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
      <div :class="this.$vuetify.theme.dark ? 'grow allheight grey darken-3':'grow allheight grey lighten-2'">
        <v-toolbar  flat class="toolbarFinansys">
          <v-btn v-if="menuConfig.menuIcon" @click="openMenu = true" icon >
            <v-icon>mdi-menu</v-icon>
          </v-btn>    
          <v-toolbar-title class="title titlePageTop">
              {{ this.$route.name }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items >
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
            <v-row class="titlePageBottom">
                <v-col sm="12">
                    <div class="title" style="margin-left:10px">
                        {{ this.$route.name }}
                    </div>
                </v-col>
            </v-row>
          <v-row>
            <v-col sm="12" style="padding:0px;">
              <router-view/>

            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <v-navigation-drawer 
        temporary
        absolute
        v-model="openMenu"
        color="darken-1" 
        class="blueGradient"
        dark >
        <v-list-item style="padding:0 9px !important;">
            <v-list-item-avatar>
                <img src="./assets/money.png"/>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Save Finansys
                </v-list-item-title>
            </v-list-item-content>
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
      this.configMenu()
      window.addEventListener('resize',this.windowChange)
    console.log(this.$route);
  },
  data: () => ({
    openMenu: false,
    openMiniMenu:false,
    menuItems: [
      {title: "Dashboard",icon:"fas fa-chart-line",link:"/"},
      {title: "Ganhos", icon:"fas fa-dollar-sign",link:"/ganhos"},
      {title: "Despesas",icon:"fas fa-hand-holding-usd",link:"/despesas"},
      {title: "Cartões",icon:"fas fa-credit-card",link:"/cartoes"},
      {title: "Dívidas",icon:"fas fa-book-dead",link:"/dividas"}
    ],
    menuConfig:{
        temporary: false,
        absolute:false,
        miniVariant:false,
        expandOnHover:false,
        menuIcon:false,
    }
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
    windowChange(event) {
        this.configMenu();
    },
    configMenu() {
        let width = window.innerWidth;
        console.log(width);
        if (width > 768) {
            this.openMenu = false;
            this.openMiniMenu = true;
            this.menuConfig.menuIcon = false;
        } else {
            this.openMiniMenu = false;
            this.menuConfig.menuIcon = true;
        }
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
    .titlePageTop {
        display: none;
    }
    .titlePageBottom {
        display:block;
    }
  }

  @media (min-width: 769px) {
    .titlePageTop {
        display: block;
    }
    .titlePageBottom {
        display:none;
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

  .blueGradient {
    background-image: linear-gradient(to top, #30cfd0 0%, #080b67 100%);
  }
  .toBottomBlueGradient {
    background-image: linear-gradient(to left, #30cfd0 0%, #080b67 100%);
  }
</style>
