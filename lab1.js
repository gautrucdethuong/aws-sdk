import {GetCallerIdentityCommand, STSClient} from "@aws-sdk/client-sts";

const stsClient = new STSClient({
    region: 'ap-southeast-1'
});

const getCallerIdentityCommand = new GetCallerIdentityCommand({});

stsClient.send(getCallerIdentityCommand).then(res => console.log(res));