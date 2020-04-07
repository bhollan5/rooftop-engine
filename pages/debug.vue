<template>
<div class="body">

  <side-bar title="debug zone">
    <card title="opts:">
      <text-field title="Test message:" v-model="test_msg.msg"></text-field>
      <text-field title="re:" v-model="test_msg.re"></text-field>
      <dropdown v-model="test_msg.type" :options="types"></dropdown>
      <button @click="send_test_msg()" class="card-button">log test message</button>
    </card>
  </side-bar>

  <div class="content">
    <h1>what's up hackerz</h1>
    <card title="console log:">
      <div v-for="msg in log" class="console-msg">
        <div class="msg-details">
          <div>{{msg.type}}:</div>
          <div v-if="msg.re" class="re">re: {{msg.re}}</div>
        </div>
        <div class="msg">
          {{msg.message}}
        </div>
      </div>
    </card>
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      
      //
      test_msg: {
        type: 'message',
        msg: 'My test message.',
        re: 'test',
      },
      types: ['message', 'warn', 'alert', 'error'],
      log: [],
    }
  },
  mounted() {
    this.update_log();
  },
  methods: {
    send_test_msg() {
      this.$console.log(this.test_msg.re, this.test_msg.msg);
    },
    update_log() {
      this.log = this.$console.get_log();
    }
  }
}
</script>

<style lang="scss" scoped>
.console-msg {
  cursor: pointer;
  font-size: var(--small-font-size);
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: solid 1px var(--card-light);
  display: flex;
}
.console-msg:hover {
  background: var(--card-light);
}

.msg-details {
  width: 70px;
  min-width: 70px;
  border-right: solid 1px var(--card-light);
  margin-right: 5px;
  font-weight: bold;
}
.re {
  color: var(--card-text2);
  font-weight: normal;
}
</style>