<template>
  <div>
    <v-container>
      <v-row>
        <v-col sm="12">
          <v-data-table
            :headers="listaTabelaHead"
            :items="listaDespesas"
            class="elevation-1"
            :loading="loadingTable"
            loading-text="Carregando ..."
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="orange"
                small
                dark
                style="margin-right:10px;"
                @click="editarModal(item)"
              >
                <i class="fas fa-edit"></i>
              </v-btn>
              <v-btn color="red" small dark @click="deletar(item)">
                <i class="fas fa-trash"></i>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="modal" width="500px">
      <v-card>
        <v-card-title
          class="title"
        >{{ this.insertModal == 'incluir'? 'Incluir Novo ganho': 'Editar Ganho' }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col sm="12">
                <v-text-field clearable outlined label="Tipo da Despesa" v-model="tipoDespesa"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12">
                <v-text-field
                  clearable
                  outlined
                  type="date"
                  label="Data de Pagamento"
                  v-model="dataDespesa"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12">
                <v-currency-field clearable outlined type="number" label="Valor" v-model="valor"></v-currency-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="fecharModal">cancelar</v-btn>
          <v-btn color="green" @click="salvar" dark>salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      bottom
      right
      fab
      style="position:absolute;bottom:25px;right:25px;"
      @click="abrirModal('incluir')"
      color="green"
      dark
    >
      <i class="fas fa-plus"></i>
    </v-btn>
  </div>
</template>

<script>
import db from "../components/firebaseInit";

export default {
  data: () => ({
    insertModal: false,
    id: null,
    valor: 0,
    dataDespesa: Date(),
    tipoDespesa: "",
    loadingTable: true,
    listaTabelaHead: [
      { text: "Tipo de Despesa", value: "tipo", align: "center" },
      { text: "Valor", value: "valor", align: "center" },
      { text: "Data", value: "data", align: "center" },
      { text: "Ações", value: "actions", sortable: false, align: "center" }
    ],
    listaDespesas: []
  }),
  computed: {
    modal: function() {
      return this.insertModal != "";
    },
    userEmail: function () {
      return this.$store.state.userLogin;
    }
  },
  created() {
    db.collection("despesas")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().email == this.userEmail) {
            this.listaDespesas.push({
              ...doc.data(),
              id: doc.id
            });
          }
        });
        this.loadingTable = false;
      });
  },
  methods: {
    salvar() {
      if (this.insertModal == "incluir") {
        db.collection("despesas")
          .add({
            valor: this.valor,
            data: this.dataDespesa,
            tipo: this.tipoDespesa,
            email: this.userEmail
          })
          .then(
            docRef => {
              this.$toastr.s("Despesa incluída com sucesso!");
              this.fecharModal();
              this.updateList();
            },
            error => {
              this.$toastr.e("Houve um erro ao incluir o registro!");
            }
          );
      } else if (this.insertModal == "editar") {
        if (this.id != null) {
          db.collection("despesas")
            .doc(this.id)
            .update({
              valor: this.valor,
              data: this.dataDespesa,
              tipo: this.tipoDespesa,
              email: this.userEmail
            })
            .then(
              () => {
                this.$toastr.s("Despesa editada com sucesso!");
                this.fecharModal();
                this.updateList();
              },
              error => {
                this.$toastr.e("Houve um erro ao editar a despesa!");
              }
            );
        }
      }
    },
    editarModal(itemEditar) {
      this.id = itemEditar.id;
      this.valor = itemEditar.valor;
      this.dataDespesa = itemEditar.data;
      this.tipoDespesa = itemEditar.tipo;
      this.abrirModal("editar");
    },
    deletar(item) {
      if (confirm("Tem certeza?")) {
        db.collection("despesas")
          .doc(item.id)
          .delete()
          .then(
            () => {
              this.$toastr.s("Despesa excluído com sucesso!");
              this.updateList();
            },
            error => {
              this.$$toastr.e("Houve um erro ao excluir a despesa!");
            }
          );
      }
    },
    updateList() {
      db.collection("despesas")
        .get()
        .then(querySnapshot => {
          this.loadingTable = true;
          this.listaDespesas = [];
          querySnapshot.forEach(doc => {
            if (doc.data().email == this.userEmail) {
              this.listaDespesas.push({
                ...doc.data(),
                id: doc.id
              });
            }
          });
          this.loadingTable = false;
        });
    },
    abrirModal(tipo) {
      this.insertModal = tipo;
    },
    fecharModal() {
      this.insertModal = "";
      this.valor = 0;
      this.dataDespesa = null;
      this.tipoDespesa = "";
    }
  }
};
</script>