<template>
    <div>
        <v-container>
            <v-row>
                <v-col sm="12" class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn @click="incluir" color="green" dark>
                        Incluir
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12">
                    <v-data-table
                        :headers="cabecalhoTabela"
                        :items="dadosTabela"
                        :loading="loadingTable"
                        loading-text="Carregando ..."
                        class="elevation-1"
                    >
                    <template v-slot:item.actions="{ item }">
                        <v-btn
                            color="orange"
                            small
                            dark
                            style="margin-right:10px;"
                            @click="editar(item)"
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
                <v-card-title>
                    Incluir Novo Cartão
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container fluid>
                        <v-row>
                            <v-col sm="12">
                                <v-text-field 
                                    clearable 
                                    outlined 
                                    label="Marca: (Visa,MasterCard)"
                                    v-model="templateDados.marca">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">
                                <v-text-field 
                                    clearable 
                                    outlined 
                                    label="Empresa/Banco"
                                    v-model="templateDados.empresa">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">
                                <v-text-field 
                                    clearable 
                                    outlined 
                                    type="number"
                                    label="Ultimos 4 Dígitos:"
                                    v-model="templateDados.ultimosDigitos">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">
                                <v-text-field 
                                    clearable 
                                    outlined 
                                    type="number"
                                    label="Limite"
                                    v-model="templateDados.limite">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">
                                <v-text-field 
                                    clearable 
                                    outlined 
                                    type="number"
                                    label="Limite Utilizado"
                                    v-model="templateDados.limiteUtilizado">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="modal = false">cancelar</v-btn>
                    <v-btn @click="acaoModal" color="green" dark>Incluir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import db from "../components/firebaseInit";

export default {
    created() {
        this.buscarDados();
    },
    data: () => ({
        templateDados: {
            marca:'',
            empresa: '',
            limite:0,
            limiteUtilizado:0,
            ultimosDigitos:0
        },
        modal: false,
        tipoModal: '',
        loadingTable: false,
        cabecalhoTabela: [
            { text: "Marca", value: "marca", align: "center" },
            { text: "Empresa", value: "empresa", align: "center" },
            { text: "Limite", value: "limite", align: "center" },
            { text: "Ações", value: "actions", sortable: false, align: "center" }
        ],
        dadosTabela: []
    }),
    computed: {
        userEmail: function () {
            return this.$store.state.userLogin;
        }
    },
    methods: {
        incluir() {
            this.templateDados = {
                marca:'',
                empresa: '',
                limite:0,
                limiteUtilizado:0,
                ultimosDigitos:0
            };
            this.tipoModal = 'inclui';
            this.modal = true;
        },
        editar(item) {
            this.templateDados = {...item};
            this.tipoModal = 'editar';
            this.modal = true;
        },
        deletar(item) {
            db.collection('cartoes').doc(item.id).delete().then(
                onAccepted => {
                    this.$toastr.s("Cartão Excluído com sucesso");
                    this.buscarDados();
                },
                error => {
                    this.$toastr.e(error.message);
                }
            )
        },
        acaoModal() {
            let acoes = {
                inclui: this.incluirDados,
                editar: this.editarDados
            }
            acoes[this.tipoModal]();
        },
        incluirDados() {
            db.collection('cartoes').add({
                ...Object.assign(new Object,this.templateDados),
                email: this.userEmail
            }).then(
                docRef => {
                    this.$toastr.s("Cartão Incluído com sucesso");
                    this.modal= false;
                    this.buscarDados();
                },
                error => {
                    this.$toastr.e(error.message);
                }
            )
        },
        editarDados() {
            let id = this.templateDados.id;
            delete this.templateDados.id;
            db.collection('cartoes').doc(id).
            update({
                ...this.templateDados
            }).then(
                docRef => {
                    this.$toastr.s("Cartão Alterado com sucesso");
                    this.modal= false;
                    this.buscarDados();
                },
                error => {
                    this.$toastr.e(error.message);
                }
            )
        },
        buscarDados() {
            this.dadosTabela = []
            this.loadingTable = true;
            db.collection('cartoes').get().then(
                querySnapshot => {
                    querySnapshot.forEach(
                        elemento => {
                            if (elemento.data().email == this.userEmail) {
                                this.dadosTabela.push({
                                    ...elemento.data(),
                                    id: elemento.id
                                });
                            }
                        }
                    )
                    this.loadingTable = false;
                },
            )
        }
    }
}
</script>