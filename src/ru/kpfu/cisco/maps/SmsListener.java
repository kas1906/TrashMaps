package ru.kpfu.cisco.maps;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.widget.Toast;


/**
 * Created by Кель on 19.11.2014.
 */
public class SmsListener extends BroadcastReceiver {
    private static final String SMS_REC_ACTION = "android.provider.Telephony.SMS_RECEIVED";
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals(SmsListener.SMS_REC_ACTION)){
            StringBuilder sb = new StringBuilder();

            Bundle bundle = intent.getExtras();
            if (bundle != null){
                Object[] pdus = (Object[]) bundle.get("pdus");
                for (Object pdu : pdus){
                    SmsMessage smsMessage = SmsMessage.createFromPdu((byte[]) pdu);

                    sb.append("\nMessage Body :" + smsMessage.getMessageBody());
                }

                Toast.makeText(context, "SMS" + sb.toString(), Toast.LENGTH_LONG).show();
            }
        }

    }
}
