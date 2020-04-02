# 事件

根据官网文档，事件包括鼠标事件、编辑器事件、数据变更事件、状态变更事件、控制事件这几类，官方文档仅仅只是做了模糊概括，并未详细列出有哪些事件。

通过查阅原官方文档、查阅源码 和 实际操作，总结出以下事件列表：

## 事件列表

> import G6Editor from "@antv/g6-editor";
>
> const editor = new G6Editor();
>
> const page = editor.getCurrentPage()

| 事件                       | 备注 | 提供者        |
| -------------------------- | ---- | ------------- |
| aftercommandexecute        |      | editor 编辑器 |
| beforecommandexecute       |      | editor 编辑器 |
|                            |      |               |
| afterchange                |      | page 画布     |
| afterdelete                |      | page 画布     |
| afteritemactived           |      | page 画布     |
| afteritemselected          |      | page 画布     |
| afteritemunactived         |      | page 画布     |
| afteritemunselected        |      | page 画布     |
| anchor:mousedown           |      | page 画布     |
| anchor:mouseenter          |      | page 画布     |
| anchor:mouseleave          |      | page 画布     |
| anchor:mouseup             |      | page 画布     |
| beforechange               |      | page 画布     |
| beforeitemactived          |      | page 画布     |
| beforeitemselected         |      | page 画布     |
| beforeitemunactived        |      | page 画布     |
| beforeitemunselected       |      | page 画布     |
| click                      |      | page 画布     |
| contextmenu                |      | page 画布     |
| dragedge:beforeshowanchor  |      | page 画布     |
| edge:mouseenter            |      | page 画布     |
| edge:mouseleave            |      | page 画布     |
| hoveranchor:beforeaddedge  |      | page 画布     |
| hovernode:beforeshowanchor |      | page 画布     |
| keyup                      |      | page 画布     |
| mousedown                  |      | page 画布     |
| mouseenter                 |      | page 画布     |
| mouseleave                 |      | page 画布     |
| mouseup                    |      | page 画布     |
| node:click                 |      | page 画布     |
| node:mousedown             |      | page 画布     |
| node:mouseenter            |      | page 画布     |
| node:mouseleave            |      | page 画布     |
| node:mouseup               |      | page 画布     |
| statuschange               |      | page 画布     |
|                            |      |               |
|                            |      |               |
|                            |      |               |
|                            |      |               |
|                            |      |               |
|                            |      |               |
|                            |      |               |
|                            |      |               |
|                            |      |               |



## 如何绑定事件

使用 on 方法



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

方法有很多，我可能没办法将全部都列出来并解释，在实际操作中，更多的是需要大家自己通过在控制台打印的方式，在原型链中查找符合需求的方法。

## 保存数据模型

将画布数据保存为数据模型，执行该方法将返回一个包含节点数据和边数据的对象

```javascript
import G6Editor from "@antv/g6-editor";
let editor = new G6Editor();
// 可能无法立即查看，可设个定时器，1秒后查看
editor.getCurrentPage().save();
// {nodes: [...], edges: [...]}
```

## 保存为图片

将画布数据数据保存为图片，执行该方法将返回一个canvas

```javascript
import G6Editor from "@antv/g6-editor";
let editor = new G6Editor();
// 可能无法立即查看，可设个定时器，1秒后查看
editor.getCurrentPage().saveImage();
```

## 读取数据

读取数据模型，并展示在画板中，入参是一个包含节点数据和边数据的对象

```javascript
import G6Editor from "@antv/g6-editor";
let editor = new G6Editor();
let dataModel = {...}
editor.getCurrentPage().read(dataModel);
```

# 命令

## 内置命令

### 内置命令列表

| 命令           | 备注 |
| -------------- | ---- |
| common         |      |
| copyAdjacent   |      |
| add            |      |
| update         |      |
| redo           |      |
| undo           |      |
| copy           |      |
| pasteHere      |      |
| paste          |      |
| addGroup       |      |
| unGroup        |      |
| delete         |      |
| selectAll      |      |
| toBack         |      |
| toFront        |      |
| clear          |      |
| multiSelect    |      |
| move           |      |
| append         |      |
| appendChild    |      |
| moveMindNode   |      |
| collapseExpand |      |
| collapse       |      |
| expand         |      |
| zoomTo         |      |
| zoomIn         |      |
| zoomOut        |      |
| autoZoom       |      |
| resetZoom      |      |

### 内置命令的源码对应位置

**源码文件：**g6Editor.js

**源码对应位置：**将 g6Editor.js 格式化后，检索关键词 registerCommand("，如下图：

![image-20200401102141528](g6-editor.assets/image-20200401102141528.png)



## 重载内置命令





## 注册自定义命令

### 应用场景

我想通过点击工具栏中的保存图标来保存数据模型

```html
<i data-command="save" class="command fa fa-floppy-o" title="保存"></i>
```

### 方案一

使用 editor.Command.registerCommand() 方法注册自定义命令save，在其正向命令中，添加自己需要的处理逻辑。

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

### 方案二

当然我们有另外一种方式，即给保存图标添加点击事件，在方法中执行 editor.getCurrentPage().save() 方法。

### 注意

注册的自定义命令中，即便你设置了快捷键，但还是默认不启用的。

如果需要启用，需要按如下设置进行开启。

```javascript
const flow = new G6Editor.Flow({
  graph: {
    container: "page"
  },
  shortcut: {
    // 开启保存快捷键
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
> 源码对应位置：将 g6Editor.js 格式化后，检索关键词 shortcutCodes: [
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





# 边

## 内置边

### 内置边列表

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

### 内置边的源码对应位置

**源码文件：**g6Editor.js

**源码对应位置：**将 g6Editor.js 格式化后，检索关键词 registerCommand("，如下图：

![image-20200402104501328](g6-editor.assets/image-20200402104501328.png)



## 重载内置边



## 注册自定义边



