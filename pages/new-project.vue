<template>
<div class="content" id="new-project">

  <div class="body">
    <h1>New Project</h1>
    <p>Yr new project will have a project page, which can host yr project files.</p>
    <br>
    <hr><br>

    <text-field class="input" 
        v-model="project.title"
        placeholder="My Project Title" 
        title="Project title:"
        regularfont
      ></text-field>

    <h3>Owner: {{project.owner}}</h3>
    <div class="flex-container align-center">
      <dropdown :options="owner_options" :property="'0'" :title="'Owner:'"></dropdown> /
      <text-field class="input" 
        v-model="project._id"
        placeholder="my-project-id" 
        title="Project id:"
        regularfont
      ></text-field>
    </div>


    <text-field class="input" 
      v-model="project.description"
      placeholder="This project is about x y z..." 
      title="Description:" 
    ></text-field>

    <dropdown :options="['music', 'visual art', 'development']"
      v-model="project.type"></dropdown>
    
    <br>
    <button @click="add_project()" class="action">Make Project</button>
    <br>

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
        title: 'Rooftop Website',
        _id: 'rooftop-website',
        owner: '',
        description: 'The website used by Rooftop Media.',
        type: 'development',
      },
    }
  },
  mounted() {
    this.$parent.$parent.userOptions = false;
    this.project.owner = this.$auth.user.username;
  },
  computed: {
    owner_options() {
      let owner_options = [];
      owner_options.push(this.$auth.user.username);
      return owner_options
    }
  },
  methods: {
    add_project() {
      for (let key in this.project) {
        if (!this.project[key]) {
          console.error("Missing this field: " + key);
          return;
        }
      }
      this.$store.dispatch('projects/create_project', this.project)
      .then(() => {
        this.$router.push('/projects/' + this.project._id);
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
  .dropdown {
    width: 150px;
  }
}

</style>