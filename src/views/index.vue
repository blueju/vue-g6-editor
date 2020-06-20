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
          <i class="fa fa-history" title="历史数据" @click="readHistoryData"></i>
          <i class="fa fa-hdd-o" title="上传数据" @click="readUploadData"></i>
          <i class="fa fa-download" title="另存为文件" @click="saveAsFile"></i>
          <i class="fa fa-picture-o" title="另存为图片" @click="openSaveAsImageDialog"></i>
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
          <i data-command="multiSelect" class="command fa fa fa-crop" title="多选"></i>
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
        <section class="right-part">
          <div id="detailpannel">
            <!-- 节点属性栏 -->
            <div id="nodeAttributeBar" class="pannel" data-status="node-selected">
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
            <div id="edgeAttributeBar" class="pannel" data-status="edge-selected">
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
            <div id="groupAttributeBar" class="pannel" data-status="group-selected">
              <div class="title">群组属性栏</div>
            </div>
            <div id="canvasAttributeBar" class="pannel" data-status="canvas-selected">
              <div class="title">画布属性栏</div>
              <div class="main">
                <el-form label-width="80px" label-position="right">
                  <el-form-item label="网格对齐">
                    <el-checkbox
                      v-model="canvasAttributeForm.grid"
                      @change="toggleGridShowStatus"
                    ></el-checkbox>
                  </el-form-item>
                  <el-form-item label="编辑状态">
                    <el-select v-model="editStatus" placeholder="请选择">
                      <el-option label="查看" value="view"></el-option>
                      <el-option label="修改" value="alter"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div id="multiAttributeBar" class="pannel" data-status="multi-selected">
              <div class="title">多选时属性栏</div>
            </div>
          </div>
          <!-- 缩略图 -->
          <div id="minimap">
            <div class="title">缩略图</div>
          </div>
        </section>
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
    <!-- 右键菜单 -->
    <section>
      <div id="contextmenu">
        <div data-status="node-selected" class="menu">
          <el-button data-command="copy" class="command">复制</el-button>
          <el-button data-command="paste" class="command">粘贴</el-button>
          <el-button data-command="delete" class="command">删除</el-button>
        </div>
        <div data-status="edge-selected" class="menu">
          <el-button data-command="delete" class="command">删除</el-button>
        </div>
        <div data-status="group-selected" class="menu">
          <el-button data-command="copy" class="command">复制</el-button>
          <el-button data-command="paste" class="command">粘贴</el-button>
          <el-button data-command="unGroup" class="command">取消组合</el-button>
          <el-button data-command="delete" class="command">删除</el-button>
        </div>
        <div data-status="canvas-selected" class="menu">
          <el-button data-command="undo" class="command">撤销</el-button>
          <el-button data-command="redo" class="command disable">重做</el-button>
        </div>
        <div data-status="multi-selected" class="menu">
          <el-button data-command="copy" class="command">复制</el-button>
          <el-button data-command="paste" class="command">粘贴</el-button>
          <el-button data-command="addGroup" class="command">组合</el-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import G6Editor from "@antv/g6-editor";
