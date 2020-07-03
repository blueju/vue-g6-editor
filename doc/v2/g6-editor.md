# 关闭体验改进计划打点请求

为了更好服务用户，G6Editor 会将 URL 和版本信息发送回 AntV 服务器，除了 URL 与 G6 版本信息外，不会收集任何其他信息。

如果不需要，可以通过以下代码关闭：

```javascript
G6Editor.track(false);
```



# Toolbar（工具栏）

## 效果

---

![image-20200703144410984](g6-editor.assets/image-20200703144410984.png)

## 示例

在 UI 层面，HTML代码如下：

> 我使用的图标库是 font-awesome

```html
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
  ....
</div>
```

在逻辑层面，JS代码如下：

```javascript
// 实例化 g6-editor 编辑器
const editor = new G6Editor();
// 实例化 toolbar 工具栏
const toolbar = new G6Editor.Toolbar({
    container: "toolbar"
});
editor.add(toolbar);
```

## 注意

1. 必须有 data-command 属性
2. class 必须有 command 类名
3. data-command 属性的值必须为有效命令











