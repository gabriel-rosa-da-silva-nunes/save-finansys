<template>
    <div class="allscreen blueGradientLogin">
        <v-container>
            <v-row justify="center">
                <v-col sm="12" md="8" lg="6" >
                    <v-card dark style="background-color:transparent;box-shadow:none;">
                        <v-card-title class="title">
                            <v-spacer></v-spacer><img src="../assets/money.png"/><v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            <v-container fluid>
                                <v-row>
                                    <v-col sm="12">
                                        <v-text-field
                                            label="Email"
                                            filled
                                            v-model="email"
                                            solo-inverted
                                            prepend-inner-icon="mdi-email-newsletter"
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12">
                                        <v-text-field
                                            label="Password"
                                            type="password"
                                            v-model="password"
                                            filled
                                            solo-inverted
                                            prepend-inner-icon="mdi-eye"
                                        >

                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12" md="6">
                                        <v-btn color="green" style="width:100%;" dark @click="login">
                                            login
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="12" md="6">
                                        <v-btn color="white" style="width:100%;" light @click="loginGoogle">
                                            <img src="../assets/icon-google.png" width="20" height="20" style="margin-right:10px;"/> login Google
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>

                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Firebase from 'firebase';

export default {
    data: () => ({
        email:'',
        password: ''
    }),
    methods: {
        login() {
            Firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
                result => {
                    this.$store.commit('changeLogin',this.email);
                    this.$store.commit('changeTipoLogin','email');
                    this.$router.push({path:'/'});
                }
            ).catch(
                error => {
                    this.$toastr.e(error.message);
                    console.log(error);
                }
            )
        },
        loginGoogle() {
            let provider = new Firebase.auth.GoogleAuthProvider();
            Firebase.auth().signInWithPopup(provider).then(
                (resultado) => {
                    console.log(resultado);
                    this.$store.commit('changeLogin',resultado.user.email);
                    this.$store.commit('changeTipoLogin','google');
                    this.$store.commit('changePhoto',resultado.user.photoURL);
                    this.$store.commit('changeName',resultado.user.displayName);
                    this.$router.push({path:'/'});
                }
            ).catch(
                error => {
                    this.$toastr.e(error.message);
                }
            );
        }
    }
}
</script>

<style scoped>
    .allscreen {
        width:100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .blueGradientLogin {
        background-image: linear-gradient(to top, #30cfd0 -50%, #080b67 100%);
    }

    .v-text-field__details {
        display: none;
    }
</style>