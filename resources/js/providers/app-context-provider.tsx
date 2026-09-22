import {
  createContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from 'react'
import { missingFn } from '@/lib/utils'
import type { Project, Task, Team } from '@/types'

export const AppContext = createContext<{
  activeProject: Project | undefined
  activeTask: Task | undefined
  activeTeam: Team | undefined
  addMemberOpen: boolean
  addProjectOpen: boolean
  addTaskOpen: boolean
  addTeamOpen: boolean
  setActiveProject: Dispatch<SetStateAction<Project | undefined>>
  setActiveTask: Dispatch<SetStateAction<Task | undefined>>
  setActiveTeam: Dispatch<SetStateAction<Team | undefined>>
  setAddMemberOpen: Dispatch<SetStateAction<boolean>>
  setAddProjectOpen: Dispatch<SetStateAction<boolean>>
  setAddTaskOpen: Dispatch<SetStateAction<boolean>>
  setAddTeamOpen: Dispatch<SetStateAction<boolean>>
  setUpdateMemberOpen: Dispatch<SetStateAction<boolean>>
  setUpdateProjectOpen: Dispatch<SetStateAction<boolean>>
  setUpdateTaskOpen: Dispatch<SetStateAction<boolean>>
  setUpdateTeamOpen: Dispatch<SetStateAction<boolean>>
  updateMemberOpen: boolean
  updateProjectOpen: boolean
  updateTaskOpen: boolean
  updateTeamOpen: boolean
}>({
  activeProject: undefined,
  activeTask: undefined,
  activeTeam: undefined,
  addMemberOpen: false,
  addProjectOpen: false,
  addTaskOpen: false,
  addTeamOpen: false,
  setActiveProject: missingFn,
  setActiveTask: missingFn,
  setActiveTeam: missingFn,
  setAddMemberOpen: missingFn,
  setAddProjectOpen: missingFn,
  setAddTaskOpen: missingFn,
  setAddTeamOpen: missingFn,
  setUpdateMemberOpen: missingFn,
  setUpdateProjectOpen: missingFn,
  setUpdateTaskOpen: missingFn,
  setUpdateTeamOpen: missingFn,
  updateMemberOpen: false,
  updateProjectOpen: false,
  updateTaskOpen: false,
  updateTeamOpen: false
})

export default function AppContextProvider({ children }: PropsWithChildren) {
  const [activeProject, setActiveProject] = useState<Project | undefined>(
    undefined
  )
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined)
  const [activeTeam, setActiveTeam] = useState<Team | undefined>(undefined)
  const [addMemberOpen, setAddMemberOpen] = useState(false)
  const [addProjectOpen, setAddProjectOpen] = useState(false)
  const [addTaskOpen, setAddTaskOpen] = useState(false)
  const [addTeamOpen, setAddTeamOpen] = useState(false)
  const [updateMemberOpen, setUpdateMemberOpen] = useState(false)
  const [updateProjectOpen, setUpdateProjectOpen] = useState(false)
  const [updateTaskOpen, setUpdateTaskOpen] = useState(false)
  const [updateTeamOpen, setUpdateTeamOpen] = useState(false)

  return (
    <AppContext
      value={{
        activeProject,
        activeTask,
        activeTeam,
        addMemberOpen,
        addProjectOpen,
        addTaskOpen,
        addTeamOpen,
        setActiveProject,
        setActiveTask,
        setActiveTeam,
        setAddMemberOpen,
        setAddProjectOpen,
        setAddTaskOpen,
        setAddTeamOpen,
        setUpdateMemberOpen,
        setUpdateProjectOpen,
        setUpdateTaskOpen,
        setUpdateTeamOpen,
        updateMemberOpen,
        updateProjectOpen,
        updateTaskOpen,
        updateTeamOpen
      }}
    >
      {children}
    </AppContext>
  )
}
