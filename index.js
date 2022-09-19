const text = document.getElementById("text");
const date = document.getElementById("date");
const time = document.getElementById("time");
const tasks = [];
const printing = document.getElementById("section");

function save_task(form) {
  event.preventDefault();
  const items = {
    text: text.value,
    date: date.value,
    time: time.value,
    id: id_task(),
  };
  for (const props in items) {
    if (!items[props]) {
      alert('short: ' + props)
      return;
    }
  }
  tasks.push(items);
  form.reset();
  print_task();
}

function id_task() {
  const now_id = Number(localStorage.getItem("id"));
  const new_id = now_id + 1;
  localStorage.setItem("id", new_id);
  return new_id;
}

function print_task() {
  const new_id = localStorage.getItem("id");
  const previous_id = document.getElementById(new_id - 1);
  if (previous_id != null) {
    previous_id.classList.remove("anim_task");
  }
  for (const item of tasks) {
    if (item.id == new_id) {
      printr(item);
      const task = document.getElementById(new_id);
      task.classList.add("anim_task");
    }
  }
  save_storage();
}

function delete_task(id) {
  const task = document.getElementById(id);
  task.parentElement.removeChild(task);
  const num = Number(id);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === num) {
      tasks.splice(i, 1);
    }
  }
  save_storage();
}

function save_storage() {
  let tasks_json = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasks_json);
}

function get_storage() {
  const tasks_json = localStorage.getItem("tasks");
  const new_tasks = JSON.parse(tasks_json);
  return new_tasks;
}

function print_to_screen() {
  const new_tasks = get_storage();
  if (new_tasks != null) {
    for (const item of new_tasks) {
      printr(item);
      tasks.push(item);
    }
  }
}

function printr(item) {
  printing.innerHTML += `
  <div class="d1" id="${item.id}">
      <span class="span_x" onclick="delete_task(${item.id})">&#x2718;</span>
      <div class="text_task scrol">${item.text}</div>
      <div>${item.date}<br>${item.time}</div>
  </div>`;
}
