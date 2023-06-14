package com.ubyapp;

import com.facebook.react.ReactActivity;
import com.example.app.OkHttpCertPin;
import com.facebook.react.modules.network.OkHttpClientProvider;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;



import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ubyapp";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      // ENABLE THIS ON PRODUCTION
      // OkHttpClientProvider.setOkHttpClientFactory(new OkHttpCertPin());


	    // init TestFairy TODO: remove testfairy from production build

        // set the env for reporting events TODO: set prodution setting

      SplashScreen.show(this);

    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }
}
