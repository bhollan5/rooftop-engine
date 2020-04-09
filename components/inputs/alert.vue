<template>
<transition name="slide-down">
<div class="alert" v-if="$console.alert_msg"
  :class="{
    message: type == 'message',
    action: type == 'action',
    danger: type == 'danger',
    confirm: type == 'confirm',
  }">
  <div class="msg">{{$console.alert_msg}}</div>
  <div class="close">x</div>
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
  }
}
</script>

<style lang="scss">
.alert {
  width: 100%;
  max-width: 200px;
  font-size: var(--small-font-size);
  padding: 5px 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);
  display: flex;
  justify-content: space-between;
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