Dev workflow

edit source

	root@blockviz:/opt/splunk/etc/apps/mydjangoapp# vim django/mydjangoapp/templates/home.html 

restart

	root@blockviz:/opt/splunk/etc/apps/mydjangoapp# /opt/splunk/bin/./splunk restart

view app in on splunkweb

	http://blockviz.com:8000/en-us/account/login?return_to=%2Fdj%2Fen-us%2Fmydjangoapp%2Fhome%2F
