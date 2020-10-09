<template>
<div class="otp-button-wrapper">
<!-- Begin OTP -->
    <span class="otp-label">{{ title }}</span>
    <div class="otp-input-row">
        <input title="required" data-otp-input pattern="\d{1}" v-for="x of length" @input="switchActiveInput($event)" :id="'otp-input-field' + x" :key="x" class="white center teal-text otp-input" maxlength="1" min="0" max="9" required>

        <button data-otp-cancel-button @click="clear" title="cancel" class="otp-cancel-button" type="button">&times;</button>
    </div>
<!-- End OTP -->
</div>
</template>

<script>
export default {
    name: 'OTPInput',
    props: {
        length: {
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
        clear(){
            this.value = '';
            document.querySelectorAll('[data-otp-input]').forEach(i => i.value = '');
        },
        switchActiveInput($event){
            const $this = this;

            const value = $event.target.value
            if((value !== null) && (value !== undefined)){
                if("number" === typeof parseInt(value, 10)){
                    this.value += value;
                    console.log(this.value);

                    const nextElem = $event.target.nextElementSibling;
                    
                    if((nextElem !== null) && (nextElem !== undefined) && nextElem.classList.contains('otp-input')){
                        nextElem.focus();
                    } else if(nextElem.classList.contains('otp-cancel-button')) {
                        $this.$emit('value', parseInt($this.value, 10));
                        $this.value = '';
                    }
                } else if ("number" !== typeof parseInt(value, 10)){
                    $event.target.value = '';
                }
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
.otp-input-row > button{
    color: white;
    background: teal;
    font-weight: bold;
    /* border: thin solid teal; */
    height: 40px;
    width: 40px;
    border-radius: 5px;
    cursor: pointer;
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