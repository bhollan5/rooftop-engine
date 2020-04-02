<template>
<div class="body" id="new-project">

  <div id="content">
    <h1>New Project</h1>
    <p>Yr new project will have a project page, which can host yr project files.</p>
    <br>
    <hr><br>

    <h3>Owner:</h3>
    <div class="flex-container">
      <dropdown :options="['you', 'an org you own']" :property="'0'"></dropdown>
      <text-field class="input" 
        v-model="project._id"
        placeholder="my-project-id" 
        title="Project id:"
      ></text-field>
    </div>


    <text-field class="input pass" 
      v-model="password"
      placeholder="pass" 
      title="Password:" 
      :password="true"
    ></text-field>
    

    <button @click="sign_in()">Sign In</button>

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
      project: {
        disp_name: '',
        _id: '',
        description: '',
      },
    }
  },
  mounted() {
    this.$parent.$parent.userOptions = false;
  },
  methods: {
    sign_in() {
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      })
      return;
      
      this.$store.dispatch('users/authenticate_user', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style lang="scss">
#content {
  h1 {
    text-align: left;
  }
  h3 {
    font-weight: normal;
  }
  hr {
    border-color: var(--bg-text2);
  }
  p {
    color: var(--bg-text2);
    font-size: var(--small-font-size);
  }
}
</style>