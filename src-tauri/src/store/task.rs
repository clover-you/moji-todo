use serde::Serialize;
use std::error;

use crate::store;

#[derive(sqlx::FromRow, Serialize)]
pub struct Task {
  id: i32,
  name: String,
  status: i32,
}

pub async fn get_task_list() -> Result<Vec<Task>, Box<dyn error::Error>> {
  let db = store::create_cache_store().await?;

  let tasks: Vec<Task> = sqlx::query_as("select * from task").fetch_all(&db).await?;

  Ok(tasks)
}

pub async fn update_task_by_id(
  id: i32,
  status: Option<i32>,
  name: Option<String>,
) -> Result<(), Box<dyn error::Error>> {
  let db = store::create_cache_store().await;
  let db = db.unwrap();

  let task_raw: Task = sqlx::query_as(format!("select * from task where id = {}", id).as_str())
    .fetch_one(&db)
    .await?;

  sqlx::query("update task set status = ? , name = ? where id = ?")
    .bind(status.unwrap_or(task_raw.status))
    .bind(name.unwrap_or(task_raw.name))
    .bind(id)
    .execute(&db)
    .await?;

  Ok(())
}

pub async fn add_task_to_db(name: String, status: i32) -> Result<(), Box<dyn error::Error>> {
  let pool = store::create_cache_store().await?;

  sqlx::query("insert into task(name, status) values(?, ?)")
    .bind(name)
    .bind(status)
    .execute(&pool)
    .await?;

  Ok(())
}
