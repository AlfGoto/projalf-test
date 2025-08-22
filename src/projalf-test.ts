import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface ProjalfTestProps extends cdk.StackProps {
  serviceName: string;
  stage: string;
}

export class ProjalfTest extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ProjalfTestProps) {
    super(scope, id, props);
    // Add your infra here...
  }
}
