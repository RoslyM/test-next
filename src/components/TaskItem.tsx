import React from 'react'
import {
    Card
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Task } from '@/app/domain/entities/Task'

  interface TaskItemProps {
    task: Task;
    onEditTaskClick: (task: Task) => void;
    onDeleteTaskClick: (task: Task) => void;
  }

const TaskItem: React.FC<TaskItemProps> = ({ task, onEditTaskClick,onDeleteTaskClick}) => {
  return (
    <Card key={task.id}  className="w-[16.25rem] h-[5.75rem] px-4 flex flex-col justify-center" >
    <div className="flex items-center relative">
    <RadioGroup defaultValue="comfortable" className="pt-2">
         <div className="flex items-center space-x-2">
             <RadioGroupItem value="default" id="r1" />
             <Label htmlFor="r1">{task.title}</Label>
         </div>
      </RadioGroup>
      <div className="flex items-center space-x-2 absolute right-0 top-0">
     <Pencil className="size-[1.2rem] text-[#A4A7AE] cursor-pointer" onClick={() => onEditTaskClick(task)} />
     <Trash2 className="size-[1.2rem] text-[#A4A7AE] cursor-pointer" onClick={() => onDeleteTaskClick(task)} />
     </div>
    </div>
    <p className="text-[#535862] text-sm pt-2 ps-[1.58rem]">{task.description}</p>
 </Card>
  )
}

export default TaskItem