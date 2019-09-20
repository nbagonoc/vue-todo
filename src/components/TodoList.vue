<template>
    <div class="container">
        <div class="col-lg-6 mx-auto">
            <h1>{{title}}</h1>
            <h5>{{subTitle}}</h5>
            <div class="form-label-group">
                <input type="text" class="form-control" placeholder="What are you doing?" v-model="newTodo" @keyup.enter="addTodo">
            </div>
            <hr>
            <ItemRemaining :remaining="remaining"/>
            <hr>
            <h3 v-if="showNoItems" class="mb-0">No items available</h3>
            <ul class="list-group">
                <!-- <TodoItem  v-for="(todo,index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" @eventRemoveTodo="removeTodo" @eventDoneEditTodo="eventDoneEditTodo" @eventDoneTodo="doneTodo"/> -->
                <TodoItem  v-for="(todo,index) in todosFiltered" :key="todo.id" :todo="todo" :index="index"/>
            </ul>
            <hr>
            <TodoFilter/>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem';
import ItemRemaining from './ItemRemaining';
import TodoFilter from './TodoFilter';

export default {
    name: 'todo-list',
    components: {
        TodoItem,
        ItemRemaining,
        TodoFilter,
    },
    data(){
        return {
            newTodo: "",
            idForTodo: 4,
            beforeEditCache: "",
            filter: "all",
            todos: [
                {
                    'id':1,
                    'title':'sample title 1',
                    'completed':false,
                    'editing':false,
                },
                {
                    'id':2,
                    'title':'sample title 2',
                    'completed':false,
                    'editing':false,
                },
                {
                    'id':3,
                    'title':'sample title 3',
                    'completed':false,
                    'editing':false,
                },
            ],
            title: "Simple Todo",
            subTitle: "Yet another super duper simple todo app"
        }
    },
    created(){
        // eventBus.$on("eventRemoveTodo", (index)=>this.removeTodo(index));
        eventBus.$on("eventDoneEditTodo", (data)=>this.eventDoneEditTodo(data));
        eventBus.$on("eventDoneTodo", (todo)=>this.doneTodo(todo));
        eventBus.$on("eventChangeFilter", (filter)=>this.$store.state.filter = filter);
    },
    computed: {
        remaining(){
            return this.$store.getters.remaining
        },
        todosFiltered(){
            return this.$store.getters.todosFiltered
        },
        showNoItems(){
            return this.$store.getters.showNoItems
        }
    },
    // directives: {
    //     focus: {
    //         inserted: function(el){
    //             el.focus()
    //         }
    //     }
    // },
    methods: {
        addTodo(){
            if(this.newTodo.trim().length == 0){
                return
            } else {
                this.$store.state.todos.push({
                    id: this.idForTodo,
                    title: this.newTodo,
                    completed: false,
                });
                this.newTodo = "";
                this.idForTodo++;
            }
        },
        // editTodo(todo){
        //     todo.beforeEditCache = todo.title;
        //     todo.editing = true;
        // },
        // doneEditTodo(todo){
        //     if(todo.title.trim().length == 0){
        //         todo.title = todo.beforeEditCache;
        //     }
        //     todo.editing = false;
        // },
        // eventDoneEditTodo(data){
        //     this.$store.state.todos.splice(data.index, 1, data.todo);
        // },
        // cancelEditTodo(todo){
        //     todo.title = todo.beforeEditCache;
        //     todo.editing = false;
        // },
        // removeTodo(index){
        //     this.$store.state.todos.splice(index,1)
        // },
        doneTodo(todo){
            todo.completed = true;
        }
    }
}
</script>

<style lang="scss">
    .done{
        text-decoration: line-through;
    }
</style>