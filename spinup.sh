#!/bin/bash

while getopts ":hpudc" opt; do
	case ${opt} in
		h )
			printf "HELP MESSAGE \n"
			printf "USAGE: ./spinup.sh [OPTION]... \n\n" 
			printf "-h for HELP, -u to START the project to , -d to STOP the project, or -C for TEARDOWN \n\n" 
			exit 1
			;;
		u )
			printf "[PARKING-APP] START: Build & Spin up container \n"
			docker compose build --no-cache
			docker compose up -d
			printf "[PARKING-APP] URL: http://localhost:4000 \n"
			printf "[PARKING-APP] SCRIPT FINISHED \n\n"
			exit 1
			;;
		d )
			printf "[PARKING-APP] STOP: Shutting down container \n"
			docker compose down 
			printf "[PARKING-APP] SCRIPT FINISHED \n\n"
			exit 1
			;;
		c )
			printf "[PARKING-APP] TEARDOWN: Shutting down and removing container resources \n"
			docker compose down --rmi all -v --remove-orphans
			printf "[PARKING-APP] SCRIPT FINISHED \n\n"
			exit 1
			;;
		\? ) 
			echo "Invalid option: $OPTARG" 1>&2
			exit 1
			;;
	esac
done
shift $((OPTIND -1))

printf "USAGE: ./spinup.sh [OPTION]... \n\n" 
printf "COMMANDS: -h for HELP, -u to START the project to , -d to STOP the project, or -C for TEARDOWN \n\n" 
exit 1
;;

