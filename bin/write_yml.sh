#!/bin/bash
# Function: append yml头部信息
# Usage: ./bin/write_yml dir_name(包含没有头文件信息文件的文件夹)
cd $1
for file in `ls`
do
suffix=${file#*.*}  # 截取左边起第一个 . 之后的所有字符
if [ ${suffix} == 'md' ]
then
fname=${file%.*} # % 从右边算起最后一个
filetmp=$file.tmp%
fname=${fname:0-11}
awk -v name="$fname" 'BEGIN{print "---\nlayout: post\ntitle: "name"\ntags:\n---\n"}{print $0}' $file > $filetmp
mv $filetmp $file
fi
done
