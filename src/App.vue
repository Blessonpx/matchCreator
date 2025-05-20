<script setup>
</script>

<template>
  <div>
  <h2>Manual Quill in Vue 3</h2>
  <div id="editor" style="height: 800px;"></div>
  <button @click="logContent">Log Content</button>
</div>
</template>

<script>
import { onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  setup() {
    let quillInstance = null;

    onMounted(() => {
      quillInstance = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Type something...',
      });
    });

    function logContent() {
      if (quillInstance) {
        console.log('Quill content:', quillInstance.getText());
      }
    }

    return { logContent }
  }
}
</script>




<style>
#editor {
  background: white;
}
</style>
