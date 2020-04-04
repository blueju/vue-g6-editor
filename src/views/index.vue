<template>
  <div id="vue-g6-editor">
    <el-row>
      <el-col :span="24">
        <header>vue-g6-editor</header>
      </el-col>
    </el-row>
    <!-- 工具栏 -->
    <el-row>
      <el-col :span="24">
        <div id="toolbar">
          <i data-command="save" class="command fa fa-floppy-o" title="保存"></i>
          <i class="fa fa-picture-o" title="保存为图片" @click="openSaveAsImageDialog"></i>
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
      </el-col>
    </el-row>
    <!-- 元素面板 + 画布 + 属性栏 -->
    <el-row>
      <!-- 元素面板 -->
      <el-col :span="2">
        <div id="itempannel">
          <!-- 开始节点 -->
          <div
            id="startNode"
            class="getItem"
            data-type="node"
            data-shape="flow-circle"
            data-size="72*72"
            data-label="开始节点"
            data-color="#FA8C16"
            data-nodeType="startNode"
          >
            <img draggable="false" :src="startNodeSVGUrl" alt srcset />
          </div>

          <!-- 常规节点 -->
          <div
            id="regularNode"
            class="getItem"
            data-type="node"
            data-size="100*50"
            data-label="常规节点"
            data-color="#1890ff"
          >
            <img draggable="false" :src="regularNodeSVGUrl" alt srcset />
          </div>

          <!-- 条件节点 -->
          <div
            id="judgeNode"
            class="getItem"
            data-type="node"
            data-shape="flow-rhombus"
            data-size="80*80"
            data-label="条件节点"
            data-color="#13C2C2"
          >
            <img draggable="false" :src="conditionNodeSVGUrl" />
          </div>

          <!-- 结束节点 -->
          <div
            id="endNode"
            class="getItem"
            data-type="node"
            data-shape="flow-circle"
            data-size="80*80"
            data-label="结束节点"
            data-color="#FA8C16"
            data-nodeType="endNode"
          >
            <img draggable="false" :src="endNodeSVGUrl" />
          </div>
        </div>
      </el-col>
      <!-- 画布 -->
      <el-col :span="18">
        <el-col :span="24">
          <div id="page"></div>
        </el-col>
      </el-col>
      <!-- 属性栏 -->
      <el-col :span="4">
        <div id="detailpannel">
          <!-- 节点属性栏 -->
          <div v-if="nodeAttributeBarVisible" id="nodeAttributeBar" data-status="node-selected">
            <div class="title">节点属性</div>
            <div class="main">
              <el-form :model="nodeAttributeForm" label-position="top" label-width="80px">
                <el-form-item label="节点文本">
                  <el-input
                    v-model="nodeAttributeForm.label"
                    @change="saveNodeAttribute"
                  ></el-input>
                </el-form-item>
                <el-form-item label="宽度">
                  <el-input
                    v-model="nodeAttributeForm.width"
                    @change="saveNodeAttribute"
                  ></el-input>
                </el-form-item>
                <el-form-item label="高度">
                  <el-input
                    v-model="nodeAttributeForm.height"
                    @change="saveNodeAttribute"
                  ></el-input>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker
                    v-model="nodeAttributeForm.color"
                    @change="saveNodeAttribute"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- 边属性栏 -->
          <div v-if="edgeAttributeBarVisible" id="edgeAttributeBar" data-status="edge-selected">
            <div class="title">边属性</div>
            <div class="main">
              <el-form :model="edgeAttributeForm" label-position="top" label-width="80px">
                <el-form-item label="边文本">
                  <el-input
                    v-model="edgeAttributeForm.label"
                    @change="saveEdgeAttribute"
                  ></el-input>
                </el-form-item>
                <el-form-item label="边文本">
                  <el-select v-model="edgeAttributeForm.shape" @change="saveEdgeAttribute">
                    <el-option label="流程图折线" value="flow-polyline"></el-option>
                    <el-option label="流程图圆⻆折线" value="flow-polyline-round"></el-option>
                    <el-option label="流程图曲线" value="flow-smooth"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- <div data-status="group-selected">群组属性栏</div>
          <div data-status="canvas-selected">画布属性栏</div>
          <div data-status="multi-selected">多选时属性栏</div>-->
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <article>
      <!-- 下载图片 -->
      <section class="save-as-image-dialog">
        <el-dialog title="下载图片" :visible.sync="saveAsImageDialogVisible" width="360px">
          <el-form label-width="100px" label-position="top">
            <el-form-item label="选择图片格式">
              <el-select v-model="saveAsImageFormat">
                <el-option label="jpg" value="jpg">
                  <span style="float: left;">jpg</span>
                  <span style="float: right; color: #8492a6; font-size: 13px;">白色背景</span>
                </el-option>
                <el-option label="png" value="png">
                  <span style="float: left;">png</span>
                  <span style="float: right; color: #8492a6; font-size: 13px;">透明背景</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="saveAsImageDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAsImage">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </article>
  </div>
