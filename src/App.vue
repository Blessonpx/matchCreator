<script setup>
</script>

<template>

<div>
  <h2>Match Name</h2>
  <input
    v-model="filename"
    type="text"
    placeholder="Enter matchname"
    @input="checkFilename"
  />
  <p v-if="showWarning" style="color: red;">
    Warning: Patch names should not contain spaces!
  </p>


  <h2>Match Description</h2>
  <div id="editor"></div>
  <button @click="logContent">Save and Verify</button>

  <!-- Dynamic Rows -->
  <div>
  <h2>Dynamic Rows (Dropdown + Textbox)</h2>

  <!-- Render each row -->
  <div
    class="row"
    v-for="(row, index) in rows"
    :key="index"
  >
    <select v-model="row.option">
      <option value="" disabled>Select option</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </select>

    <input
      v-model="row.text"
      type="text"
      placeholder="Enter text"
    />

    <button @click="removeRow(index)">Remove</button>
  </div>

  <button @click="addRow">Add Row</button>
</div>




</div>

<div>
  <h2>Call API Example</h2>
  <button @click="callApi">Call API</button>
  <p>{{ apiResponse }}</p>
</div>

<div>
  <h2>Match Staging</h2>
  <button @click="callApi1">Test Match</button>
  <button @click="callApi1">Regress Test</button>
  <button @click="callApi1">Release And Send to All</button>
  <button @click="callApi1">Show Last Run Stage</button>
  <button @click="callApi1">Show Queue</button>
</div>



<div class="date-time-widget">
<h2>Match Date Range </h2>
  <label for="date">Select Date:</label>
  <input type="date" v-model="selectedDate" />

  <label for="time" style="margin-left: 10px;">Select Time:</label>
  <input type="time" v-model="selectedTime" />
</div>

<p>
  Pick Up Changes Since: {{ selectedDate }} {{ selectedTime }}
</p>

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
    const apiResponse = ref('')
    const selectedDate = ref('')
    const selectedTime = ref('')

    const checkFilename = () => {
      showWarning.value = filename.value.includes(' ')
    }


    const logContent = () => {
      if (quillInstance) {
        console.log('Quill content:', quillInstance.getText())
        console.log('Quill content:', quillInstance.getContents())
      }
    }

    onMounted(() => {
      quillInstance = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Type something...',
      })
    })

    const rows = ref([
  { option: '', text: '' } // Start with one row
   ])

   const addRow = () => {
   rows.value.push({ option: '', text: '' })
   }

   const removeRow = (index) => {
    rows.value.splice(index, 1)
  }


  // api call 1
  const callApi = async () => {
    try {
      const response = await fetch('http://localhost:9002/quill/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ insert: quillInstance.getText() ,
          value: quillInstance.getContents()
        })
      })

      const data = await response.json()

      // Check if response is as expected
      if (data.Message === 'Recieved') {
        apiResponse.value = 'Recieved'
      } else {
        apiResponse.value = 'Unexpected response'
      }
    } catch (error) {
      console.error('API error:', error)
      apiResponse.value = 'Error'
    }
  }


    return {
      filename,
      showWarning,
      checkFilename,
      logContent,
      rows,
      addRow,
      removeRow,
      callApi,
      apiResponse,
      selectedDate,
      selectedTime
    }
  }
}
</script>




<style>

.row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

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
