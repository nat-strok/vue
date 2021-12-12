<template>
  <div class="container">

    <task-card-wrapper />

  </div>
</template>

<script>
import TaskForm from "@/components/TaskForm";
import TaskCardWrapper from "@/components/TaskCardWrapper";

export default {
  name: 'TodosCompleted',
  components: {
    TaskForm,
    TaskCardWrapper
  }
}
</script>

<style scoped>
</style>
