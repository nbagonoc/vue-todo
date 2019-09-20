<template>
  <li class="list-group-item text-left">
    <div class="todo-item-label" :class="{done:completed}" v-if="!editing">
      {{ title }}
    </div>
    <div class="todo-item-input" v-else>
      <input
        type="text"
        class="form-control"
        placeholder="What are you doing?"
        v-model="title"
        @blur="doneEditTodo"
        @keyup.enter="doneEditTodo"
        @keyup.esc="cancelEditTodo"
        v-focus
      />
    </div>
    <hr />
    <button type="button" class="btn btn-success btn-sm" @click="doneTodo(todo)">
      Done
    </button>
    <button type="button" class="btn btn-warning btn-sm" @click="editTodo">
      Edit
    </button>
    <button
      type="button"
      class="btn btn-danger btn-sm"
      @click="removeTodo(index)"
    >
      Remove
    </button>
  </li>
</template>

<script>
  export default {
    name: "todo-item",
    props: {
      todo: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        id: this.todo.id,
        title: this.todo.title,
        completed: this.todo.completed,
        editing: this.todo.editing,
        beforeEditCache: "",
      };
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus();
        }
      }
    },
    methods: {
      removeTodo(index) {
        // this.$emit("eventRemoveTodo", index);
        this.$store.state.todos.splice(index,1)
      },
      editTodo() {
        // console.log("editing state");
        this.beforeEditCache = this.title;
        this.editing = true;
      },
      doneEditTodo() {
        // console.log("enter was pressed");
        if (this.title.trim().length == 0) {
          this.title = this.beforeEditCache;
        }
        this.editing = false;
        const index = this.$store.state.todos.findIndex(item => item.id == this.id);
        this.$store.state.todos.splice(index, 1, {
            "id": this.id,
            "title": this.title,
            "completed": this.completed,
            "editing": this.editing,
        });
        // this.$emit("eventDoneEditTodo", {
        // eventBus.$emit("eventDoneEditTodo", {
        //   index: this.index,
        //   todo: {
        //     id: this.id,
        //     title: this.title,
        //     completed: this.completed,
        //     editing: this.editing
        //   }
        // });
      },
      cancelEditTodo() {
        // console.log("esc was pressed");
        this.title = this.beforeEditCache;
        this.editing = false;
      },
      doneTodo(todo) {
        this.completed = true;
        // this.$emit("eventDoneTodo", todo);
        eventBus.$emit("eventDoneTodo", todo);
      }
    }
  };
</script>
