<template>
    <div class="list-item" @mouseover="$emit('new-path', { imagePath: this.item.image, uploaded: false })">
        <div class="item-text">
            <label class="item-checkbox-container">
                <input type="checkbox" checked="checked" class="item-checkbox" v-on:change="updateCheck()"
                    v-model="item.completed" :true-value="1" :false-value="0" />
                <span class="item-checkmark"></span>
            </label>
            <span v-on:click="show = !show"
                :class="[item.completed ? 'completed' : '', 'item-name', item.description ? 'pointer' : '', 'item-name']">{{
                    item.name
                }}</span>
        </div>
        <div class="item-icons">
            <font-awesome-icon icon="fa-angle-up" v-if="this.item.description" v-on:click="show = !show"
                :class="[show ? 'open' : '', 'arrow']" />
            <button class="pencil" @click="$emit('show-editform', item)">
                <font-awesome-icon icon="pencil" />
            </button>
            <button class="trashcan" @click="removeItem()">
                <font-awesome-icon icon="trash" />
            </button>
        </div>
    </div>
    <Transition v-if="this.item.description" @enter="enter" @after-enter="afterEnter" @leave="leave">
        <div v-if="show">
            <div class="d-flex justify-content-between">
                <div class="item-description-container">
                    <div :class="[item.completed ? 'completed' : '', 'item-description']">{{ item.description }}</div>
                </div>
                <div class="item-image-container">
                    <img class="item-image" v-bind:src="item.image ? '/storage/' + item.image : '/images/shopping-car.jpg'">
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Item',

    props: ['item'],

    data() {
        return {
            show: false
        }
    },

    emits: ['new-path', 'default-path', 'show-editform', 'item-changed'],

    methods: {
        updateCheck() {
            axios.put('api/item/check/' + this.item.id, {
                item: this.item
            })
                .then(response => {
                    if (response.status == 200) {
                        this.$emit('item-changed')
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        removeItem() {
            axios.delete('api/item/' + this.item.id)
                .then(response => {
                    if (response.status == 200) {
                        this.$emit('item-changed');

                        this.$emit('default-path')
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },

        enter(el) {
            el.style.height = 'auto';
            const height = getComputedStyle(el).height;
            el.style.height = 0;

            getComputedStyle(el);
            setTimeout(() => {
                el.style.height = height;
            });
        },

        afterEnter(el) {
            el.style.height = 'auto';
        },

        leave(el) {
            el.style.height = getComputedStyle(el).height;
            getComputedStyle(el);
            setTimeout(() => {
                el.style.height = 0;
            });
        },
    }
}

</script>

<style scoped>
.list-item {
    padding: 0.2rem 0 0rem 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightblue;
}

.item-text {
    display: flex;
    gap: 2.2rem;
    flex-grow: 1;
}

.item-name {
    flex-grow: 1;
    font-family: 'Architects Daughter', cursive;
    font-size: 1.4rem;
    color: DarkSlateGray;
    height: 1rem;
}

.item-text:hover+.item-icons .arrow {
    color: DarkSlateGray;
}

.item-checkbox-container {
    position: relative;
    display: block;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.item-checkbox-container input {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    cursor: pointer;
}

.item-checkbox-container:hover input~.item-checkmark {
    background-color: lightblue;
}

.item-checkbox-container input:checked~.item-checkmark {
    background-color: steelblue;
}

.item-checkbox-container input:checked~.item-checkmark:after {
    display: block;
}

.item-checkbox-container .item-checkmark:after {
    height: 12px;
    left: 4px;
    top: 0px;
    width: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

.item-checkmark {
    position: absolute;
    top: 9px;
    left: 2px;
    height: 1rem;
    width: 1rem;
    background-color: #eee;
}

.item-checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.item-icons {
    display: flex;
}

.item-description-container {
    margin-left: 2rem;
    margin-top: 0.5rem;
    background-image: url('/images/yellow-note.png');
    background-size: cover;
    width: 55%;
}

.item-description {
    padding: 3.4rem 1.6rem 0.8rem 0.8rem;
    font-family: 'Nanum Pen Script', cursive;
    font-size: 1.4rem;
    color: lightslategray
}

.item-image-container {
    margin-top: 2rem;
    width: 45%;
}

.item-image {
    width: 100%;
    max-height: 12rem;
    object-fit: contain;
}

.pointer {
    cursor: pointer;
}

.completed {
    text-decoration: line-through;
    text-decoration-color: steelblue;
    text-decoration-thickness: 2px;
}

.trashcan {
    font-size: 1.1rem;
    background-color: white;
    border: none;
    color: indianred;
    outline: none;
    cursor: pointer;
}

.trashcan:hover {
    color: crimson;
}

.pencil {
    background-color: white;
    font-size: 1.1rem;
    color: lightblue;
    border: none;
    outline: none;
    cursor: pointer;
}

.pencil :hover {
    color: DarkSlateGray;
}

.arrow {
    margin-right: 0.3rem;
    align-self: center;
    font-size: 1.1rem;
    color: lightblue;
    transition: all 0.2s;
    cursor: pointer;
}

.arrow :hover {
    color: DarkSlateGray;

}

.open {
    color: darkcyan;
    transform: rotate(180deg);
}

.v-enter-active {
    transition: height 0.4s ease-in-out;
    overflow: hidden;
}

.v-leave-active {
    transition: height 0.4s ease-in-out;
    overflow: hidden;
}
</style>