<template>
    <div>
        <img v-if="offerer.profile_image" class="offerer-image" :src="offerer.profile_image" alt="Offerer image"/>
        <img v-else class="offerer-image" src="@/assets/default_image.png" alt="Offerer image"/>
        {{ offerer.full_name }}
        <button @click="createCollaboration()" class="btn btn-sm btn-outline-success accept-button">Aceptar</button>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    name: 'offerer-item',
    props: {
        offerer: {
            type: Object,
            required: true
        },
        collaboration_request_id: {
            type: Number,
            required: true
        }
    },
    methods: {
        createCollaboration() {
            Vue.http.post('collaborations/',
                {
                    collaborator_id: this.offerer.id,
                    collaboration_request: this.collaboration_request_id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${this.$store.state.auth.token}`
                    }
                }
            )
            .then(response => {
               this.$router.replace({ name: 'collaboration-details', params: { id: response.body.id } }); 
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>
<style>
    .offerer-image {
        border-radius: 50%;
        height: 50px;
        border: 2px solid #f4976c;
    }

    .accept-button {
        margin-left: 5px;
    }
</style>