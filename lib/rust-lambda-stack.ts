import {HttpApi, HttpMethod} from '@aws-cdk/aws-apigatewayv2';
import {LambdaProxyIntegration} from '@aws-cdk/aws-apigatewayv2-integrations';
import {Code, Function, Runtime} from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

export class RustLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let rustFun = new Function(this, 'rust-fun', {
        code: Code.fromAsset("target/app/release"),
        handler: 'whatever',
        runtime: Runtime.PROVIDED_AL2,
    });

    let api = new HttpApi(this, 'rust-fun-api', {
        apiName: 'rust-fun-api'
    });

    api.addRoutes({
        path: '/rust',
        methods: [HttpMethod.GET],
        integration: new LambdaProxyIntegration({
            handler: rustFun
        })
    });
  }
}

