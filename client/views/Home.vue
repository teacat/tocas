<template>
  <div class="page">
    <counter></counter>
    <p>
      欲要開始，請編輯 <code>./client</code> 內的檔案並儲存。
    </p>
  </div>
</template>

<script>
import Counter from '../components/Counter'

export default {
  components: {
    Counter
  }
}
</script>
