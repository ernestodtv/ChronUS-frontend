<template>
    <div class="container pt-5">
        <div class="row" v-if="loaded">
            <div class="offset-md-3 col-md-6 text-center message" v-if="!collaboration_requests.length">En este momento no hay ofrecimientos de colaboración</div>
            <div v-else
                v-for="collaboration_request in collaboration_requests"
                :key="collaboration_request.id"
                class="col-md-4 mb-4"
            >
                <CollaborationRequestItem :collaboration_request="collaboration_request"></CollaborationRequestItem>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import CollaborationRequestItem from '@/components/CollaborationRequest/CollaborationRequestItem';

export default {
    name: 'my-offer-list',
    data() {
        return {
            collaboration_requests: [],
            logged_student: {},
            loaded: false
        };
    },
    components: {
        CollaborationRequestItem
    },
    mounted() {
        this.$store.dispatch('retrieveLoggedStudent')
        .then(response => {
           this.logged_student = response.body;
           this.fetchCollaborationRequests();
        }).catch(error => {
            console.log(error);
        })
    },
    methods: {
        fetchCollaborationRequests() {
            Vue.http.get(`collaboration-requests/?offerer_id=${this.logged_student.user.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${this.$store.state.auth.token}`
                    }
                }
            )
            .then(response => {
                this.collaboration_requests = response.body;
                this.loaded = true;
            }).catch(error => {
                console.log(error);
            });
        },
    }
}
</script>