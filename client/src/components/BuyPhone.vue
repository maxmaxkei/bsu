<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="primary" :disabled="!info.isSelected">Purchase stuff</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Purchase stuff</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field v-model="FName" label="First Name" :rules="[rules.required, rules.name]"/>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="LName" label="Last Name" :rules="[rules.required, rules.name]"/>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="MName" label="Middle Name" :rules="[rules.required, rules.name]"/>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="Quant" label="Stuff count" :rules="[rules.required, rules.quantity]"/>
                            </v-flex>
                            <div>
                                <p>Client: <strong>{{fullName}}</strong></p>
                                <p>Client balance: <strong>{{getBalance}}</strong></p>
                                <p>Item: <strong>{{info.item.Name}}</strong></p>
                                <p>Cost of one item: <strong>{{info.item.Price}}</strong></p>
                                <p>Quantity of this items: <strong>{{info.item.Quantity}}</strong></p>
                                <hr>
                                <p style="font-weight: bold">Total cost: {{totalCost}}</p>
                            </div>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog=false">Close</v-btn>
                    <v-btn color="blue darken-1" flat :disabled="isValid" @click="purchase">Purchase</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "BuyPhone",
        props: {
            info: Object
        },
        data: () => ({
            FName: '',
            LName: '',
            MName: '',
            Quant: null,
            dialog: false,
            rules: {
                required: value => !!value || 'Required.',
                name: value => {
                    const pattern = /^[A-ZА-Яа-яa-z ]+$/i;
                    return pattern.test(value) || 'Invalid item name'
                },
                quantity: value => {
                    const pattern = /^[0-9]+$/i;
                    return pattern.test(value) || 'Invalid quantity';
                }
            },
            users: [],
            selectedUser: {},
            selectedItem: {}
        }),
        beforeCreate() {
            const self = this;
            axios.get('http://localhost:8081/users')
                .then((res) => {
                    self.users = res.data.users;
                })
        },
        computed: {
            fullName() {
                return `${this.LName} ${this.FName} ${this.MName}`;
            },
            getBalance() {
                for(let i = 0; i < this.users.length; i++) {
                    const isFNameMatch = this.FName == this.users[i].FirstName;
                    const isLNameMatch = this.LName == this.users[i].LastName;
                    const isMNameMatch = this.MName == this.users[i].MiddleName;
                    if(isFNameMatch && isLNameMatch && isMNameMatch) {
                        this.selectedUser = this.users[i];
                        return this.users[i].Balance;
                    }
                }
            },
            totalCost() {
                if(this.Quant > this.info.item.Quantity) {
                    return "Too many items, there is no so much!"
                } else if(this.Quant < 0) {
                    return "Items count less than 0!!!"
                }
                return this.info.item.Quantity*this.Quant;
            },
            isValid() {
                return !(this.selectedUser.Balance > 0 &&
                       this.info.item.Quantity >= Number.parseInt(this.Quant) &&
                       this.selectedUser.Balance >= (this.info.item.Price*this.Quant) &&
                       /^[0-9]+$/i.test(this.Quant));
            }
        },
        methods: {
            purchase() {
                const finalQuantity = this.info.item.Quantity - this.Quant;
                const finalBalance = this.selectedUser.Balance - this.info.item.Price*this.Quant;
                const data = {
                    name: this.fullName,
                    item: this.info.item.Name,
                    quantity: this.info.item.Quantity,
                    totalCost: this.info.item.Price*Number.parseInt(this.Quant),
                    balance: finalBalance
                };
                if(finalQuantity > 0) {
                    axios({
                        method: 'put',
                        url: 'http://localhost:8081/items',
                        data: {
                            Id: this.info.item.Id,
                            Quantity: finalQuantity
                        }
                    });
                } else {
                    axios({
                        method: 'delete',
                        url: 'http://localhost:8081/items',
                        data: {
                            Id: this.info.item.Id
                        }
                    })
                }
                axios({
                    method: 'put',
                    url: 'http://localhost:8081/users',
                    data: {
                        Id: this.selectedUser.Id,
                        Balance: finalBalance
                    }
                })
                axios.post('http://localhost:8081/tickets', data).then(function () {
                }).catch(function (error) {
                    console.log(error);
                }).then(() => {
                    this.$router.push('ticket/')
                });
            }
        }
    }
</script>

<style scoped>

</style>