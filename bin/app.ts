#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EksStack } from '../lib/eks-stack';
const app = new cdk.App();
new EksStack(app, 'EksStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'ap-south-1'
  }
});
