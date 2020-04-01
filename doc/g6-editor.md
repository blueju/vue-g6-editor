# 事件

## 事件列表





双击节点

node:dblclick



双击边

edge:dblclick



选择对象后

> 以上所指对象，为"节点"或"边"



## 如何查看更多事件

> 上面我发现整理的事件，可

```javascript
import G6Editor from "@antv/g6-editor";
let editor = new G6Editor();
// 可能无法立即查看，可设个定时器，1秒后查看
let events = editor.getCurrentPage()._events;
console.log(events);
```



# 方法

将画布保存为数据模型，返回一个对象，

```javascript
import G6Editor from "@antv/g6-editor";
let editor = new G6Editor();
// 可能无法立即查看，可设个定时器，1秒后查看
editor.getCurrentPage().save();
// {nodes: [...], edges: [...]}
```



将画布保存为图片，返回一个canvas

```javascript
import G6Editor from "@antv/g6-editor";
let editor = new G6Editor();
// 可能无法立即查看，可设个定时器，1秒后查看
editor.getCurrentPage().saveImage();
```



读取数据模型

```javascript
import G6Editor from "@antv/g6-editor";
let editor = new G6Editor();
let dataModel = {...}
editor.getCurrentPage().read(dataModel);
```



# 命令列表

但查阅源码发现，注册的内置命令不止上表的19个，此处存疑，如图：

![image-20200401102141528](g6-editor.assets/image-20200401102141528.png)





# 命令

内置命令

重载内置命令

应用场景：

我想通过点击工具栏中的保存图标来保存数据模型，使用 editor.Command.registerCommand() 方法重载内置命令命令save，在其正向命令中，添加自己需要的处理逻辑。

```javascript
Command.registerCommand("save", {
  // 命令是否进入队列，进入队列可执行撤销/重做，默认是 true
  queue: false,
  // 命令是否可用
  enable(eidtor) {
    return true;
  },
  // 正向命令
  execute(eidtor) {
    ...
  },
  // 快捷键：Ctrl+shirt+s
  shortcutCodes: [["ctrlKey", "shiftKey", "s"]]
});

```



当然我们有另外一种方式，即给保存图标添加事件，在事件中执行 editor.getCurrentPage().save() 方法。



注册自定义命令

注册的命令需要在设置为启用

```javascript
const flow = new G6Editor.Flow({
  graph: {
    container: "page"
  },
  shortcut: {
    zoomIn: true, // 开启放大快捷键
    zoomOut: true, // 开启视口缩小快捷键
    save: true
  }
});
```



# 快捷键

通过快捷键，可快速执行一些命令，默认情况下，含快捷键的内置命令有：

> 下表中的"Mac快捷键" 和"适用页面"，摘自官方文档，本人未验证
>
> 源码文件：g6Editor.js
>
> 命令源码位置：将 g6Editor.js 格式化后，检索关键词 shortcutCodes: [
>
> 官方文档PDF中的快捷键表格，存在错误，因为在源码检索 copy/paste 等命令并未发现其有快捷键

|      命令      |    Win 快捷键    | Mac 快捷键 |     备注     | 适⽤⻚⾯ |
| :------------: | :--------------: | :--------: | :----------: | :------: |
|      redo      | Ctrl + Shift + Z |    ⇧⌘Z     |     重做     | 所有页面 |
|      undo      |     Ctrl + Z     |     ⌘Z     |     撤销     | 所有页面 |
|     delete     |      Delete      |   Delete   |     删除     | 所有页面 |
|   selectAll    |      Ctrl+A      |     ⌘A     |     全选     | 所有页面 |
|     append     |      Enter       |   Enter    | 添加相邻节点 | 思维导图 |
|  appendChild   |       Tab        |    Tab     |  添加⼦节点  | 思维导图 |
| collapseExpand |     Ctrl + /     |     ⌘/     |  折叠/展开   | 思维导图 |
|     zoomIn     |     Ctrl + =     |     ⌘=     |     放大     | 所有页面 |
|    zoomOut     |     Ctrl + -     |     ⌘-     |     缩小     | 所有页面 |
|   resetZoom    |     Ctrl + 0     |     ⌘0     |   实际尺⼨   | 所有页面 |











|      命令      |    Win 快捷键    | Mac 快捷键 |     备注     | 适⽤⻚⾯ |
| :------------: | :--------------: | :--------: | :----------: | :------: |
|     clear      |                  |            |   清空画布   | 所有页面 |
|   selectAll    |      Ctrl+A      |     ⌘A     |     全选     | 所有页面 |
|      undo      |     Ctrl + Z     |     ⌘Z     |     撤销     | 所有页面 |
|      redo      | Ctrl + Shift + Z |    ⇧⌘Z     |     重做     | 所有页面 |
|     delete     |      Delete      |   Delete   |     删除     | 所有页面 |
|     zoomIn     |     Ctrl + =     |     ⌘=     |     放大     | 所有页面 |
|    zoomOut     |     Ctrl + -     |     ⌘-     |     缩小     | 所有页面 |
|    autoZoom    |                  |            |  ⾃适应尺⼨  | 所有页面 |
|   resetZoom    |     Ctrl + 0     |     ⌘0     |   实际尺⼨   | 所有页面 |
|    toFront     |                  |            |   提升层级   | 所有页面 |
|     toBack     |                  |            |   下降层级   | 所有页面 |
|      copy      |     Ctrl + C     |     ⌘C     |     复制     |  流程图  |
|     paste      |     Ctrl + V     |     ⌘V     |     粘贴     |  流程图  |
|  multiSelect   |                  |            |   多选模式   |  流程图  |
|    addGroup    |     Ctrl + G     |     ⌘G     |     组合     |  流程图  |
|    unGroup     | Ctrl + Shift + G |    ⇧⌘G     |   取消组合   |  流程图  |
|     append     |      Enter       |   Enter    | 添加相邻节点 | 思维导图 |
|  appendChild   |       Tab        |    Tab     |  添加⼦节点  | 思维导图 |
| collapseExpand |     Ctrl + /     |     ⌘/     |  折叠/展开   | 思维导图 |

> 源码位置：
>
> 





内置边

|                       |                                                              |
| --------------------- | ------------------------------------------------------------ |
| common                | 直线，不带箭头                                               |
|                       |                                                              |
| flow-base             | 直线，带箭头                                                 |
| flow-polyline         | 流程图折线                                                   |
| flow-polyline-round   | 流程图圆角折线                                               |
| flow-smooth           | 流程图曲线                                                   |
|                       |                                                              |
| diagram-base          | 直线，带箭头。<br />与 flow-base 的区别未知。                |
|                       |                                                              |
| page-base             | 仅在源码中发现其被注册为内置边，未实际操作，效果未知。       |
| mind-placeholder-edge | 弧线，无锚点，线位于节点底部，更适用于思维导图。             |
| mind-edge             | 弧线，更适用于思维导图脑图。                                 |
| koni-base             | 拖拽target目标节点时，边会围绕source源节点，自动调整为最近的锚点。<br />直线，带箭头，更适用于⽹络图/拓扑图。 |
|                       |                                                              |







