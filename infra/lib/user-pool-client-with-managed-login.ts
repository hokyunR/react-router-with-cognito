import { Construct } from "constructs";
import { aws_cognito as cognito } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import merge from "lodash.merge";

export interface UserPoolClientWithManagedLoginProps
  extends cognito.UserPoolClientProps {}

const defaultProps: Omit<UserPoolClientWithManagedLoginProps, "userPool"> = {
  authFlows: {
    userSrp: true,
  },
  generateSecret: false,
  enableTokenRevocation: true,
  // 인증 과정의 각 단계를 완료해야 하는 시간
  authSessionValidity: cdk.Duration.minutes(3),
  accessTokenValidity: cdk.Duration.hours(1),
  idTokenValidity: cdk.Duration.hours(1),
  refreshTokenValidity: cdk.Duration.days(30),
  oAuth: {
    flows: {
      authorizationCodeGrant: true,
    },
    scopes: [
      cognito.OAuthScope.OPENID,
      cognito.OAuthScope.EMAIL,
      cognito.OAuthScope.PROFILE,
    ],
  },
};

export class UserPoolClientWithManagedLogin extends cognito.UserPoolClient {
  constructor(
    scope: Construct,
    id: string,
    props: UserPoolClientWithManagedLoginProps,
  ) {
    const mergedProps = merge({}, defaultProps, props);

    super(scope, id, mergedProps);

    new cognito.CfnManagedLoginBranding(this, "ManagedLoginBranding", {
      userPoolId: mergedProps.userPool.userPoolId,
      clientId: this.userPoolClientId,
      useCognitoProvidedValues: true,
      returnMergedResources: true,
    });
  }
}
