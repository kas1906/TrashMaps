package ru.kpfu.cisco.maps;

import android.app.Activity;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.*;

import java.lang.annotation.Annotation;

import android.widget.Toast;

public class MyActivity extends Activity {
    /**
     * Called when the activity is first created.
     */
    private WebView webView;
    public static boolean newSms = false;
    public static String smsText = "";
    public static long lastSmsId;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
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
        webClient.shouldOverrideUrlLoading(webView, "file:///android_asset/index.htm");
    }


    public class JavaScriptInterface {

        private Context context;

        public JavaScriptInterface(Context context) {
            this.context = context;
        }

        @JavascriptInterface
        public void makeToast(String message, boolean lengthLong) {
            Toast.makeText(context, message, (lengthLong ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT)).show();
        }

        @JavascriptInterface
        public boolean hasNewSms() {
            return newSms;
        }

        @JavascriptInterface
        public String getLastSms() {
            newSms = false;
            return smsText;
        }

    }

}
