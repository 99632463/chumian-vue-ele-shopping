<template>
  <li
    @click="$emit('change', index)"
    class="list-group-item list-group-item-action d-flex"
    :class="{'sum-active': active}"
    style="cursor:pointer;"
  >
    {{item.name}}
    <span class="btn btn-light btn-sm border ml-auto" v-if="!showOptions">
      {{item.num}}
    </span>
    <el-dropdown class="ml-auto" v-else>
      <span class="btn btn-light btn-sm border">
        {{item.num}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.stop.native="$emit('edit', { item, index })">修改</el-dropdown-item>
        <el-dropdown-item @click.stop.native="$emit('del', index)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </li>
</template>

<script>
export default {
  name: 'album-item',
  props: {
    item: Object,
    index: Number,
    active: Boolean,
    showOptions: Boolean
  }
}
</script>

<style lang='scss' scoped>

</style>