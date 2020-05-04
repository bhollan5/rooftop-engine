<template>
<container class="tab-container">

  <div class="tab-labels">
    <div v-for="(tab, tab_i) in tabs"
      class="tab-label"
      :class="{ selected: active_tab == tab_i }"
      @click="active_tab = tab_i"
    >
      {{tab}}
    </div>
  </div>

  <div class="tab-content">
    <slot :name="tabs[active_tab]"/>
  </div>

</container>
</template>

<script>

export default {
  name: 'tabContainer',

  props: {
    tabs: {
      type: Array,
      default() {
        return [
          'General',
          'Content',
          'Style',
        ]
      }
    }
  },

  data() {
    return {
      active_tab: 2,
    }
  },

}

</script>

<style lang="scss" scoped>

.tab-container {
  width: 100%;
}

.tab-labels {
  width: 100%;
  height: 30px;
  padding-left: 10px; 
  font-size: var(--small-font-size);
  display: flex;
  align-items: flex-end;
}


.tab-label {
  padding: 3px 15px;
  display: inline;
  text-align: center;
  color: var(--card-text2);
  cursor: pointer;
  transition: .5s;

  border-left: solid 1px var(--card);
  border-right: solid 1px var(--card);
  
  &.selected {
    color:var(--card-text);
    background: var(--bg-lighter);
  }
  &:hover {
    color: var(--card-text);
  }
}

.tab-content {
  width: 100%;
  height: 100%;
  background: var(--bg-lighter);
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);
}

</style>