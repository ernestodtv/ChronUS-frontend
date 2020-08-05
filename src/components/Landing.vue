<template>
    <div class="landing">
        <div class="bg-image">
            <div class="bg-gradient">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 mt-5 text-white">
                            <h2><span>Comparte conocimiento, </span><br/><span>gana tiempo</span></h2>
                            <span>Chronus es la red colaborativa de la Universidad de Sevilla. Entra o regístrate, comparte lo que sabes y gana tiempo por ello</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .landing {
        margin-top: -50px;
    }
    .bg-image {
        background-image: url('../assets/landing.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        height: 400px;
    }

    .bg-gradient {
        background: linear-gradient(90deg,#303c6c,rgba(39,16,102,0) 70%,rgba(39,16,102,0) 70%,#303c6c);
        height: 100%;
    }

</style>
