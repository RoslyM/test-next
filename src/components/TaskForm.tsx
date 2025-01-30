"use client";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { Task } from "@/app/domain/entities/Task";
import { useAppDispatch } from '@/app/redux/hooks';
import { addTask, editTask } from '@/app/redux/todosSlice';

interface TaskFormProps {
  task?: Task | null;
  onClose?: () => void;
}

const TaskForm : React.FC<TaskFormProps> = ({ task,onClose}) =>{

  const dispatch = useAppDispatch();


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm(
       { defaultValues: {
          titre: task?.title || '',
          description: task?.description || '',
          status: task?.isCompleted || '',
        }}
      );

      const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        if (task) {
          dispatch(editTask({
            id: task.id,
            data: {
              title: data.titre,
              description: data.description,
            }
          }))
         if(onClose){
          onClose();
         }
        } else {
          dispatch(addTask({ title: data.titre, description: data.description }))
          reset();
        }
      });


  return (
   
    <form onSubmit={onSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="titre">Titre <span className="text-[#17655B]">*</span></Label>
          <Input type="titre" className={`${errors.titre && 'border-red-500'}`} id="titre" placeholder="Titre"
            {...register("titre", {
                required: {
                  value: true,
                  message: "le titre est obligatoire",
                },
              })}
          />
          {errors.titre && (
      <span className="text-red-500 text-xs">
        {String(errors.titre.message)}
      </span>
    )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="Description">description <span className="text-[#17655B]">*</span></Label>
          <Textarea className={`${errors.description && 'border-red-500'}`} placeholder="Description"
            {...register("description", {
                required: {
                  value: true,
                  message: "La description est obligatoire",
                },
              })}
          />
          {errors.description && (
      <span className="text-red-500 text-xs">
        {String(errors.description.message)}
      </span>
    )}
        </div>

        <Button type="submit" className="w-full">{task ? 'Valider' : 'Ajouter'}</Button>
      </div>
    </form>
 
  )
}

export default TaskForm