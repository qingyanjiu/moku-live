sed -i "s/CALLBACK_URL/$1/g"  /nginx-1.9.0/conf/nginx.conf

/usr/local/nginx/sbin/nginx -c /nginx-1.9.0/conf/nginx.conf 

#nohup tty.js --config /ttyjs-config.json & 

