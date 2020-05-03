<template>
    <div class="d-flex" style="align-items:center;">
        <v-chip v-if="tipoLogin == 'google'">
            <v-avatar left>
                <v-img :src="imagemLink"></v-img>
            </v-avatar>
            {{ userName }}
        </v-chip>

        <v-chip v-else>
            <v-avatar left>
                <v-img src="../assets/usuario_sem_foto.png"></v-img>
            </v-avatar>
            {{ userEmail }}
        </v-chip>
    </div>
</template>

<script>
export default {
    computed: {
        imagemLink: function () {
            return this.$store.state.userLinkFoto;
        },
        userName: function () {
            return this.$store.state.userName;
        },
        userEmail: function () {
            return this.$store.state.userLogin;
        },
        tipoLogin: function () {
            return this.$store.state.tipoLogin;
        }
    }
}
</script>

