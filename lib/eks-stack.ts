import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import { Construct } from 'constructs';
export class EksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, 'Vpc', {
      maxAzs: 2
    });
    const cluster = new eks.Cluster(this, 'EksCluster', {
      version: eks.KubernetesVersion.V1_31,
      vpc,
      defaultCapacity: 0
    });
    cluster.addNodegroupCapacity('NodeGroup', {
      desiredSize: 2,
      minSize: 1,
      maxSize: 3,
      instanceTypes: [new ec2.InstanceType('t3.medium')]
    });
  }
}
