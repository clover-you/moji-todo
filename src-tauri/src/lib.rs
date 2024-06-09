#![allow(unexpected_cfgs)]

use std::{fs, ops::Add};

use store::setup_cache_url;
use tauri::Manager;

mod commands;
mod store;

// the following cfg clippy throw error with clippy in before git commit
#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let app_data_dir = app.path().app_data_dir().unwrap();
      let app_data_dir = app_data_dir.to_str().unwrap();

      // create a app-data directory if not exists
      if let Err(error) = fs::create_dir_all(app_data_dir) {
        println!("create_dir_all error {}", error);
      }

      let app_data_dir = String::from("sqlite:").add(app_data_dir).add("/cache.db");
      setup_cache_url(app_data_dir.as_str());

      Ok(())
    })
    .plugin(tauri_plugin_shell::init())
    .invoke_handler(tauri::generate_handler![
      commands::task::get_tasks,
      commands::task::add_task,
      commands::task::set_task_by_id
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
