<template>
    <v-card class="elevation-2">
        <div class="d-flex" style="padding:20px;justify-content: space-between;">
            <v-sheet :color="color" class="d-flex" style="justify-content:center;align-items:center;margin-right:10px" dark width="100" height="100">
                <i :class="icon" style="font-size:40px;"></i>
            </v-sheet>
            <div style="flex-grow:1;display:flex;flex-direction:column;justify-content:space-evenly;">
                <div style="text-align:right;">{{ title }}</div>
                <v-divider></v-divider>
                <div class="title" style="text-align:right;">R$ {{ value }}</div>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        icon: String,
        title: String,
        value: Number,
        color: String
    }
}
</script>