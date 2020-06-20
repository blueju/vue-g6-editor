# vue-g6-ediotr

当前分支为 issue 演示分支，非主分支。



演示内容：

禁止拖拽改变位置，但同时保留节点的 hover 和 click 监听事件。



issue 地址：

https://github.com/blueju/vue-g6-editor/issues/3



思路：

花了半天时间，暂时也没查到有什么自带的属性或方法来禁止编辑。

所以暂时只能通过主动触发错误的方式，来禁止编辑，详见代码，可通过commit记录查看改变处。



参考：

[如何禁止已经连接节点的线段不被拖动]: https://github.com/antvis/g6-editor/issues/46
[请问一下流程图画完后，展示的时候能否禁止]: https://github.com/antvis/g6-editor/issues/105
[有禁止画布上的元素拖动的配置吗]: https://github.com/antvis/g6-editor/issues/58



另外还参考了一部分 GGEditor 的 issue：

[如何阻止添加node]: https://github.com/alibaba/GGEditor/issues/84

[如何禁止对流程图的操作，只能看，不能移动？]: https://github.com/alibaba/GGEditor/issues/89

