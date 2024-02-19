import { CreateKeyPairCommand, CreateSecurityGroupCommand, DeleteKeyPairCommand, DeleteSecurityGroupCommand, EC2Client, RunInstancesCommand } from '@aws-sdk/client-ec2';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function main() {

    const region = "us-east-1";
    const keyPairName = "lo-keypair2";
    const vpcId = "vpc-04dea6bc0ef005ae9";
    const subnetId = "subnet-00965d3f18747f2fc";
    const securityGroupName = "meu-sg2";
    const imageId = "ami-0c7217cdde317cfec";
    const InstanceType = "t2.micro";
    

    const client = new EC2Client({
        region  
    })

    const { KeyMaterial } = await client.send(new CreateKeyPairCommand({
        KeyName: keyPairName
    }))
    writeFileSync(join(`./${keyPairName}`), KeyMaterial)

    const { GroupId } = await client.send(new CreateSecurityGroupCommand({
        GroupName: securityGroupName,
        VpcId: vpcId,
        Description: 'Grupo de seguranca',
    }))

    const { Instances } = await client.send(new RunInstancesCommand({
        MaxCount: 1,    
        MinCount: 1,
        ImageId: imageId,
        SubnetId: subnetId,
        keyName: keyPairName,
        InstanceType,
        SecurityGroupIds: [GroupId]
    }))

    console.log(Instances)

    setTimeout(async() => {

        await client.send(new DeleteKeyPairCommand({
            KeyName: keyPairName

        }))
        await client.send(new DeleteSecurityGroupCommand({
            GroupName: "meu-sg"
        }))

        console.log("deleted");    
    }, 60 * 1000 *2)

    console.log("Complete!")
    
}

main()
