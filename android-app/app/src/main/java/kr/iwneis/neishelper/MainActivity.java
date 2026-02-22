package kr.iwneis.neishelper;

import android.app.AlertDialog;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import org.json.JSONObject;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {
    private static final String WEB_URL = "https://neis-helper.pages.dev";
    private static final String UPDATE_URL = "https://api.github.com/repos/insushim/iwneis/releases/latest";
    private WebView webView;
    private SwipeRefreshLayout swipeRefresh;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(createLayout());
        setupWebView();
        checkForUpdate();
    }

    private View createLayout() {
        android.widget.FrameLayout root = new android.widget.FrameLayout(this);
        root.setBackgroundColor(0xFFF8FAFC);

        swipeRefresh = new SwipeRefreshLayout(this);
        swipeRefresh.setColorSchemeColors(0xFF4F46E5);

        webView = new WebView(this);
        swipeRefresh.addView(webView);
        root.addView(swipeRefresh);

        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progressBar.setMax(100);
        progressBar.setProgressDrawable(getResources().getDrawable(android.R.drawable.progress_horizontal));
        android.widget.FrameLayout.LayoutParams lp = new android.widget.FrameLayout.LayoutParams(
                android.widget.FrameLayout.LayoutParams.MATCH_PARENT, 8);
        progressBar.setLayoutParams(lp);
        root.addView(progressBar);

        swipeRefresh.setOnRefreshListener(() -> {
            webView.reload();
            swipeRefresh.setRefreshing(false);
        });

        return root;
    }

    private void setupWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(false);
        settings.setDatabaseEnabled(true);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (url.startsWith(WEB_URL) || url.startsWith("https://neis-helper.pages.dev")) {
                    return false;
                }
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                return true;
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                progressBar.setVisibility(newProgress < 100 ? View.VISIBLE : View.GONE);
            }
        });

        if (isNetworkAvailable()) {
            webView.loadUrl(WEB_URL);
        } else {
            webView.loadUrl(WEB_URL);
        }
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
        NetworkInfo info = cm != null ? cm.getActiveNetworkInfo() : null;
        return info != null && info.isConnected();
    }

    private void checkForUpdate() {
        new Thread(() -> {
            try {
                URL url = new URL(UPDATE_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestProperty("Accept", "application/vnd.github+json");
                conn.setConnectTimeout(5000);

                InputStream is = conn.getInputStream();
                byte[] data = is.readAllBytes();
                is.close();

                JSONObject json = new JSONObject(new String(data));
                String latestVersion = json.getString("tag_name").replace("v", "");
                String currentVersion = getPackageManager()
                        .getPackageInfo(getPackageName(), 0).versionName;

                if (!latestVersion.equals(currentVersion)) {
                    String downloadUrl = json.getJSONArray("assets")
                            .getJSONObject(0).getString("browser_download_url");
                    runOnUiThread(() -> showUpdateDialog(latestVersion, downloadUrl));
                }
            } catch (Exception ignored) {}
        }).start();
    }

    private void showUpdateDialog(String version, String downloadUrl) {
        new AlertDialog.Builder(this)
                .setTitle("업데이트 알림")
                .setMessage("새 버전 " + version + "이 있습니다.\n업데이트하시겠습니까?")
                .setPositiveButton("업데이트", (d, w) ->
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(downloadUrl))))
                .setNegativeButton("나중에", null)
                .show();
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
