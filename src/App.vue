<script setup>
</script>

<template>

<div>
  <h2>Filename Input</h2>
  <input
    v-model="filename"
    type="text"
    placeholder="Enter filename"
    @input="checkFilename"
  />
  <p v-if="showWarning" style="color: red;">
    Warning: Filenames should not contain spaces!
  </p>


  <h2>Manual Quill in Vue 3</h2>
  <div id="editor"></div>
  <button @click="logContent">Log Content</button>
</div>
</template>

<script>
import { onMounted,ref } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  setup() {
    const filename = ref('')
    const showWarning = ref(false)
    let quillInstance = null

    const checkFilename = () => {
      showWarning.value = filename.value.includes(' ')
    }

    const logContent = () => {
      if (quillInstance) {
        console.log('Quill content:', quillInstance.getText())
      }
    }

    onMounted(() => {
      quillInstance = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Type something...',
      })
    })
    return {
      filename,
      showWarning,
      checkFilename,
      logContent
    }
  }
}
</script>




<style>
#editor {
  background: white;
  width: 70vw;         /* 70% of the screen width */
  height: 70vh;        /* 70% of the screen height */
  margin: auto;        /* Center horizontally */
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}
</style>
