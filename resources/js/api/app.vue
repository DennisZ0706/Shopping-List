<template>
    <div class="app-container">
        <Header />
        <List :items="items" v-on:reloadlist="getList()" @new-path="receiveImagepath" @show-editform="showEditform"
            @default-path="resetImagepath" />
        <Transition name="bounce">
            <Additemform v-if="show" v-on:reloadlist="getList()" @close-additem="closeCreateform" />
        </Transition>
        <Transition name="bounce">
            <Edititemform v-if="show3" :item="item" v-on:reloadlist="getList()" @close-edititem="closeEditform"
                @new-path="receiveImagepath" />
        </Transition>
        <Transition>
            <div v-if="show4" class="button-container">
                <Transition name="bounce2">
                    <font-awesome-icon icon="plus-square" class="add-button" v-if="show2" v-on:click=showCreateform() />
                </Transition>
            </div>
        </Transition>
        <Image :imagePath="imagePath" :uploaded="uploaded" />
    </div>
</template>

<script>

import axios from "axios"
import Header from "./components/header.vue"
import Additemform from "./components/additemForm.vue"
import Edititemform from "./components/edititemForm.vue"
import List from "./components/listView.vue"
import Image from "./components/itemImage.vue"

export default {
    components: {
        Header,
        Additemform,
        Edititemform,
        List,
        Image
    },

    data: function () {
        return {
            item: "",
            items: [],
            imagePath: "",
            show: false,
            show2: true,
            show3: false,
            show4: true,
        }
    },

    methods: {
        showCreateform() {
            setTimeout(() => this.show = true, 40);
            this.show2 = false;
            setTimeout(() => this.show4 = false, 40);
        },

        closeCreateform() {
            this.show = false
            setTimeout(() => this.show2 = true, 800);
            setTimeout(() => this.show4 = true, 500);

        },

        showEditform(value) {

            if (this.show == true) {
                this.show = false
                this.show2 = false
                setTimeout(() => this.show3 = true, 400);
                setTimeout(() => this.show4 = false, 40);
                this.item = value
            }

            else {
                this.show = false
                this.show2 = false
                setTimeout(() => this.show3 = true, 40);
                setTimeout(() => this.show4 = false, 40);
                this.item = value

            }
        },


        closeEditform() {
            setTimeout(() => this.show2 = true, 800);
            this.show3 = false
            setTimeout(() => this.show4 = true, 500);
        },

        getList() {
            axios.get('api/items')
                .then(response => {
                    this.items = response.data
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        },

        receiveImagepath(value) {
            this.imagePath = value['imagePath']
            this.uploaded = value['uploaded']
        },

        resetImagepath() {
            this.imagePath = ""
        },
    },

    created() {
        this.getList();
    }
}

</script>

<style scoped>
.app-container {
    width: 500px;
    margin: auto;
}

.button-container {
    display: flex;
    justify-content: center;
    min-height: 3rem;
    margin: 1rem 0;
}

.add-button {
    font-size: 3rem;
    color: forestgreen;
    cursor: pointer;
}

.add-button:hover {
    color: green;
}


.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

.bounce2-enter-active {
    animation: bounce-in 0.5s;
}
</style>