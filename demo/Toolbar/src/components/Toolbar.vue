<template>
  <div id="toolbar">
    <i data-command="save" class="command fa fa-floppy-o" title="保存"></i>
    <i data-command="undo" class="command fa fa-undo" title="撤销"></i>
    <i data-command="redo" class="command fa fa-repeat" title="重做"></i>
    <i data-command="delete" class="command fa fa-trash-o" title="删除"></i>
    <i data-command="zoomOut" class="command fa fa-search-minus" title="缩小"></i>
    <i data-command="zoomIn" class="command fa fa-search-plus" title="放大"></i>
    <i data-command="clear" class="command fa fa-eraser" title="清除画布"></i>
    <i data-command="toFront" class="command fa fa-arrow-up" title="提升层级"></i>
    <i data-command="toBack" class="command fa fa-arrow-down" title="下降层级"></i>
    <i data-command="selectAll" class="command fa fa-check-square-o" title="全选"></i>
    <i data-command="copy" class="command fa fa-files-o" title="复制"></i>
    <i data-command="paste" class="command fa fa-clipboard" title="粘贴"></i>
    <i data-command="autoZoom" class="command fa fa-expand" title="实际大小"></i>
    <i data-command="resetZoom" class="command fa fa-compress" title="适应页面"></i>
    <i data-command="addGroup" class="command fa fa-object-group" title="组合"></i>
    <i data-command="unGroup" class="command fa fa-object-ungroup" title="取消组合"></i>
  </div>
</template>

<script>
import g6Editor from "@antv/g6-editor";

export default {
  name: "Toolbar",
  mounted() {
    const editor = new g6Editor();
    const toolbar = new g6Editor.Toolbar({
      container: document.getElementById("toolbar")
    });
    editor.add(toolbar);
  }
};
</script>

<style scoped>
#toolbar {
  background: #fbfbfb;
  border: 1px solid #dadce0;
  padding: 4px 14px;
}

#toolbar i {
  font-size: 18px;
  padding: 4px;
  margin-right: 8px;
  color: #999999;
}

#toolbar i:hover {
  cursor: pointer;
  background-color: #eeeeee;
  color: #5cb6ff;
}

</style>
