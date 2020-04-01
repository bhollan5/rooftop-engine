<template>
<div class="body" id="sign-up">
  <h1>Add Account</h1>
  <line-break class="line-break"></line-break>
  <br>

  <text-field class="input" nopadding
    placeholder="Pheobe P." 
    title="display name:"
    v-model="display_name"></text-field>

  <text-field class="input" nopadding
    placeholder="@pheobeppeabodybb" 
    title="username:"
    v-model="username"></text-field>

  <text-field class="input" nopadding
    placeholder="pheobe@gmail.com" 
    title="email:"
    v-model="email"></text-field>

  <text-field class="input" nopadding
    placeholder="This is a secret!" 
    title="password:" :password="true"
    v-model="user_pass"></text-field>
    
  <text-field class="input" nopadding
    placeholder="The same thing as above." 
    title="retype password:" :password="true"
    v-model="user_pass2"></text-field>

  <button @click="add_account()">Add account!</button>

  <div class="info">
    <p>For now, you'll only be able to add an account if you have admin permissions.</p>
    <br>
    <p>If you have an account, try  <router-link to="/sign-in"> signing in</router-link>!</p>
    <br><br><br><br>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      display_name: '', 
      username: 'test',
      email: '',
      user_pass: 'pass',
      user_pass2: '',
    }
  },
  mounted() {
    this.$parent.$parent.userOptions = false;
  },
  methods: {
    // Sign up
    add_account() {
      if (!this.username) {
        alert("No uusername found!");
        return;
      } else if (!this.user_pass) {
        alert("No password found!");
        return;
      }
      this.$store.dispatch('users/createUser', {
        display_name: this.display_name,
        username: this.username,
        email: this.email,
        password: this.user_pass,
      })
    },

    
  }
}
</script>

<style lang="scss">

$desktop-bp: 800px;
$tablet-bp: 400px;

#sign-up {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding-top: 100px;
    padding-bottom: 50px;
    font-weight: normal;
  }
  @media only screen and (max-width: $desktop-bp) {
    h1 {
    padding-top: 50px;
    padding-bottom: 20px;
  }
  }
  .line-break {
    max-width: 350px;

  }
  .input  {
    width: 90%;
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