</template>
<script>
import G6Editor from "@antv/g6-editor";
import mixin from "./mixin";
export default {
  name: "VueG6Editor",
  mixins: [mixin],
  data() {
    return {
      // 节点属性表单
      nodeAttributeForm: {
        label: "",
        width: "",
        height: ""
      },
      // 节点属性栏是否可见
      nodeAttributeBarVisible: false,
      // 节点属性表单
      edgeAttributeForm: {
        label: ""
      },
      // 边属性栏是否可见
      edgeAttributeBarVisible: false,
      // SVG节点图片URL地址
      startNodeSVGUrl: require("../assets/start-node.svg"),
      endNodeSVGUrl: require("../assets/end-node.svg"),
      regularNodeSVGUrl: require("../assets/regular-node.svg"),
      conditionNodeSVGUrl: require("../assets/condition-node.svg"),
      modelNodeSVGUrl: "https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg",
      // 编辑器
      editor: null,
      saveAsImageDialogVisible: false,
      saveAsImageFormat: "jpg"
    };
  },
  mounted() {
    this.initG6Editor();
  },

  methods: {
    // 初始化
    initG6Editor() {
      const _this = this;
      const editor = new G6Editor();
      this.editor = editor;
      G6Editor.track(false);
      const Command = G6Editor.Command;
      // 注册新命令save
      Command.registerCommand("save", {
        // 禁止保存命令进入队列
        queue: false,
        // 命令是否可用
        enable: (editor) => {
          return true;
        },
        // 正向命令
        execute(editor) {
          let needSaveData = editor.getCurrentPage().save();
          localStorage.setItem("flowData", JSON.stringify(needSaveData));
          _this.$message.success("数据已保存");
        },
        // 反向命令
        back(editor) {
          console.log("反向命令");
          console.log(editor);
        },
        // 快捷键：Ctrl + S
        shortcutCodes: [
          ["metaKey", "s"],
          ["ctrlKey", "s"]
        ]
      });
      // 画布
      const flow = new G6Editor.Flow({
        graph: {
          container: "page"
        },
        shortcut: {
          // 开启保存快捷键
          save: true
        }
      });

      // 设置边
      flow.getGraph().edge({
        shape: "flow-polyline"
      });

      // 元素面板栏
      const itempannel = new G6Editor.Itempannel({
        container: "itempannel"
      });
      // 工具栏
      const toolbar = new G6Editor.Toolbar({
        container: "toolbar"
      });
      // 属性栏
      const detailpannel = new G6Editor.Detailpannel({
        container: "detailpannel"
      });
      // 挂载以上组件到Editor
      editor.add(flow);
      editor.add(itempannel);
      editor.add(toolbar);
      editor.add(detailpannel);
      // 挂载到window，方便调试
      window.editor = editor;

      // 获取当前画布
      const currentPage = editor.getCurrentPage();
      currentPage.on("afterchange", (e) => {
        if (e.action === "add") {
          if (e.model.nodetype === "startNode" || e.model.nodetype === "endNode") {
            let nodes = this.editor.getCurrentPage().getNodes();
            for (const item of nodes) {
              if (item.model.nodetype === e.model.nodetype && item.model.id !== e.model.id) {
                this.editor.getCurrentPage().remove(e.item);
                this.$message.warning("只能有一个开始节点或结束节点");
              }
            }
          }
        }
      });
      // 监听（选择对象后）事件
      currentPage.on("afteritemselected", (ev) => {
        console.log("打印所选对象属性", ev.item);
        console.log("打印所选对象数据模型", ev.item.model);
        const selectedItemDataModel = ev.item.model;
        // 如果选择的对象是节点
        if (ev.item.isNode) {
          this.edgeAttributeBarVisible = false;
          this.nodeAttributeBarVisible = true;
          this.nodeAttributeForm.label = selectedItemDataModel.label;
          this.nodeAttributeForm.width = selectedItemDataModel.size.split("*")[0];
          this.nodeAttributeForm.height = selectedItemDataModel.size.split("*")[1];
          this.nodeAttributeForm.color = selectedItemDataModel.color;
        }
        // 如果选择的对象是边
        if (ev.item.isEdge) {
          ev.item.graph.edge({
            shape: "flow-polyline-round"
          });
          this.nodeAttributeBarVisible = false;
          this.edgeAttributeBarVisible = true;
          this.edgeAttributeForm.label = selectedItemDataModel.label;
          this.edgeAttributeForm.shape = selectedItemDataModel.shape;
        }
      });
      // 监听（删除后）事件
      currentPage.on("afterdelete", (ev) => {
        this.nodeAttributeBarVisible = false;
        this.edgeAttributeBarVisible = false;
      });
    },
    // 打开保存为图片弹窗
    openSaveAsImageDialog() {
      this.saveAsImageDialogVisible = true;
    },
    // 保存为图片
    saveAsImage() {
      let newCanvas;
      if (this.saveAsImageFormat === "jpg") {
        let canvas = this.editor.getCurrentPage().saveImage();
        newCanvas = document.createElement("canvas");
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        let newContext = newCanvas.getContext("2d");
        newContext.fillStyle = "#fff";
        newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
        newContext.drawImage(canvas, 0, 0);
      }
      if (this.saveAsImageFormat === "png") {
        newCanvas = this.editor.getCurrentPage().saveImage();
      }
      let imageDataURL = newCanvas.toDataURL();
      let downloadLink = document.createElement("a");
      downloadLink.download = "图片.jpg";
      downloadLink.href = imageDataURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      this.saveAsImageDialogVisible = false;
    }
  }
};
</script>

<style lang="less">
@import url("./index.less");
</style>
