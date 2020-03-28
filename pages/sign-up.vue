<template>
<div class="container" id="sign-up">
  <h1>Sign Up</h1>
  <line-break class="line-break"></line-break>
  <br>
  <text-field class="input username" placeholder="@pheobeppeabodybb" title="user id:"></text-field>
  <text-field class="input pass" placeholder="This is a secret!" title="password:"></text-field>
  <text-field class="input pass" placeholder="The same thing as above." title="retype password:"></text-field>
  <button>Sign In</button>

  <div class="info">
    <p>For now, you'll only be able to sign users up if you have admin permissions.</p>
    <br>
    <p>If you have an account, try  <router-link to="/sign-in"> signing in</router-link>!</p>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.$parent.$parent.userOptions = false;
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
#sign-up {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding-top: 100px;
    padding-bottom: 50px;
    font-weight: normal;
  }
  .line-break {
    max-width: 350px;

  }
  .input  {
    max-width: 300px;
    input{
      font-size: var(--regular-font-size);
    }
  }
  button {
    margin-top: 10px;
    padding: 2px 20px;
  }
  .info {
    margin-top: 50px;
    p {
      width: 350px;
      font-size: var(--small-font-size);
      color: var(--bg-text);
    }
  }
  
}
</style>