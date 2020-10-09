<template>
<div class="otp-button-wrapper">
<!-- Begin Root -->
    <span class="otp-label">OTP</span>
<!-- End Root -->
</div>
</template>

<script>
export default {
    name: 'OTPButton'
}
</script>

<style scoped>
.otp-button-wrapper{
    width: 200px;
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
    color: teal;
}
</style>