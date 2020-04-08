<template>
    <div>
        
        <v-container>
            <v-row>
                <v-col sm="12">
                    <v-data-table
                        :headers="listaTabelaHead"
                        :items="listaRecebimentos"
                        class="elevation-1"
                        :loading="loadingTable"
                        loading-text="Carregando ..."
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-btn color="orange" small dark style="margin-right:10px;" @click="editarModal(item)">
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
                <v-card-title class="title">
                    {{ this.insertModal == 'incluir'? 'Incluir Novo ganho': 'Editar Ganho' }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container fluid>
                        <v-row>
                            <v-col sm="12">
                                <v-text-field clearable outlined label="Tipo do recebimento" v-model="tipoRecebimento"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">
                                <v-text-field clearable outlined type="date" label="Data de Recebimento" v-model="dataRecebimento"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">
                                <v-currency-field clearable outlined label="Valor" v-model="valor"></v-currency-field>
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
        <v-btn bottom right fab style="position:absolute;bottom:25px;right:25px;" @click="abrirModal('incluir')" color="green" dark>
            <i class="fas fa-plus"></i>
        </v-btn>
    </div>
</template>

<script>
import db from '../components/firebaseInit';

export default {
    data: () => ({
        insertModal: false,
        id:null,
        valor: 0,
        dataRecebimento: Date(),
        tipoRecebimento: "",
        loadingTable: true,
        listaTabelaHead: [
            {text:'Tipo de Recebimento',value:'tipo',align:"center"},
            {text:'Valor',value:'valor',align:"center"},
            {text:'Data',value:'data',align:"center"},
            {text:'Ações',value:'actions',sortable:false,align:"center"}
        ],
        listaRecebimentos: []
    }),
    computed: {
        modal: function() {
            return this.insertModal != '';
        }
    },
    created() {
        db.collection('ganhos').get().then(
            querySnapshot => {
                querySnapshot.forEach(
                    doc => {
                        this.listaRecebimentos.push(
                            {
                                ...doc.data(),
                                id: doc.id
                            }
                        );
                    }
                )
                this.loadingTable = false;
            }
        )
    },
    methods: {
        salvar() {
            if (this.insertModal == 'incluir') {
                db.collection('ganhos').add({
                    valor: this.valor,
                    data: this.dataRecebimento,
                    tipo: this.tipoRecebimento
                }).then(
                    docRef => {
                        this.$toastr.s("Ganho incluído com sucesso!");
                        this.fecharModal();
                        this.updateList();
                    },
                    error => {
                        this.$toastr.e("Houve um erro ao incluir o registro!");
                    }
                )
            } else if (this.insertModal == 'editar') {
                if (this.id != null) {
                    db.collection('ganhos').doc(this.id).update({
                        valor: this.valor,
                        data: this.dataRecebimento,
                        tipo: this.tipoRecebimento
                    }).then(
                        () => {
                            this.$toastr.s("Ganho editado com sucesso!");
                            this.fecharModal();
                            this.updateList();
                        },
                        error => {
                            this.$toastr.e("Houve um erro ao editar o ganho!");
                        }
                    )
                }
            }
            
        },
        editarModal(itemEditar) {
            this.id = itemEditar.id;
            this.valor = itemEditar.valor;
            this.dataRecebimento = itemEditar.data;
            this.tipoRecebimento = itemEditar.tipo;
            this.abrirModal('editar');
        },
        deletar(item) {
            if (confirm("Tem certeza?")) {
                db.collection('ganhos').doc(item.id).delete().then(
                    () => {
                        this.$toastr.s('Ganho excluído com sucesso!');
                        this.updateList();
                    },
                    error => {
                        this.$$toastr.e('Houve um erro ao excluir o ganho!');
                    }
                );
            }
        },
        updateList() {
            db.collection('ganhos').get().then(
                querySnapshot => {
                    this.loadingTable = true;
                    this.listaRecebimentos = [];
                    querySnapshot.forEach(
                        doc => {
                            this.listaRecebimentos.push(
                                {
                                    ...doc.data(),
                                    id: doc.id
                                }
                            );
                        }
                    )
                    this.loadingTable = false;
                }
            );
        },
        abrirModal(tipo) {
            this.insertModal = tipo;
        },
        fecharModal() {
            this.insertModal = '';
            this.valor = 0;
            this.dataRecebimento = null;
            this.tipoRecebimento = '';
        }
    }
}
</script>