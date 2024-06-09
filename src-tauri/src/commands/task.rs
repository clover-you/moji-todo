use serde::Deserialize;

use crate::store::task::{add_task_to_db, get_task_list, update_task_by_id, Task};

#[tauri::command]
pub async fn get_tasks() -> Result<Vec<Task>, String> {
  let tasks = get_task_list().await;

  match tasks {
    Ok(list) => Ok(list),
    Err(err) => Err(format!("{}", err).to_string()),
  }
}

#[derive(Deserialize, Debug)]
pub struct AddTask {
  name: String,
  status: i32,
}

#[tauri::command]
pub async fn add_task(task: AddTask) -> Result<(), String> {
  match add_task_to_db(task.name, task.status).await {
    Err(err) => Err(format!("{}", err).to_string()),
    _ => Ok(()),
  }
}

#[derive(Deserialize)]
pub struct UpdateTask {
  id: i32,
  name: Option<String>,
  status: Option<i32>,
}

#[tauri::command]
pub async fn set_task_by_id(task: UpdateTask) -> Result<(), String> {
  let task_raw = update_task_by_id(task.id, task.status, task.name).await;

  match task_raw {
    Ok(_) => Ok(()),
    Err(err) => Err(format!("{}", err).to_string()),
  }
}
