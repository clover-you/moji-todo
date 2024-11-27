"use client"

import React from "react"
import { useDispatch } from "react-redux"

import { TaskList } from "@/components/task-list"
import { Button, Input } from "@/components/ui"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Task, TaskStatus } from "@/store/task"
import { invoke } from "@tauri-apps/api/core"
import { setTaskList, addTask } from "@/store/task"
import { ProgressBar } from "@/components/progress-bar"

import * as strings from "@/utils/strings"

export default function Home() {
  const inpValRef = React.useRef("")
  const inpRef = React.createRef<HTMLInputElement>()

  async function addTaskToDb() {
    if (!strings.has(inpValRef.current)) return

    await invoke("add_task", { task: { name: inpValRef.current.trim(), status: TaskStatus.Todo } })
    dispatch(addTask({ name: inpValRef.current, status: TaskStatus.Todo }))

    const inp = inpRef.current
    if (inp) inp.value = ""
    inpValRef.current = ""
  }

  const dispatch = useDispatch()

  async function loadTaskList() {
    const tasks = await invoke<Task[]>("get_tasks")
    dispatch(setTaskList(tasks))
  }

  React.useEffect(() => {
    loadTaskList()
  }, [])

  return (
    <main className="flex h-screen overflow-hidden flex-col items-center space-y-2 pt-0 box-border file:text-sm">
      <div className="flex w-full items-center space-x-2 flex-grow-0 p-4 pb-0">
        <Input
          placeholder="Task name"
          onChange={e => inpValRef.current = e.target.value}
          ref={inpRef}
        />
        <Button type="submit" variant="outline" onClick={addTaskToDb}>Add</Button>
      </div>

      <ScrollArea className="w-full flex-grow pl-4 pr-3 mr-1">
        <TaskList />
      </ScrollArea>

      <div className="flex-shrink-0 p-4 pt-0 w-full" >
        <ProgressBar />
      </div>
    </main>
  )
}
