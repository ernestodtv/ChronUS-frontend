<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <router-link v-if="loggedIn" :to="{ name: 'home' }" class="nav-link text-secondary"><img class="logo" src="@/assets/chronus.png"/></router-link>
        <router-link v-else :to="{ name: 'landing' }" class="nav-link text-secondary"><img class="logo" src="@/assets/chronus.png"/></router-link>
        <div class="d-flex flex-grow-1">
            <div class="w-100 text-right">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar7">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
        <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar7">
            <ul class="navbar-nav ml-auto flex-nowrap">
                <li v-if="!loggedIn">
                    <router-link :to="{ name: 'login' }" class="nav-link">Iniciar sesión</router-link>
                </li>
                <li v-if="!loggedIn" class="nav-item">
                    <router-link :to="{ name: 'register' }" class="nav-link">Registrarse</router-link>
                </li>
                <li v-if="loggedIn" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Solicitudes de colaboración
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link :to="{ name: 'collaboration-request-list' }" class="dropdown-item">Explorar</router-link>
                        <router-link :to="{ name: 'my-collaboration-request-list' }" class="dropdown-item">Mis solicitudes</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{ name: 'collaboration-request-creation' }" class="dropdown-item">Solicitar colaboración</router-link>
                    </div>
                </li>
                <li v-if="loggedIn" class="nav-item">
                    <router-link :to="{ name: 'my-offer-list' }" class="nav-link">Mis ofrecimientos de colaboración</router-link>
                </li>
                <li v-if="loggedIn" class="nav-item">
                    <router-link :to="{ name: 'collaboration-list' }" class="nav-link">Mis colaboraciones</router-link>
                </li>
                <template v-if="loggedIn">
                    <li v-if="logged_student.profile_image" class="nav-item dropleft">
                        <img class="profile-image dropdown-toggle"  href="#" id="imageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :src="logged_student.profile_image" alt="Avatar" />
                        <div class="dropdown-menu" aria-labelledby="imageDropdown">
                            <a class="dropdown-item logout" @click="logout()" >Cerrar sesión</a>
                        </div>
                    </li>
                    <li v-else class="nav-item dropleft">
                        <img class="default-image dropdown-toggle"  href="#" id="imageDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src="@/assets/default_image.png" alt="Avatar" />
                        <div class="dropdown-menu" aria-labelledby="imageDropdown">
                            <a class="dropdown-item logout" @click="logout()" >Cerrar sesión</a>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>
<script>
import { BIconHouse } from 'bootstrap-vue';

export default {
    name: 'navbar',
    data() {
        return {
            logged_student: {}
        }
    },
    components: {
        BIconHouse
    },
    mounted() {
        if(this.loggedIn) {
            this.$store.dispatch('retrieveLoggedStudent')
            .then(response => {
                this.logged_student = response.body;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('destroyToken')
            .then(response => {
                this.$router.replace({ name: 'landing' });
            })
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        },
    },
    watch: {
        loggedIn: function() {
            if(this.loggedIn) {
                this.$store.dispatch('retrieveLoggedStudent')
                .then(response => {
                    this.logged_student = response.body;
                }).catch(error => {
                    console.log(error);
                });
            } else {
                this.logged_student = {}
            }
        }
    }

}
</script>
<style scoped>
    .nav-link {
        color: #303c6c!important;
        font-weight: 700;
    }

    .logo {
        height: 35px;
    }

    .profile-image {
        border-radius: 50%;
        height: 45px;
        border: 2px solid #303c6c;
    }

    .default-image {
        border-radius: 50%;
        height: 45px;
    }

    .logout {
        cursor: pointer;
    }
    
</style>