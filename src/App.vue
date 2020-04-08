<template>
  <v-app>
    <div class="allscreen">
      <Menu/>
      <div :class="this.$vuetify.theme.dark ? 'grow allheight grey darken-3':'grow allheight grey lighten-2'">
        <v-container fluid >
          <v-row>
            <v-col sm="12" style="padding:5px;">
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
  data: () => ({
    //
  }),
};
</script>

<style scoped>
  .allscreen {
    width:100%;
    height:100%;
    display:flex;
  }

  .grow {
    flex-grow: 1;
  }
  .allheight {
    max-height: 100vh;
    overflow-y: auto;
  }
</style>
