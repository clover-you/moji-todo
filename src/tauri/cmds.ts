import { invoke } from "@tauri-apps/api/core";

import store from '@/store'

import { addTask, setTaskList, Task, TaskStatus } from "@/store/task";

export async function addTaskIPC(task: { name: string, status: TaskStatus }) {
  await invoke("add_task", { task })
  store.dispatch(addTask(task))
}

export async function fetchTaskListIPC() {
  const tasks = await invoke<Task[]>("get_tasks")
  store.dispatch(setTaskList(tasks))
}
