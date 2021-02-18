use lambda::Context;
use lambda_http::{IntoResponse, Request, Response};
use serde_json::json;

pub type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

pub async fn func(event: Request, _ctx: Context) -> Result<impl IntoResponse, Error> {
    println!("{:?}", event);
    Ok(Response::builder().status(200).body::<String>(json!({ "message": "Done" }).to_string()).unwrap())
}
