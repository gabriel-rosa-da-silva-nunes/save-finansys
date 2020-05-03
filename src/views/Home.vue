<template>
  <div>
    <v-container>
      <v-row>
        <v-col sm="12" md="4">
          <DashBanner
            icon="fas fa-dollar-sign"
            title="Ganhos"
            :value="this.somaGanhos"
            color="green"
          />
        </v-col>
        <v-col sm="12" md="4">
          <DashBanner
            icon="fas fa-hand-holding-usd"
            title="Despesas"
            :value="this.somaDespesas"
            color="red"
          />
        </v-col>
        <v-col sm="12" md="4">
          <DashBanner icon="fas fa-book-dead" title="Dívidas" :value="0" color="orange darken-1" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="6">
          <v-card class="elevation-2">
            <v-card-title class="title">Ganhos por tipo</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div id="chartdiv" style="height:250px;width:100%;"></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-card class="elevation-2">
            <v-card-title class="title">Despesas por tipo</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div id="chartdiv2" style="height:250px;width:100%;"></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DashBanner from "../components/DashBanner";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import db from "../components/firebaseInit";

export default {
  components: {
    DashBanner
  },
  data: () => ({
    ganhos: [],
    despesas: []
  }),
  computed: {
    somaGanhos: function() {
      let listaGanhos = Object.assign(new Array(), this.ganhos);
      return listaGanhos.reduce(
        (acumulador, atual) => acumulador + atual.valor,
        0
      );
    },
    somaDespesas: function() {
      let listaDespesas = Object.assign(new Array(), this.despesas);
      return listaDespesas.reduce(
        (acumulador, atual) => acumulador + atual.valor,
        0
      );
    },
    dark: function() {
      return this.$store.state.dark;
    },
    userEmail: function() {
      return this.$store.state.userLogin;
    }
  },
  watch: {
    dark: function() {
      if (this.dark) {
        am4core.useTheme(am4themes_dark);
        this.chartGanhos();
        this.chartDespesas();
      } else {
        am4core.unuseTheme(am4themes_dark);
        this.chartGanhos();
        this.chartDespesas();
      }
    }
  },
  name: "Home",
  created() {
    db.collection("ganhos")
      .get()
      .then(
        docRef => {
          docRef.forEach(doc => {
            if (doc.data().email == this.userEmail) {
              this.ganhos.push({
                ...doc.data(),
                id: doc.id
              });
            }
          });
          this.chartGanhos();
        },
        error => {
          alert(error);
        }
      );
    db.collection("despesas")
      .get()
      .then(
        docRef => {
          docRef.forEach(doc => {
            if (doc.data().email == this.userEmail) {
              this.despesas.push({
                ...doc.data(),
                id: doc.id
              });
            }
          });
          this.chartDespesas();
        },
        error => {
          alert(error);
        }
      );
  },
  methods: {
    chartGanhos() {
      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdiv", am4charts.PieChart);

      // Add data
      chart.data = Object.assign(new Array(), this.ganhos);
      // Set inner radius
      chart.innerRadius = am4core.percent(50);

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "valor";
      pieSeries.dataFields.category = "tipo";

      chart.responsive.enabled = true;
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    },
    chartDespesas() {
      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdiv2", am4charts.PieChart);
      // Add data
      chart.data = Object.assign(new Array(), this.despesas);

      // Set inner radius
      chart.innerRadius = am4core.percent(50);

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "valor";
      pieSeries.dataFields.category = "tipo";

      chart.responsive.enabled = true;
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    }
  }
};
</script>
