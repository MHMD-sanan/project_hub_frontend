import { configureStore } from "@reduxjs/toolkit";
import loginReduser from "./developer/developerAuth";
import adminlogin from "./admin/adminAuth";
import kanban from "./developer/KanbanBoard";
import project from "./developer/SingleProject";
import loggedDeveloper from "./developer/loggedDevelper";

export default configureStore({
  reducer: {
    developerLogin: loginReduser,
    adminLogin: adminlogin,
    kanbanBoard: kanban,
    singleProject: project,
    loggedDeveloper,
  },
});
