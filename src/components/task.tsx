"use client"
import { CheckIcon, Cross2Icon, TrashIcon, ResetIcon } from "@radix-ui/react-icons"

import { Button, Card, CardContent, Popover, PopoverContent, PopoverTrigger } from "./ui"
import { TaskStatus, type Task } from "@/store/task"

interface TaskProps extends Task {
  /**
   * move the task to trash
   */
  onMoveToTrash?: () => void
  /**
   * cancel the task
   */
  onCancel?: () => void
  /**
   * done the task
   */
  onDone?: () => void
  /**
   * redo
   */
  onRedo?: () => void
}

function getClassNameByStatus(s: TaskStatus) {
  switch (s) {
    case TaskStatus.Cancel:
      return 'border-red-400 bg-red-400/10'
    case TaskStatus.Done:
      return 'border-lime-400 bg-lime-400/10'
  }
}

export function Task(props: TaskProps) {
  const statusClass = getClassNameByStatus(props.status)

  function action(state: TaskStatus, handle = () => { }) {
    if (props.status !== state) return handle()
    props.onRedo?.()
  }

  return (
    <Card className={`flex w-full mb-2 ${statusClass}`}>
      <CardContent className="py-1 justify-between flex w-full flex-row items-center">
        <p className="text-sm">{props.name}</p>
        <div>
          <Button variant="ghost" className="w-9 h-9 p-0"
            onClick={() => action(TaskStatus.Done, props.onDone)}
          >
            {props.status === TaskStatus.Done ? <ResetIcon /> :
              <CheckIcon color="#2ed573" height={18} width={18} />}
          </Button>

          <Button size={"sm"} variant="ghost" className="w-9 h-9 p-0"
            onClick={() => action(TaskStatus.Cancel, props.onCancel)}
          >
            {props.status === TaskStatus.Cancel ? <ResetIcon /> :
              <Cross2Icon height={16} width={16} />}
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button size={"sm"} variant="ghost" className="w-9 h-9 p-0">
                <TrashIcon color="red" height={16} width={16} />
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <p>Are you sure you want to delete it?</p>
              <div className="flex">
                <div className="flex-grow"></div>
                <Button size={"sm"} variant="ghost" onClick={props.onMoveToTrash}>DEL</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}
