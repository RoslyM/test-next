"use client"

import { useState, useEffect } from "react"


  import { Button } from "@/components/ui/button"
  import TaskForm from "@/components/TaskForm"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useAppDispatch,useAppSelector  } from '@/app/redux/hooks';
import { fetchTasks} from '@/app/redux/todosSlice';
import { Task } from "@/app/domain/entities/Task"
import TaskItem from "./TaskItem"
import { removeTask } from '@/app/redux/todosSlice';



function TaskList() {

  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.todos);
  const [open, setOpen] = useState(false);
  const [openTaskForm, setOpenTaskForm] = useState(false);
  
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch]);

  console.log(tasks)

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEditTaskClick = (task: Task) => {
    setSelectedTask(task);
    setOpenTaskForm(true);
  };

  const handleDeleteTaskClick = (task: Task) => {
    setOpen(true)
    setSelectedTask(task)
  };

  const handleDeleteTask = (id : string) =>{
    dispatch(removeTask(id));
    setOpen(false)
  }

  const closeDialog = () => {
    setOpenTaskForm(false);
    setSelectedTask(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
     
     <div className="flex gap-2 flex-wrap">
     {tasks.map((task: Task) => (
      
    <TaskItem key={task.id} task={task} onDeleteTaskClick={(task)=>handleDeleteTaskClick(task)} onEditTaskClick={(task)=>handleEditTaskClick(task)}/>

))}
     </div>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[15.75rem] w-[24rem] flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-center text-[1.875rem] font-semibold">Suppression</DialogTitle>
          <DialogDescription className="pt-3 text-center text-[#535862] text-sm">
          Voulez vous vraiment supprimer la <br></br> tache {selectedTask?.title} ?
          </DialogDescription>
        </DialogHeader>
          <div className="flex justify-between space-x-3 px-[3rem]">
            <Button onClick={() => setOpen(false)} className="w-full bg-[#ADADAC]" type="button">
              Annuler
            </Button>
            <Button onClick={() => selectedTask?.id && handleDeleteTask(selectedTask.id)} className="w-full" type="button">
              Valider
            </Button>
          </div>
      </DialogContent>
    </Dialog>

    <Dialog open={openTaskForm} onOpenChange={setOpenTaskForm}>
      <DialogContent className="w-[22rem] h-[24rem] flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-center text-[1.576rem]"> Modification</DialogTitle>
         <div>
         <TaskForm task={selectedTask} onClose={closeDialog}/>
         </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    </div>
  )
}

export default TaskList