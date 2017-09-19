#!/bin/bash
# Function:rename files
# Usage: ./bin/rename.sh _posts/dirname_target
cd $1
for file in `ls`   #遍历 当前目录下, 或者 命令行传入参数1目录下 的所有文件
do
suffix=${file#*.*}  #截取文件名的前1个字符
if [ ${suffix} == 'md' ]
then
filename=$2$file  # $2 是命令行第二个参数 - 表示要添加的前缀，如 2017-09-18
mv $file $filename #修改该文件的文件名   # $2 是命令行第1个参数 - 表示要操作的目录夹名，如 notebook
fi
done