import mixin from "./mixin";
import { construct } from "netflix-conductor-json-tree/dist/index";
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
      // 节点属性表单
      edgeAttributeForm: {
        label: ""
      },
      // 画布属性栏表单
      canvasAttributeForm: {
        grid: true,
        cell: 20
      },
      // SVG节点图片URL地址
      startNodeSVGUrl: require("../assets/start-node.svg"),
      endNodeSVGUrl: require("../assets/end-node.svg"),
      regularNodeSVGUrl: require("../assets/regular-node.svg"),
      conditionNodeSVGUrl: require("../assets/condition-node.svg"),
      modelNodeSVGUrl: "https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg",
      // 编辑器
      editor: null,
      saveAsImageDialogVisible: false,
      saveAsImageFormat: "jpg",
      editStatus: "view"
    };
  },
  mounted() {
    this.initG6Editor();
    // 提供默认数据模型，方便
    let dataModel =
      '{"nodes":[{"type":"node","shape":"flow-circle","size":"72*72","label":"开始节点","color":"#FA8C16","nodetype":"startNode","x":415,"y":127,"id":"7c84bce9","index":0},{"type":"node","size":"100*50","label":"常规节点","color":"#1890ff","x":415,"y":237.5,"id":"bf1aeba8","index":2}],"edges":[{"source":"7c84bce9","sourceAnchor":2,"target":"bf1aeba8","targetAnchor":0,"id":"ef37a42f","shape":"flow-polyline","index":1}]}';
    this.editor.getCurrentPage().read(JSON.parse(dataModel));
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
          console.log(needSaveData);
          localStorage.setItem("flowData", JSON.stringify(needSaveData));
          _this.save(needSaveData);
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
        align: {
          line: {
            // 对齐线颜色
            stroke: "#FA8C16",
            // 对齐线粗细
            lineWidth: 1
          },
          // 开启全方位对齐
          item: true,
          // 网格对齐
          grid: true
        },
        grid: {
          // 网孔尺寸
          cell: 18
        },
        shortcut: {
          // 开启自定义命令保存的快捷键
          save: true
        }
      });
      window.flow = flow;

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
      // 缩略图
      let minimapWidth = getComputedStyle(document.querySelector(".right-part")).width;
      minimapWidth = Number(minimapWidth.replace(/px$/, ""));
      const minimap = new G6Editor.Minimap({
        container: "minimap",
        width: minimapWidth,
        height: 200
      });
      // 右键菜单
      const contextmenu = new G6Editor.Contextmenu({
        container: "contextmenu"
      });
      // 挂载以上组件到Editor
      editor.add(flow);
      editor.add(itempannel);
      editor.add(toolbar);
      editor.add(detailpannel);
      editor.add(minimap);
      editor.add(contextmenu);
      // 挂载到window，方便调试
      window.editor = editor;

      // 获取当前画布
      const currentPage = editor.getCurrentPage();
      // 此处为了模拟数据模型能渲染到画布中，所以延时2秒绑定beforechange事件
      setTimeout(() => {
        currentPage.on("beforechange", (e) => {
          if (_this.editStatus === "view") {
            throw "当前编辑状态为查看，禁止修改";
          }
        });
      }, 2000);
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
          this.edgeAttributeForm.label = selectedItemDataModel.label;
          this.edgeAttributeForm.shape = selectedItemDataModel.shape;
        }
      });
      // 监听（删除后）事件
      currentPage.on("afterdelete", (ev) => {});
    },
    // 打开保存为图片弹窗
    openSaveAsImageDialog() {
      this.saveAsImageDialogVisible = true;
    },
    // 开启/关闭网格对齐
    toggleGridShowStatus(value) {
      if (value) {
        this.editor.getCurrentPage().showGrid();
      } else {
        this.editor.getCurrentPage().hideGrid();
      }
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
    },
    // 保存为文件
    saveAsFile() {
      let jsonString = JSON.stringify(this.editor.getCurrentPage().save());
      let blob = new Blob([jsonString]);
      let blobURL = URL.createObjectURL(blob);
      let downloadLink = document.createElement("a");
      downloadLink.download = "数据.json";
      downloadLink.href = blobURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      URL.revokeObjectURL(blobURL);
      document.body.removeChild(downloadLink);
    },
    // 读取历史数据
    readHistoryData() {
      let stringData = localStorage.getItem("flowData");
      if (stringData === "" || stringData === "{}" || stringData === null) {
        this.$message.warning("无历史数据");
        return;
      }
      let jsonData = JSON.parse(stringData);
      this.editor.getCurrentPage().read(jsonData);
    },
    // 读取上传数据
    readUploadData() {
      let uploadButton = document.createElement("input");
      uploadButton.setAttribute("type", "file");
      uploadButton.setAttribute("accept", ".json");
      uploadButton.addEventListener("change", (e) => {
        console.dir(uploadButton);
        let file = uploadButton.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
          console.log(event);
          let text = JSON.parse(event.target.result);
          console.log(text);
          this.editor.getCurrentPage().read(text);
        };
        fileReader.readAsText(file);
      });
      uploadButton.click();
    },
    //
    save(source) {
      let edges = source.edges;
      let nodes = source.nodes;
      console.log(construct);
      let res = construct(source);
      console.log(JSON.stringify(res, null, 2));
    }
  }
};
</script>

<style lang="less">
@import url("./index.less");
</style>
