pkill ffserver
ffserver -f /etc/ffserver.conf & ffmpeg -f video4linux2 -i /dev/video0 -r 15 http://localhost:8090/webcam.ffm
nodejs ./upl-website-services.js