class TodoList {
    
    constructor(el) {

        this.toDo = [];
        this.el = el;
        this.el.addEventListener('click', (e) => this.handleClick(e));

    }

    handleClick(e) {

        e.preventDefault();
        let target = e.target;
        let id = target.parentNode.dataset.id

        if(target.className.includes('set-status')) {
            this.changeStatus(id);
        } else if(target.className.includes('delete')) {
            this.removeToDo(id);
        }

    }

    render() {

        let list = '';

        for (let el of this.toDo) {

            if (!el) {
                return;
            }

            let classTask = el.status ? "green" : "yellow";
            list += `<li data-id="${el.id}" class ="${classTask}">${el.value}<button class="set-status">Change status</button><button class="delete">Delete</button></li>`;

        }
        
        this.el.innerHTML = list;
    }

    getToDo() {

      return this.toDo;

    }

    setToDo(toDo) {

      this.toDo = toDo;

    }

    addToDo(v) {

      this.toDo.push(v);
      this.render();

    }

    changeStatus(id) {
        let index = this.toDo.findIndex((el) => el.id === id);
        this.toDo[index].status = !this.toDo[index].status;
        let task = document.querySelectorAll(`[data-id="${id}"]`)[0];
        
        if(this.toDo[index].status) {
            task.classList.remove('yellow');
            task.classList.add('green');
        } else {
            task.classList.remove('green');
            task.classList.add('yellow');
        }
    }
    
    
    findToDo(string) {

        let toDo = this.getToDo();
        this.toDo = this.toDo.filter(toDo => toDo.value && toDo.value.includes(string));

        this.render();
        this.setToDo(toDo);
    }
    

    removeToDo(id) {
    
      this.toDo = this.toDo.filter((el) => {
        return el.id !== id;
      });
    
      let task = document.querySelectorAll(`[data-id="${id}"]`)[0];
    
      task.remove();
    }
}


class Task {

    constructor(v, status) {

      this.value = v;
      this.status = status;
      this.id = Math.random().toString(36).substr(2, 9);

    }
}
  
let list = document.getElementById('list');
let todo1 = new TodoList(list);
todo1.addToDo(new Task('9345', true));
todo1.addToDo(new Task('2945hv', false));
console.log(todo1.getToDo());
todo1.render();
  
let create = document.getElementById('create');
let find = document.getElementById('find');
let input = document.querySelector('input');
  
create.addEventListener('click', (event) => {
    event.preventDefault();
    if(input.value) {
        todo1.addToDo(new Task(input.value, false));
    }
})
  
find.addEventListener('click', (event) => {
    event.preventDefault();
    if(input.value) {
        todo1.findToDo(input.value);
    }
})