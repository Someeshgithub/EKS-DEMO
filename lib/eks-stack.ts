import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { KubectlV31Layer } from '@aws-cdk/lambda-layer-kubectl-v31';

export class EksStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc');

    const cluster = new eks.Cluster(this, 'EksCluster', {
      version: eks.KubernetesVersion.V1_31,
      vpc: vpc,
      defaultCapacity: 0,

      // Add this
      kubectlLayer: new KubectlV31Layer(this, 'KubectlLayer'),
    });
  }
}