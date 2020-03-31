<template>
<div class="container" id="sign-in">
  <h1>Sign In</h1>
  <line-break class="line-break"></line-break>

  <text-field class="input username" placeholder="User ID" title="User id:"></text-field>
  <text-field class="input pass" placeholder="pass" title="Password:" :password="true"></text-field>
  <button @click="sign_in()">Sign In</button>

  <div class="info">
    <p>While Rooftop gets off the ground, accounts are only available for staff & creators, on a case-by-case basis.</p>
    <br>
    <p>If you'd like to get involved as a staff member or creator, feel free to join our <a href="https://discord.gg/qCjmpwC" target="_blank"> discord</a>.</p>
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
    sign_in() {
      this.$store.dispatch('users/authenticate_user', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss">
#sign-in {
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