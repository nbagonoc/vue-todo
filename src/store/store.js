import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
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
    },
    getters: {
        remaining(state){
            return state.todos.filter(item => !item.completed).length;
        },
        todosFiltered(state){
            if(state.filter == 'all'){
                return state.todos;
            } else if(state.filter == 'active'){
                return state.todos.filter(item => !item.completed);
            } else if(state.filter == 'completed'){
                return state.todos.filter(item => item.completed);
            }
        },
        showNoItems(state){
            if(state.filter == 'all'){
                return state.todos.length == 0;
            } else if(state.filter == 'active'){
                return state.todos.filter(item => !item.completed).length == 0;
            } else if(state.filter == 'completed'){
                return state.todos.filter(item => item.completed).length == 0;
            }
        }
    },
});