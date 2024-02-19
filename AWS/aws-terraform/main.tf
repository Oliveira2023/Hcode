provider "aws" {
    region = "us-east-1"
}
# resource "aws_s3_bucket" "bucket_lo" {
#   bucket = "bucket-lo"
# }
# resource "aws_key_pair" "chave_lo" {
#   key_name = "minha-chave"
#   public_key = file("./minha-chave.pub")
# }
# resource "aws_security_group" "sg_lo" {
#   name = "sg_lo"
#   description = "SG para teste"
#   vpc_id = "vpc-04dea6bc0ef005ae9"
#   ingress {
#     from_port = 22
#     to_port = 22
#     protocol = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
#   ingress {
#     from_port = 80
#     to_port = 80
#     protocol = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }
# resource "aws_instance" "webserver_lo" {
#   ami = "ami-0c7217cdde317cfec"
#   instance_type = "t2.micro"
#   key_name = aws_key_pair.chave_lo.key_name
#   vpc_security_group_ids = [aws_security_group.sg_lo.id]
#   subnet_id = "subnet-00965d3f18747f2fc"
# }