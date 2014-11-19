package ru.kpfu.cisco.maps;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.webkit.*;

import java.lang.annotation.Annotation;
import android.widget.Toast;

public class MyActivity extends Activity {
    /**
     * Called when the activity is first created.
     */
    private WebView webView;
    private boolean newSms = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        webView = (WebView) findViewById(R.id.webView);
        WebClient webClient = new WebClient();
        webView.setWebViewClient(webClient);
        webView.setWebChromeClient(new WebChromeClient());
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
        webView.getSettings().setAppCacheEnabled(true);
        webView.addJavascriptInterface(new JavaScriptInterface(this), "app");
        webClient.shouldOverrideUrlLoading(webView, "file:///android_asset/index.html");
    }


    public class JavaScriptInterface {

        private Context context;

        public  JavaScriptInterface(Context context) {
            this.context = context;
        }

        @JavascriptInterface
        public void makeToast(String message, boolean lengthLong){
            Toast.makeText(context, message, (lengthLong ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT)).show();
        }

        @JavascriptInterface
        public boolean hasNewSms() {
            return newSms;
        }

        @JavascriptInterface
        public String getLastSms() {
            String out = "";

            return out;
        }

    }

}
