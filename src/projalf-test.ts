import * as cdk from "aws-cdk-lib"
import * as apigw from "aws-cdk-lib/aws-apigatewayv2"
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as ln from "aws-cdk-lib/aws-lambda-nodejs"
import * as logs from "aws-cdk-lib/aws-logs"
import { Construct } from "constructs"

export interface ProjalfTestProps extends cdk.StackProps {
  serviceName: string
  stage: string
}

export class ProjalfTest extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ProjalfTestProps) {
    super(scope, id, props)

    const api = new apigw.HttpApi(this, "TransferApi", {
      corsPreflight: {
        allowHeaders: ["*"],
        allowMethods: [apigw.CorsHttpMethod.ANY],
        allowOrigins: ["*"],
      },
    })

    const apiFunction = new ln.NodejsFunction(this, "ApiFunction", {
      entry: `${__dirname}/functions/api/index.ts`,
      environment: {
        STAGE: props.stage,
        SERVICE: props.serviceName,
        NODE_OPTIONS: "--enable-source-maps",
      },
      bundling: { minify: true, sourceMap: true },
      runtime: lambda.Runtime.NODEJS_22_X,
      architecture: lambda.Architecture.ARM_64,
      logRetention: logs.RetentionDays.THREE_DAYS,
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
    })

    const apiIntegration = new integrations.HttpLambdaIntegration(
      "ApiIntegration",
      apiFunction,
    )
    api.addRoutes({
      path: "/{proxy+}",
      methods: [apigw.HttpMethod.GET, apigw.HttpMethod.POST],
      integration: apiIntegration,
      authorizer: undefined,
    })

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url ?? "",
      description: "API URL",
    })
  }
}
