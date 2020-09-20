<template>
  <div id="itempanel">
    <div
      class="getItem"
      data-type="node"
      data-shape="flow-rect"
      data-size="120*48"
      data-label="常规节点"
      data-color="#1890FF"
    >
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg"
      />
    </div>
    <div
      class="getItem"
      data-type="node"
      data-shape="flow-circle"
      data-size="72*72"
      data-label="起止节点"
      data-color="#FA8C16"
    >
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
      />
    </div>
    <div
      class="getItem"
      data-type="node"
      data-shape="flow-rhombus"
      data-size="80*72"
      data-label="分叉节点"
      data-color="#13C2C2"
    >
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg"
      />
    </div>
    <div
      class="getItem"
      data-type="node"
      data-shape="flow-capsule"
      data-size="80*48"
      data-label="模型节点"
      data-color="#722ED1"
    >
      <img
        draggable="false"
        src="https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg"
      />
    </div>
  </div>
</template>

<script>
import g6Editor from "@antv/g6-editor";
export default {
  name: "ItemPanel",
  mounted() {
    const editor = new g6Editor();
    const itempannel = new g6Editor.Itempannel({
      container: document.getElementById("itempannel"),
    });
    editor.add(itempannel);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
