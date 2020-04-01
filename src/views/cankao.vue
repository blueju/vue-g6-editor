<template>
  <el-container>
    <el-main>
      <div class="wrap">
        <!-- 工具栏 -->
        <div id="toolbar" class="toolbar">
          <i data-command="undo" class="command el-icon el-icon-arrow-left" title="撤回"></i>
          <i data-command="redo" class="command el-icon el-icon-arrow-right" title="重做"></i>
          <i data-command="delete" class="command el-icon el-icon-delete" title="删除"></i>
          <i data-command="zoomOut" class="command el-icon el-icon-zoom-out" title="缩小"></i>
          <i data-command="zoomIn" class="command el-icon el-icon-zoom-in" title="放大"></i>
          <i data-command="save" class="command el-icon el-icon-upload" title="保存"></i>
        </div>
        <el-row :gutter="20">
          <el-col :span="4">
            <!-- 元素面板栏 -->
            <div id="itempannel" class="ph left">
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
                  alt
                  srcset
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
                  alt
                  srcset
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
                  alt
                  srcset
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
                  alt
                  srcset
                />
              </div>
              <div
                class="getItem"
                data-type="node"
                data-shape="customNode"
                data-size="80*48"
                data-label="我是自定义的"
                data-color="#722ED1"
              >
                <img
                  draggable="false"
                  src="https://user-gold-cdn.xitu.io/2019/3/15/169809645b016da6?w=114&h=128&f=png&s=1893"
                  alt
                  srcset
                />
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <!-- 主画布 -->
            <div id="page" class="ph"></div>
          </el-col>
          <el-col :span="4">
            <div class="ph right">
              <!-- 详细面板 -->
              <div id="detailpannel" class="detailpannel">
                <div data-status="node-selected" class="panel" id="node_detailpanel">
                  <div class="panel-title">属性详情</div>
                  <div class="block-container">
                    <el-input
                      v-model="nodeLabel"
                      size="mini"
                      @change="changeNodeLabel"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </div>
              <!-- 缩略图 -->
              <div class="minimap">
                <div class="panel-title">缩略图</div>
                <div id="minimap"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import G6Editor from '@antv/g6-editor'
export default {
  data() {
    return {
      graph: null,
      nodeLabel: ''
    }
  },
  mounted() {
    this.initG6Editor()
  },
  methods: {
    // 画布保存方法
    saveGraph() {
      // 获取当前page
      const page = this.editor.getCurrentPage()
      // 保存画布
      const data = page.save()
    },
    // 修改Node的label
    changeNodeLabel(value) {
      const editor = this.editor
      editor.executeCommand(() => {
        const page = editor.getCurrentPage()
        const selectedItems = page.getSelected()
        selectedItems.forEach(item => {
          page.update(item.id, {
            label: value
          })
        })
      })
    },
    // 初始化
    initG6Editor() {
      // this
      const _this = this
      // G6Editor
      const editor = new G6Editor()
      // editor挂载到Vue
      this.editor = editor
      // Flow
      const Flow = G6Editor.Flow
      // Command
      const Command = G6Editor.Command

      // 定义Save命令
      Command.registerCommand('save', {
        // 命令是否进入队列，默认是 true
        queue: false,
        // 命令是否可用
        enable(eidtor) {
          return true
        },
        // 正向命令
        execute(eidtor) {
          _this.saveGraph()
        },
        // 快捷键：Ctrl+shirt+s
        shortcutCodes: [['ctrlKey', 'shiftKey', 's']]
      })
      // 主画布
      // Mind 思维导图
      // Koni 网络图、拓扑图
      // Flow 流程图
      const page = new G6Editor.Flow({
        graph: {
          container: 'page'
        }
      })
      // 设置边样式，内置3种样式
      // flow-polylinels
      // flow-polyline-round
      // flow-smooth
      page.getGraph().edge({
        shape: 'flow-polyline'
      })
      // 自定义节点
      Flow.registerNode('customNode', {
        draw(item) {
          const group = item.getGraphicGroup()
          const model = item.getModel()
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fill: '#333',
              text: model.label
            }
          })
          group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fill: '#333',
              text: ' (' + model.x + ', ' + model.y + ') \n 原点是组的图坐标',
              textBaseline: 'top'
            }
          })

          return group.addShape('rect', {
            attrs: {
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              stroke: 'red'
            }
          })
        }
      })
      // 元素面板栏
      const itempannel = new G6Editor.Itempannel({
        container: 'itempannel',
      })
      // 工具栏
      const toolbar = new G6Editor.Toolbar({
        container: 'toolbar',
      })
      // 详细面板
      const detailpannel = new G6Editor.Detailpannel({
        container: 'detailpannel'
      })
      // 缩略图
      const minimap = new G6Editor.Minimap({
        container: 'minimap',
        height: 226,
        width: 226
      })
      // 组件挂载到Editor
      editor.add(page)
      editor.add(itempannel)
      editor.add(toolbar)
      editor.add(detailpannel)
      editor.add(minimap)
      // 获取当前page
      const currentPage = editor.getCurrentPage()
      // 监听选择变化
      currentPage.on('afteritemselected', ev => {
        console.log(ev);

        // 选择对象为Node节点
        if (ev.item.isNode) {
          // 获取属性
          const nm = ev.item.getModel()
          _this.nodeLabel = nm.label
        }
        // 选择对象为Edge节点
        if (ev.item.isEdge) {
          // 获取属性
          const nm = ev.item.getModel()
          _this.nodeLabel = nm.label
        }
      })
    }
  },
}
</script>

<style>
.wrap {
  border: 1px solid #eee;
  height: 833px;
}
.ph {
  height: 800px;
}
.el-icon {
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
}
.el-icon:hover {
  color: blue;
}
.toolbar {
  padding: 6px 0;
  background: #eee;
}
.left {
  border-right: 1px solid #eee;
  background: #fcfcfc;
}
.left .getItem {
  float: left;
  width: 100px;
  height: 100px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  border-left: 1px solid #eee;
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
}
.detailpannel {
  flex: 1;
}
.minimap {
  height: 226px;
}
.panel-title {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
}
.block-container {
  padding: 10px;
}
</style>