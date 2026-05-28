// import { useActiveProjectChartData } from '@/hooks/use-active-project-chart-data'
import { missingFn } from '@/lib/utils'
import type { Project, Team } from '@/types'
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from 'react'

export const AppContext = createContext<{
  // activeEmployee: EmployeeData | undefined
  activeProject: Project | undefined
  // activeProjectChartData: ProjectChartItem[]
  // activeTask: TaskWithUser | undefined
  activeTeam: Team | undefined
  addProjectOpen: boolean
  addTaskOpen: boolean
  addTeamOpen: boolean
  isTouch: boolean | undefined
  // setActiveEmployee: Dispatch<SetStateAction<EmployeeData | undefined>>
  setActiveProject: Dispatch<SetStateAction<Project | undefined>>
  // setActiveTask: Dispatch<SetStateAction<TaskWithUser | undefined>>
  setActiveTeam: Dispatch<SetStateAction<Team | undefined>>
  setAddProjectOpen: Dispatch<SetStateAction<boolean>>
  setAddTaskOpen: Dispatch<SetStateAction<boolean>>
  setAddTeamOpen: Dispatch<SetStateAction<boolean>>
  // setUpdateEmployeeOpen: Dispatch<SetStateAction<boolean>>
  setUpdateProjectOpen: Dispatch<SetStateAction<boolean>>
  // setUpdateTaskOpen: Dispatch<SetStateAction<boolean>>
  setUpdateTeamOpen: Dispatch<SetStateAction<boolean>>
  // updateEmployeeOpen: boolean
  updateProjectOpen: boolean
  // updateTaskOpen: boolean
  updateTeamOpen: boolean
}>({
  // activeEmployee: undefined,
  activeProject: undefined,
  // activeProjectChartData: [],
  // activeTask: undefined,
  activeTeam: undefined,
  addProjectOpen: false,
  addTaskOpen: false,
  addTeamOpen: false,
  // setActiveEmployee: missingFn,
  setActiveProject: missingFn,
  // setActiveTask: missingFn,
  isTouch: undefined,
  setActiveTeam: missingFn,
  setAddProjectOpen: missingFn,
  setAddTaskOpen: missingFn,
  setAddTeamOpen: missingFn,
  // setUpdateEmployeeOpen: missingFn,
  setUpdateProjectOpen: missingFn,
  // setUpdateTaskOpen: missingFn,
  setUpdateTeamOpen: missingFn,
  // updateEmployeeOpen: false,
  updateProjectOpen: false,
  // updateTaskOpen: false,
  updateTeamOpen: false
})

export default function AppContextProvider({ children }: PropsWithChildren) {
  // const [activeEmployee, setActiveEmployee] = useState<
  //   EmployeeData | undefined
  // >(undefined)
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  )
  // const activeProjectChartData = useActiveProjectChartData(activeProject)
  // const [activeTask, setActiveTask] = useState<TaskWithUser | undefined>(
  //   undefined
  // )
  const [activeTeam, setActiveTeam] = useState<Team | undefined>(undefined)
  const [addProjectOpen, setAddProjectOpen] = useState(false)
  const [addTaskOpen, setAddTaskOpen] = useState(false)
  const [addTeamOpen, setAddTeamOpen] = useState(false)
  const [isTouch, setIsTouch] = useState<boolean | undefined>(undefined)
  // const [updateEmployeeOpen, setUpdateEmployeeOpen] = useState(false)
  const [updateProjectOpen, setUpdateProjectOpen] = useState(false)
  // const [updateTaskOpen, setUpdateTaskOpen] = useState(false)
  const [updateTeamOpen, setUpdateTeamOpen] = useState(false)

  // Add touch media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')

    function update() {
      setIsTouch(mediaQuery.matches)
    }

    update()

    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return (
    <AppContext
      value={{
        // activeEmployee,
        activeProject,
        // activeProjectChartData,
        // activeTask,
        activeTeam,
        addProjectOpen,
        addTaskOpen,
        addTeamOpen,
        isTouch,
        // setActiveEmployee,
        setActiveProject,
        // setActiveTask,
        setActiveTeam,
        setAddProjectOpen,
        setAddTaskOpen,
        setAddTeamOpen,
        // setUpdateEmployeeOpen,
        setUpdateProjectOpen,
        // setUpdateTaskOpen,
        setUpdateTeamOpen,
        // updateEmployeeOpen,
        updateProjectOpen,
        // updateTaskOpen,
        updateTeamOpen
      }}
    >
      {children}
    </AppContext>
  )
}
