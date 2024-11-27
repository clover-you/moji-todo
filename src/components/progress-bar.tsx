import { useSelector } from "@/store"
import { Progress } from "./ui"
import { TaskStatus } from "@/store/task"

export function ProgressBar() {
  const dataSource = useSelector(state => state.task.list)

  const [progress, total] = dataSource.reduce((acc, cur) => {
    if (cur.status == TaskStatus.Trash) return acc
    acc[1]++
    if (cur.status === TaskStatus.Done) acc[0]++
    return acc
  }, [0, 0])

  if (!total) return

  return <Progress value={(progress / total) * 100} />
}
