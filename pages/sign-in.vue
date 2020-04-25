<template>
<div id="content">
    <div class="body">
    <h1>Sign In</h1>
    <line-break class="line-break"></line-break><br>

    <!--
    <text-field class="input username" 
      v-model="username"
      placeholder="User ID" 
      title="User id:"
    ></text-field>
    <text-field class="input pass" 
      v-model="password"
      placeholder="pass" 
      title="Password:" 
      :password="true"
    ></text-field>

    <button @click="sign_in()">Sign In</button>-->

    <form-field
    :fields="[{
      type: 'text',
      title: 'User id:',
      placeholder: 'User ID',
      key: 'username',
      required: true,
    }, {
      type: 'text',
      title: 'Password:',
      placeholder: 'pass',
      required: true,
      password: true,
      key: 'password',
    }]"
    :button="{ title: 'Sign In' }"
    @submit="sign_in($event)"
    >
    </form-field>

    <div class="info">
      <p>While Rooftop gets off the ground, accounts are only available for staff & creators, on a case-by-case basis.</p>
      <br>
      <p>If you'd like to get involved as a staff member or creator, feel free to join our <a href="https://discord.gg/qCjmpwC" target="_blank"> discord</a>.</p>
    </div>
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
    sign_in(data) {
      this.$auth.loginWith('local', {
        data: {
          username: data.username,
          password: data.password
        }
      }).then((response) => {
        console.log(response);
      }).catch((err) => {
        this.$store.commit('error', 'Authentication failed!');
      })
      return;
    }
  }
}
</script>

<style lang="scss">
#content {
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