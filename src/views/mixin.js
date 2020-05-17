export default {
  methods: {
    // 保存节点属性
    saveNodeAttribute() {
      this.editor.executeCommand(() => {
        // 获取画布
        const page = this.editor.getCurrentPage();
        // 获取所选对象
        const selectedItem = page.getSelected()[0];
        page.update(selectedItem.id, {
          label: this.nodeAttributeForm.label,
          size: this.nodeAttributeForm.width + "*" + this.nodeAttributeForm.height,
          color: this.nodeAttributeForm.color
        });
      });
    },
    // 保存边属性
    saveEdgeAttribute() {
      this.editor.executeCommand(() => {
        // 获取画布
        const page = this.editor.getCurrentPage();
        // 获取所选对象
        const selectedItem = page.getSelected()[0];
        console.log(this.edgeAttributeForm);
        page.update(selectedItem.id, {
          label: this.edgeAttributeForm.label,
          shape: this.edgeAttributeForm.shape
        });
      });
    }
  }
};
