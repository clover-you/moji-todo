use sqlx::{migrate::MigrateDatabase, Pool, Sqlite};
use std::{error, sync::Mutex};

pub mod task;

static DB_URL: Mutex<String> = Mutex::new(String::new());

const CREATE_TASK_SCRIPT: &str = r#"
CREATE TABLE if NOT EXISTS task (
    id INTEGER PRIMARY key NOT NULL,
    name VARCHAR(512) NOT NULL,
    status INTEGER
)
"#;

pub async fn create_cache_store() -> Result<Pool<Sqlite>, Box<dyn error::Error>> {
  let url = DB_URL.lock().unwrap().clone();
  let url = url.as_str();

  if !sqlx::Sqlite::database_exists(url).await.unwrap_or(false) {
    sqlx::Sqlite::create_database(url).await?;
  }

  let db = sqlx::SqlitePool::connect(url).await?;

  sqlx::query(CREATE_TASK_SCRIPT).execute(&db).await?;

  Ok(db)
}

pub fn setup_cache_url(url: &str) {
  *DB_URL.lock().unwrap() = url.to_string();
}
