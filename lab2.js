// ES6+ example
import { IAMClient, CreateUserCommand, waitUntilUserExists, AttachUserPolicyCommand, CreateLoginProfileCommand } from "@aws-sdk/client-iam";

// a client can be shared by different commands.
const client = new IAMClient({ region: 'ap-southeast-1' });

async function createUser(username, password, arnPolicy) {
    //tao command moi tu class CreateUserCommand
    const createUserCommand = new CreateUserCommand({
        UserName: username
    });

    client.send(createUserCommand);

    // doi user tao thanh cong roi moi chay
    waitUntilUserExists({
        client: client,
        maxWaitTime: 2000
    }, { UserName: username });

    // attach policy vao user moi tao
    const attachUserPolicyCommand = new AttachUserPolicyCommand({
        UserName: username,
        PolicyArn: arnPolicy
    });
    client.send(attachUserPolicyCommand);

    // tao login profile voi passoword
    const createLoginProfileCommand = new CreateLoginProfileCommand({
        UserName: username,
        Password: password,
    });
    client.send(createLoginProfileCommand);

}
// function createLoginProfile(username, passoword) {
//     const createLoginProfileCommand = new CreateLoginProfileCommand({
//         UserName: username,
//         Password: passoword,
//     });
//     client.send(createLoginProfileCommand);
// }
// createLoginProfile('lab2-aws08', '123456Aa@')
createUser('lab2-aws08-1', '123456Aa@', 'arn:aws:iam::aws:policy/AmazonS3FullAccess')