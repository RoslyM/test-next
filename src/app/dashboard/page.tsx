"use client"

import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAppDispatch,useAppSelector  } from '@/app/redux/hooks';
import { fetchTasks} from '@/app/redux/todosSlice';

function DashboardPAge() {
   const dispatch = useAppDispatch();
    const { tasks } = useAppSelector((state) => state.todos);
    
    useEffect(() => {
      dispatch(fetchTasks())
    }, [dispatch]);
  return (
    <div className="flex flex-row">
  <div className="basis-[28%]">
  <div className="flex justify-center items-center h-screen">
    <Card className="w-[20rem] h-[22rem] flex flex-col justify-center" >
  <CardHeader>
    <CardTitle className="text-center text-[1.576rem]">Nouvelle tâche</CardTitle>
  </CardHeader>
  <CardContent>
    <TaskForm/>
    </CardContent>
</Card>
</div>
  </div>
  <div className="basis-[72%] bg-white h-[100vh] pt-6 px-[5rem]">
    <h1 className="text-[1.875rem] font-semibold">Liste des taches ({tasks.length})</h1>
    <p className="text-[#535862] text-[1rem] pt-2">Choisissez le secteur auquel appartient votre entreprise. Cette personnalisation nous aide à vous offrir une expérience sur mesure et pertinente.</p>

    <div className="mt-5">
    
      <TaskList/>

    </div>

  </div>
   </div>
    
  )
}

export default DashboardPAge