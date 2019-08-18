<template>
    <div class="container">
    <div class="row">
        <div class="col-sm-3">
        </div>
        <div class="col-sm-6">
            <h1>{{title}}</h1>
            <h5>{{subTitle}}</h5>
            <div class="form-label-group">
                <input type="text" class="form-control" placeholder="What are you doing?" v-model="newTodo" @keyup.enter="addTodo">
            </div>
            <hr>
            <h3 v-if="showNoItems" class="mb-0">No items available</h3>
            <ul class="list-group">
                <li class="list-group-item text-left" v-for="(todo,index) in todosFiltered">
                    <div class="todo-item-label" :class="{done:todo.completed}" v-if="!todo.editing">
                        {{todo.title}}
                    </div>
                    <div class="todo-item-input" v-else>
                        <input type="text" class="form-control" placeholder="What are you doing?" v-model="todo.title" @blur="doneEditTodo(todo)" @keyup.enter="doneEditTodo(todo)" @keyup.esc="cancelEditTodo(todo)" v-focus>
                    </div>
                    <hr>
                    <button type="button" class="btn btn-success btn-sm" @click="doneTodo(todo)">Done</button>
                    <button type="button" class="btn btn-warning btn-sm" @click="editTodo(todo)">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="removeTodo(index)">Remove</button>
                </li>
            </ul>
            <hr>
            <div class="filter">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" :class="{ active:filter=='all'}" @click="filter='all'">All</button>
                    <button type="button" class="btn btn-secondary" :class="{ active:filter=='active'}" @click="filter='active'">Active</button>
                    <button type="button" class="btn btn-secondary" :class="{ active:filter=='completed'}" @click="filter='completed'">Completed</button>
                </div>
            </div>
            <hr>
            <div class="counter text-left">
                Items left: {{remaining}}
            </div>
        </div>
            <div class="col-sm-3">
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'todo-list',
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
    computed: {
        remaining(){
            return this.todos.filter(item => !item.completed).length;
        },
        todosFiltered(){
            if(this.filter == 'all'){
                return this.todos;
            } else if(this.filter == 'active'){
                return this.todos.filter(item => !item.completed);
            } else if(this.filter == 'completed'){
                return this.todos.filter(item => item.completed);
            }
        },
        showNoItems(){
            if(this.filter == 'all'){
                return this.todos.length == 0;
            } else if(this.filter == 'active'){
                return this.todos.filter(item => !item.completed).length == 0;
            } else if(this.filter == 'completed'){
                return this.todos.filter(item => item.completed).length == 0;
            }
        }
    },
    directives: {
        focus: {
            inserted: function(el){
                el.focus()
            }
        }
    },
    methods: {
        addTodo(){
            if(this.newTodo.trim().length == 0){
                return
            } else {
                this.todos.push({
                    id: this.idForTodo,
                    title: this.newTodo,
                    completed: false,
                });
                this.newTodo = "";
                this.idForTodo++;
            }
        },
        editTodo(todo){
            todo.beforeEditCache = todo.title;
            todo.editing = true;
        },
        doneEditTodo(todo){
            if(todo.title.trim().length == 0){
                todo.title = todo.beforeEditCache;
            }
            todo.editing = false;
        },
        cancelEditTodo(todo){
            todo.title = todo.beforeEditCache;
            todo.editing = false;
        },
        removeTodo(index){
            this.todos.splice(index,1)
        },
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