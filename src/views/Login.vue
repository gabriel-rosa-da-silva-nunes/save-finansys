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
                                            filled
                                            solo-inverted
                                            prepend-inner-icon="mdi-eye"
                                        >

                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="12">
                                        <v-btn color="green" style="width:100%;" dark>
                                            login
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