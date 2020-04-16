<template>
<!-- Put this component anywhere, and then call alerts like this:
this.$store.commit('error', msg)
-->

<transition name="slide-down">
<div class="alert" v-if="alert.msg"
  :class="{
    message: type == 'message',
    action: type == 'action',
    danger: type == 'danger',
    confirm: type == 'confirm',
  }">
  <div class="msg">{{alert.msg}}</div>
  <div class="close" @click="$store.commit('error', '')">x</div>
</div>
</transition>
</template>

<script>

export default {
  props: {
    type: {
      type: String, // action, danger, confirm
      default: 'message' 
    }
  },
  computed: {
    alert() {
      return this.$store.getters['alert'];
    }
  }
}
</script>

<style lang="scss">
.alert {
  width: 100%;
  max-width: 200px;
  font-size: var(--small-font-size);
  
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  div {
    padding: 5px 10px;
  }
}
.close {
  cursor: pointer;
}
.action {
  background: var(--action);
  color: var(--action-text);
}
.danger {
  background: var(--danger);
  color: var(--danger-text);
}
.confirm {
  background: var(--confirm);
  color: var(--confirm-text);
}
</style>