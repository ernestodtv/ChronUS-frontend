<template>
<router-link class="router-link" :to="{name: 'collaboration-details', params: {id: collaboration.id}}">
    <div class="card">
            <img style="height: 190px;" class="card-img-top" :src="collaborationImage" :alt="collaboration.title">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ collaboration.title }}</h5>
                <p class="card-text">{{ collaboration.description }}</p>
                <div class="mt-auto">
                    <div>{{ requestedTime }}</div>
                    <div>{{ formattedDate }}</div>
                </div>
            </div>
    </div>
</router-link>
</template>
<script>
export default {
    name: 'collaboration-item',
    props: {
        collaboration:  {
            type: Object,
            required: true
        }
    },
    methods: {
        convertMinutesToString(minutes) {
            let minutesString = '';
            switch(minutes) {
                case '25':
                    minutesString = '15 minutos';
                    break;
                case '50':
                    minutesString = '30 minutos';
                    break;
                case '75':
                    minutesString = '45 minutos';
                    break;
            }
            return minutesString;
        }
    },
    computed: {
        collaborationImage() {
            let competences = this.collaboration.competences;
            let imagePath = '';
            if (!competences.length) {
                imagePath =  require('@/assets/colors.png');
            } else if (competences.length > 1) {
                imagePath = require('@/assets/colors.png');
            } else if (competences[0].name == 'Actividad física') {
                imagePath = require('@/assets/physical_activity.png');
            } else if (competences[0].name == 'Matemáticas') {
                imagePath = require('@/assets/mathematics.jpg');
            } else if (competences[0].name == 'Ciencias sociales') {
                imagePath = require('@/assets/social_sciences.jpg');
            } else if (competences[0].name == 'Audiovisual') {
                imagePath = require('@/assets/audiovisual.jpg');
            } else if (competences[0].name == 'Idiomas') {
                imagePath = require('@/assets/languages.png');
            } else if (competences[0].name == 'Informática') {
                imagePath = require('@/assets/computing.jpg');
            } else if (competences[0].name == 'Ciencia') {
                imagePath = require('@/assets/science.png');
            }
            return imagePath;
        },
        requestedTime() {
            let requestedTime = this.collaboration.requested_time;
            let splitRequestedTime = requestedTime.split('.');
            let requestedTimeString = '';
            if (splitRequestedTime[0] == '0') {
                requestedTimeString = this.convertMinutesToString(splitRequestedTime[1]);
            } else {
                requestedTimeString = splitRequestedTime[0];
                requestedTimeString += splitRequestedTime[0] == '1' ? ' hora' : ' horas';
                if (splitRequestedTime[1] != '00') {
                    requestedTimeString += ' y ' + this.convertMinutesToString(splitRequestedTime[1]);
                }
            }
            return requestedTimeString;
        },
        formattedDate() {
            let deadline = new Date(this.collaboration.deadline);
            let day = deadline.getDate();
            let month = deadline.getMonth() + 1;
            let year = deadline.getFullYear();
            return `${day}/${month}/${year}`
        }
    }
    
}
</script>
<style scoped>
    .router-link {
        color: black;
        text-decoration: none;
    }
    .card {
        height: 100%;
        transition: box-shadow .3s;
    }
    .card:hover {
        box-shadow: 0 0 11px rgba(33,33,33,.2);
    }
</style>