import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cognito as cognito } from "aws-cdk-lib";
import { UserPoolClientWithManagedLogin } from "./user-pool-client-with-managed-login";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "UserPool", {
      signInAliases: {
        email: true,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new UserPoolClientWithManagedLogin(this, "UserPoolClient", {
      userPool: userPool,
      oAuth: {
        callbackUrls: ["http://localhost:5173/callback"],
        logoutUrls: ["http://localhost:5173/logout"],
      },
    });

    new cognito.UserPoolDomain(this, "UserPoolDomain", {
      userPool: userPool,
      managedLoginVersion: 2,
      cognitoDomain: {
        domainPrefix: cdk.Names.uniqueId(this).slice(-6),
      },
    });
  }
}
