<template>
    <div class="container_data">
        <v-layout align-center justify-space-around row>
            <AddItem :items="stuff"  @add-item="addItem($event)"/>
            <BuyPhone :info="selectedItem"/>
        </v-layout>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="stuff"
                :pagination.sync="pagination"
                select-all
                item-key="Name"
                class="elevation-1"
        >
            <template slot="headers" slot-scope="props">
                <tr class="heading">
                    <th>
                        <v-checkbox
                                :input-value="props.all"
                                :indeterminate="props.indeterminate"
                                primary
                                hide-details
                                @click.stop="toggleAll"
                        ></v-checkbox>
                    </th>
                    <th
                            v-for="header in props.headers"
                            :key="header.text"
                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                            @click="changeSort(header.value)"
                    >
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                </tr>
            </template>
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td>
                        <v-checkbox
                                :input-value="props.selected"
                                primary
                                hide-details
                        ></v-checkbox>
                    </td>
                    <td>{{ props.item.Id}}</td>
                    <td class="text-xs-right">{{ props.item.Name }}</td>
                    <td class="text-xs-right">{{ props.item.Price }}</td>
                    <td class="text-xs-right">{{ props.item.Quantity }}</td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import AddItem from "./AddItem";
    import axios from "axios";
    import BuyPhone from "./BuyPhone";
    export default {
        name: "Main",
        components: {BuyPhone, AddItem},
        data: () => ({
            pagination: {
                sortBy: 'id'
            },
            selected: [],
            headers: [
                {
                    text: 'ID',
                    value: 'Id'
                },
                { text: 'Name', value: 'Name' },
                { text: 'Price', value: 'Price' },
                { text: 'Quantity', value: 'Quantity' }
            ],
            stuff: []
        }),
        methods: {
            toggleAll () {
                if (this.selected.length) this.selected = [];
                else this.selected = this.stuff.slice()
            },
            changeSort (column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column;
                    this.pagination.descending = false
                }
            },
            addItem(data) {
                this.stuff.push(data);
            }
        },
        beforeCreate() {
            const self = this;
            axios.get('http://localhost:8081/items')
                .then((res) => {
                    self.stuff = res.data.items;
                });
        },
        computed: {
            selectedItem() {
                let info = {
                    isSelected: false,
                    item: {}
                }
                if(this.selected.length) {
                    info.isSelected = true;
                    info.item = this.selected[0];
                }
                return info;
            }
        }
    }
</script>

<style scoped>
    .container_data {
        max-width: 1000px;
        margin: 50px auto;
    }
    .heading {
        background-color: #BBDEFB;
    }
</style>