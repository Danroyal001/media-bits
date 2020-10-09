<template>
<div class="otp-button-wrapper">
<!-- Begin Root -->
    <span class="otp-label">{{ title }}</span>
    <div class="otp-input-row">
        <input pattern="\d+" type="number" v-for="x in inputCount" @input="switchActiveInput($event)" :id="'otp-input-field' + x" :key="x" class="white center teal-text otp-input" maxlength="1" required>
    </div>
<!-- End Root -->
</div>
</template>

<script>
export default {
    name: 'OTPInput',
    props: {
        inputCount: {
            type: Number,
            default: 4,
            required: false
        },
        title: {
            type: String,
            required: false,
            default:'Type OTP here'
        }
    },
    data(){
        return {
            value: ""
        }
    },
    methods: {
        switchActiveInput($event){
            const value = $event.target.value
            if((value !== null) && (value !== undefined)){
                console.log(value);
            }
        }
    }
}
</script>

<style scoped>
.otp-button-wrapper{
    background-color: teal;
    width: max-content;
    border: thin solid teal;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.otp-label{
    font-size: 20px;
    color: white;
}
.otp-input-row{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.otp-input-row > .otp-input{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: thin solid teal;
    caret-color: teal !important;
}
.teal{
    background-color: teal !important;
}
.teal-text{
    color: teal !important;
}
.white{
    background-color: white;
}
.white-text{
    color: white;
}
</style>