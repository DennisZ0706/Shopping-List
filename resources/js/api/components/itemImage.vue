<template>
    <div class="image-card">
        <div class="image-container">
            <img v-bind:src="imagePath ? image : '/images/shopping-car.jpg'">
        </div>
    </div>
</template>

<script>

export default {
    name: 'Image',

    props: {
        imagePath: {},
        uploaded: {}
    },

    computed: {
        image() {
            return this.uploaded == true ? this.imagePath : './storage/' + this.imagePath
        }
    }
}

</script>

<style scoped>
.image-card {
    margin-top: 1rem;
    padding: 2.6rem;
    background-image: url('/images/colored-note.png');
    background-size: cover;
    border-radius: 14px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.image-container {
    padding: 5px;
}

img {
    width: 100%;
    height: 160px;
    object-fit: contain;
}
</style>