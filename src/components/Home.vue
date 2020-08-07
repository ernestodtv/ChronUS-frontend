<template>
    <div class="home">
        <div class="home-background">
        </div>
        <div v-if="logged_student.available_time" class="container">
           <div class="row main-row">
                <div class="offset-md-1 col-md-3">
                    <img v-if="logged_student.profile_image" class="home-image mb-3" :src="logged_student.profile_image" alt="Profile"/>
                    <img v-else class="home-image" src="@/assets/default_image.png" alt="Profile"/>
                    <h4>Tiempo disponible:</h4>
                    <h5>{{ availableTime }}</h5>
                </div>
                <div class="col-md-7">
                    <h3 class="home-message">Bienvenid@ a Chronus, {{ logged_student.user.first_name }}</h3>
                    <p>Chronus es la red colaborativa de la Universidad de Sevilla. En ella puedes intercambiar conocimiento con tus compañeros universitarios, haciendo uso del tiempo como moneda de cambio. </p>
                    <p>
                        <h6>Solicitudes de colaboración</h6>
                        En el apartado "Solicitudes de colaboración" puedes explorar solicitudes que hayan publicado otros usuarios,
                        visualizar las solicitudes que has publicado y realizar una nueva solicitud.
                    </p>
                    <p>
                        <h6>Mis ofrecimientos de colaboración</h6>
                        En el apartado "Mis ofrecimientos de colaboración" puedes visualizar los ofrecimientos que has hecho a solicitudes de colaboración de otros usuarios.
                    </p>
                    <p>
                        <h6>Mis colaboraciones</h6>
                        Cuando un usuario acepte un ofrecimiento de colaboración que le hayas hecho, se creará una colaboración. En el apartado "Mis colaboraciones"
                        puedes acceder a tus colaboraciones en curso y chatear con otros usuarios.
                    </p>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            logged_student: {}
        }
    },
    mounted() {
        this.$store.dispatch('retrieveLoggedStudent')
        .then(response => {
            this.logged_student = response.body;
        }).catch(error => {
            console.log(error);
        });
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
                default:
                    minutesString = 'No tienes tiempo disponible'
            }
            return minutesString;
        },
    },
    computed: {
        availableTime() {
            let availableTime = this.logged_student.available_time;
            let splitAvailableTime = availableTime.split('.');
            let availableTimeString = '';
            if (splitAvailableTime[0] == '0') {
                availableTimeString = this.convertMinutesToString(splitAvailableTime[1]);
            } else {
                availableTimeString = splitAvailableTime[0];
                availableTimeString += splitAvailableTime[0] == '1' ? ' hora' : ' horas';
                if (splitAvailableTime[1] != '00') {
                    availableTimeString += ' y ' + this.convertMinutesToString(splitAvailableTime[1]);
                }
            }
            return availableTimeString;
        },
    }
}
</script>
<style scoped>
    .home {
        margin-top: -50px;
    } 

    .home-background {
        background-image: url('../assets/home.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        height: 200px;
        position: absolute;
        width: 100%;
    }

    .main-row {
        position: relative;
        bottom: -123px;
    }

    .home-image {
        border-radius: 50%;
        height: 180px;
        border: 5px solid #f4976c;
        
    }

    .home-message {
        margin-top: 100px;
    }
</style>