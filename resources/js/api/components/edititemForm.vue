<template>
    <div class="edit-item-form">
        <div class="mt-3 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <font-awesome-icon icon="pencil" class="header-symbol" />
                <h2 class="header-text">Boodschap bewerken</h2>
            </div>
            <font-awesome-icon icon="square-xmark" class="close fa-2x" @click="$emit('close-edititem')" />
        </div>
        <div class="form-fields">
            <div class="name-field">
                <input type="text" placeholder="voeg boodschap toe" v-model="this.item.name" />
            </div>
            <div class="description-container">
                <div class="description-field">
                    <textarea placeholder="beschrijving" v-model="this.item.description"></textarea>
                </div>
                <div class="image-container">
                    <img class="image-preview" v-bind:src="this.item.image ? image : '/images/shopping-car.jpg'">
                </div>
            </div>
            <div class="image-field">
                <input ref="fileupload" type="file" @change="onFileChange">
                <font-awesome-icon icon="square-xmark" class="delete" @click="deleteImage" />
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <font-awesome-icon icon="plus-square" @click="editItem()"
                :class="[this.item.name ? 'active' : 'inactive', 'fa-3x']" />
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Edititemform',

    props: ['item'],

    data() {
        return {
            url: './storage/' + this.item.image,
            imageDelete: false,
            fileChange: false,
        }
    },

    methods: {

        onFileChange(event) {
            this.fileChange = true;
            this.imageDelete = false;
            this.item.image = event.target.files[0];
            this.url = URL.createObjectURL(this.item.image);
        },

        deleteImage() {
            this.imageDelete = true;
            this.fileChange = false;
            this.item.image = null;
            this.$refs.fileupload.value = null;
            this.url = ""
        },

        editItem() {
            if (this.item.name == '') {
            }

            const config = {
                header: { "content_type": "multipart/form-data" }
            }

            let formData = new FormData();
            formData.append("_method", "put")
            formData.append('name', this.item.name);
            formData.append('description', this.item.description);
            if (this.fileChange == true) {
                formData.append('image', this.item.image)
            }

            if (this.imageDelete == true) {
                formData.append('delete', true)
            }

            axios.post('api/item/update/' + this.item.id, formData, config, {
            })

                .then(response => {
                    if (response.status == 200) {
                        if (this.imageDelete == true) { this.$emit('new-path', { uploaded: true, imagePath: this.item.image }); }
                        if (this.fileChange == true) { this.$emit('new-path', { uploaded: true, imagePath: URL.createObjectURL(this.item.image) }); }
                        this.item.name = "";
                        this.item.description = "";
                        this.item.image = "";
                        this.$refs.fileupload.value = null;
                        this.$emit('close-edititem');
                        this.$emit('reloadlist');

                    }
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        }
    },

    computed: {
        image() {
            return this.url
        }
    }
}

</script>

<style scoped>
.edit-item-form {
    margin-top: 1rem;
    padding: 1.1rem 2rem 1.6rem 1.8rem;
    background-image: url('/images/Notebook(2).png');
    background-size: cover;
    padding: 1.1rem 2rem 1.6rem 1.8rem;
}

.header-text {
    margin: 0 0 0 0.4rem;
    font-family: 'Cabin Sketch', cursive;
    font-size: 2.2rem;
    font-weight: 400;
    text-align: center;
    color: darkslategrey;
}

.header-symbol {
    color: darkslategrey;
    font-size: 1rem;
}

.form-fields {
    margin-bottom: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background-color: white;
}

.name-field {
    display: flex;
    justify-content: center;
    align-items: center;
}


.name-field input {
    width: 100%;
    margin-right: 10px;
    padding: 5px;
    background-color: white;
    border: none;
    border-bottom: 1px solid lightblue;
    font-family: 'Architects Daughter', cursive;
    color: DarkSlateGray;
    font-size: 1.4rem;
    outline: none;
}

.name-field input::placeholder {
    font-family: Verdana, Tahoma, sans-serif;
    font-size: 0.8rem;
    line-height: 2rem;
}

.description-container {
    height: 100px;
    display: flex;
    justify-content: space-between;
}

.description-field textarea {
    box-sizing: border-box;
    height: 100%;
    padding: 0.2rem;
    font-family: 'Nanum Pen Script', cursive;
    font-size: 1.4rem;
    color: DarkSlateGray;
    resize: none;
}

.description-field textarea:focus {
    outline: none;
}

.description-field textarea ::placeholder {
    font-family: Verdana, Tahoma, sans-serif;
    font-size: 0.8rem;
    line-height: 2rem;
}

.image-container {
    height: 100%;
    width: 50%;
}

.image-preview {
    height: 100%;
    max-width: 90%;
    object-fit: contain;
    float: right;
}

.image-field {
    display: flex;
    align-items: center;
}

.image-field input {
    width: 100%;
    margin-right: 10px;
    padding: 5px;
    background-color: #f7f7f7;
    border: 2px;
    outline: none;
}

.inactive {
    color: silver;
}

.active {
    color: forestgreen;
    cursor: pointer;
}

.active:hover {
    color: green;
}

.close {
    color: firebrick;
    cursor: pointer;
}

.close:hover {
    color: darkred;
    cursor: pointer;
}

.delete {
    color: indianred;
    cursor: pointer;
}

.delete:hover {
    color: darkred;
}
</style>