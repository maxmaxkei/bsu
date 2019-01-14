<template>
    <div class="main_container">
        <v-layout>
            <v-flex xs12>
                <v-card>
                    <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Ticket for <strong>{{item.name}}</strong></h3>
                            <hr>
                            <p>You bought:  <strong>{{item.item}}</strong></p>
                            <p>Total count:  <strong>{{item.quantity}}</strong></p>
                            <p>Total purchase amount:  <strong>{{item.totalCost}}</strong></p>
                            <hr>
                            <p>You'r account balance:  <strong>{{item.balance}}</strong></p>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <router-link to="/">
                            <v-btn color="orange" class="main_btn" @click="deleteTicket">Go To Main</v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Ticket",
        data: () => ({
            item: {}
        }),
        beforeCreate() {
            const self = this;
            axios.get('http://localhost:8081/tickets')
                .then((res) => {
                    self.item = res.data.item[0];
            });
        },
        methods: {
            deleteTicket() {
                axios({
                    method: 'delete',
                    url: 'http://localhost:8081/tickets',
                    data: {
                        item: this.item.item
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .main_container {
        width: 500px;
        margin: 200px auto;
    }
    p {
        margin: 10px 0;
    }
</style>