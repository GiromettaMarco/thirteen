// import { useActiveProjectChartData } from '@/hooks/use-active-project-chart-data'
import type { Team } from '@/types'
import {
  createContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from 'react'

export const AppContext = createContext<{
  // activeEmployee: EmployeeData | undefined
  // activeProject: Project | undefined
  // activeProjectChartData: ProjectChartItem[]
  // activeTask: TaskWithUser | undefined
  activeTeam: Team | undefined
  // addProjectOpen: boolean
  // addTaskOpen: boolean
  addTeamOpen: boolean
  // setActiveEmployee: Dispatch<SetStateAction<EmployeeData | undefined>>
  // setActiveProject: Dispatch<SetStateAction<Project | undefined>>
  // setActiveTask: Dispatch<SetStateAction<TaskWithUser | undefined>>
  setActiveTeam: Dispatch<SetStateAction<Team | undefined>>
  // setAddProjectOpen: Dispatch<SetStateAction<boolean>>
  // setAddTaskOpen: Dispatch<SetStateAction<boolean>>
  setAddTeamOpen: Dispatch<SetStateAction<boolean>>
  // setUpdateEmployeeOpen: Dispatch<SetStateAction<boolean>>
  // setUpdateProjectOpen: Dispatch<SetStateAction<boolean>>
  // setUpdateTaskOpen: Dispatch<SetStateAction<boolean>>
  setUpdateTeamOpen: Dispatch<SetStateAction<boolean>>
  // updateEmployeeOpen: boolean
  // updateProjectOpen: boolean
  // updateTaskOpen: boolean
  updateTeamOpen: boolean
}>({
  // activeEmployee: undefined,
  // activeProject: undefined,
  // activeProjectChartData: [],
  // activeTask: undefined,
  activeTeam: undefined,
  // addProjectOpen: false,
  // addTaskOpen: false,
  addTeamOpen: false,
  // setActiveEmployee: () => {
  //   console.error(
  //     'setActiveEmployee must be used within an AppContext provider'
  //   )
  // },
  // setActiveProject: () => {
  //   console.error('setActiveProject must be used within an AppContext provider')
  // },
  // setActiveTask: () => {
  //   console.error('setActiveTask must be used within an AppContext provider')
  // },
  setActiveTeam: () => {
    console.error('setActiveTeam must be used within an AppContext provider')
  },
  // setAddProjectOpen: () => {
  //   console.error(
  //     'setAddProjectOpen must be used within an AppContext provider'
  //   )
  // },
  // setAddTaskOpen: () => {
  //   console.error('setAddTaskOpen must be used within an AppContext provider')
  // },
  setAddTeamOpen: () => {
    console.error('setAddTeamOpen must be used within an AppContext provider')
  },
  // setUpdateEmployeeOpen: () => {
  //   console.error(
  //     'setUpdateEmployee must be used within an AppContext provider'
  //   )
  // },
  // setUpdateProjectOpen: () => {
  //   console.error(
  //     'setUpdateProjectOpen must be used within an AppContext provider'
  //   )
  // },
  // setUpdateTaskOpen: () => {
  //   console.error(
  //     'setUpdateTaskOpen must be used within an AppContext provider'
  //   )
  // },
  setUpdateTeamOpen: () => {
    console.error(
      'setUpdateTeamOpen must be used within an AppContext provider'
    )
  },
  // updateEmployeeOpen: false,
  // updateProjectOpen: false,
  // updateTaskOpen: false,
  updateTeamOpen: false
})

export default function AppContextProvider({ children }: PropsWithChildren) {
  // const [activeEmployee, setActiveEmployee] = useState<
  //   EmployeeData | undefined
  // >(undefined)
  // const [activeProject, setActiveProject] = useState<Project | undefined>(
  //   undefined
  // )
  // const activeProjectChartData = useActiveProjectChartData(activeProject)
  // const [activeTask, setActiveTask] = useState<TaskWithUser | undefined>(
  //   undefined
  // )
  const [activeTeam, setActiveTeam] = useState<Team | undefined>(undefined)
  // const [addProjectOpen, setAddProjectOpen] = useState(false)
  // const [addTaskOpen, setAddTaskOpen] = useState(false)
  const [addTeamOpen, setAddTeamOpen] = useState(false)
  // const [updateEmployeeOpen, setUpdateEmployeeOpen] = useState(false)
  // const [updateProjectOpen, setUpdateProjectOpen] = useState(false)
  // const [updateTaskOpen, setUpdateTaskOpen] = useState(false)
  const [updateTeamOpen, setUpdateTeamOpen] = useState(false)

  return (
    <AppContext
      value={{
        // activeEmployee,
        // activeProject,
        // activeProjectChartData,
        // activeTask,
        activeTeam,
        // addProjectOpen,
        // addTaskOpen,
        addTeamOpen,
        // setActiveEmployee,
        // setActiveProject,
        // setActiveTask,
        setActiveTeam,
        // setAddProjectOpen,
        // setAddTaskOpen,
        setAddTeamOpen,
        // setUpdateEmployeeOpen,
        // setUpdateProjectOpen,
        // setUpdateTaskOpen,
        setUpdateTeamOpen,
        // updateEmployeeOpen,
        // updateProjectOpen,
        // updateTaskOpen,
        updateTeamOpen
      }}
    >
      {children}
    </AppContext>
  )
}
