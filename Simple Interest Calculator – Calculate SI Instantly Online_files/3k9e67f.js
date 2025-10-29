try { 
	webengage.onReady(function () {

            webengage.screen({
                'WebPushPermission': Notification.permission
            });

            webengage.options('webpush.disablePrompt', true);
       
        console.log('<<<----acknowldge prompt notification---->>>');
   });
 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', '3k9e67f');
	 }
 }
