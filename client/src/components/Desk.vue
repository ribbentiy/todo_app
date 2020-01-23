<template>
  <v-card :color="desk.local ? 'grey lighten-2' : ''">
    <v-card-title primary-title>
      {{ desk.title }}
      <v-spacer />
      <v-btn
        v-if="!desk.local && taskList.length === 0"
        color="red"
        dark
        fab
        small
        @click.stop="dialog = true"
      >
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <DelDeskDialog :desk="desk" @closeModal="dialog = false" />
      </v-dialog>
    </v-card-title>
    <v-card-text>
      <draggable
        class="task-list"
        v-bind="dragOptions"
        draggable=".task"
        :list="taskList"
        @start="onStart"
        @end="onEnd"
        :data-desk_id="desk._id"
      >
        <Task
          v-for="task in taskList"
          :key="task._id"
          :task_id="task._id"
          :desk_id="desk._id"
          class="task"
          :data-task_id = 'task._id'
        />
      </draggable>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn block text @click.stop="addTaskDialog = true"
        >Add task here...</v-btn
      >
      <v-dialog
        v-model="addTaskDialog"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <AddTask
          :desk="desk"
          :open="addTaskDialog"
          @closeModal="addTaskDialog = false"
        />
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import Task from "./Task";
import DelDeskDialog from "./DelDeskDialog";
import AddTask from "./AddTask";
import draggable from "vuedraggable";

export default {
  components: {
    Task,
    DelDeskDialog,
    AddTask,
    draggable
  },
  name: "Desk",
  data() {
    return {
      dialog: false,
      addTaskDialog: false
    };
  },
  props: ["desk"],
  methods: {
    onStart(opt) {
      this.$store.commit('task/setStartDragDesk', opt.from.dataset.desk_id);

    },
    onEnd(opt) {
      const task = this.$store.getters['task/getTask'](opt.item.dataset.task_id)
      this.$store.commit('task/setStopDragDesk', opt.to.dataset.desk_id);
      this.$store.dispatch('task/draggingTask', task)
    }
  },
  computed: {
    taskList() {
      return this.$store.getters["task/getList"](this.desk._id);
    },

    dragOptions() {
      return {
        animation: 200,
        group: "description",
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style scoped></style>
