use lambda_http::handler;

use ::lib::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Attach our own handler function to the lambda rust runtime, and run it.
    let runtime_handler = handler(func);
    lambda::run(runtime_handler).await?;
    Ok(())
}

