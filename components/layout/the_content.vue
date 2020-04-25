<!-- Use this for page content.

<the-content>

  Yr content here. 
  

</the-content>

                            -->

<template>
<div id="content">

  <transition name="left-popup">
  <the-sidebar v-if="1 || show_side_bar && body_data">
    
    <slot name="sidebar" />

  </the-sidebar>
  </transition>


  <div class="body-container">
  
    <div class="body-floating-icons">
      <slot name="floatingicons" />
    </div>

    <div class="body">
      <slot name="body" />
    </div>

    <div class="content-footer">
      <slot name="footer" />
    </div>

  
  </div>

</div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.body-floating-icons, .footer-floating-icons {
  position: sticky;
  width: 30px;
  padding-left: 10px;
  padding-top: 10px;
  svg {
    fill: var(--bg-text2);
    --icon: var(--bg-text2);
    cursor: pointer;
    &:hover:not(.disabled) {
      fill: var(--bg-text);
      --icon: var(--bg-text);
    }
  }
}
.body-floating-icons {
  left: 10px;
  top: 0px;
}
</style>