<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="primary" dark>Add new Item</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Add new item</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="lastId" disabled/>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="costData" label="Item cost" :rules="[rules.required, rules.cost]"/>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="quantityData" label="Quantity" :rules="[rules.required, rules.quantity]"/>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="nameData" label="Item name" :rules="[rules.required, rules.name, rules.counter]"/>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat :disabled="isValid" @click="saveItem">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "AddItem",
        props: {
            items: Array
        },
        data: () => ({
            dialog: false,
            nameData: '',
            costData: null,
            quantityData: null,
            rules: {
                required: value => !!value || 'Required.',
                name: value => {
                    const pattern = /^[A-ZА-Яа-яa-z ]+$/i;
                    return pattern.test(value) || 'Invalid item name'
                },
                cost: value => {
                    const pattern = /^[0-9]+$/i;
                    return pattern.test(value) || 'Invalid item cost'
                },
                quantity: value => {
                    const pattern = /^[0-9]+$/i;
                    return pattern.test(value) || 'Invalid quantity'
                },
                counter: value => (value.length <= 30 && value.length > 15) || 'Min 15 and max 30 characters',
            }
        }),
        computed: {
            lastId() {
                const idArr = this.items.map((item) => {
                    return item.Id;
                }).sort((a, b) => {
                    if (a > b) return 1;
                    if (a < b) return -1;
                });
                return idArr[idArr.length-1] + 1;
            },
            isValid() {
                const isNameValid = /^[A-ZА-Яа-яa-z ]+$/i.test(this.nameData) &&
                    (this.nameData.length <= 30 && this.nameData.length > 15);
                const isCostValid = /^[0-9]+$/i.test(this.costData);
                const isQuantityValid = /^[0-9]+$/i.test(this.quantityData);
                return !(isNameValid && isCostValid && isQuantityValid);
            }
        },
        methods: {
            saveItem() {
                const data = {
                    Id: this.lastId,
                    Name: this.nameData,
                    Price: this.costData,
                    Quantity: this.quantityData
                };
                axios.post('http://localhost:8081/items', data).then(function () {
                }).catch(function (error) {
                    console.log(error);
                });
                this.updateItemsList(data)
                this.dialog = false;
            },
            updateItemsList(data) {
                this.$emit('add-item', data);
                this.nameData = '';
                this.costData = null;
                this.quantityData = null;
            }

        }
    }
</script>

<style scoped>

</style>