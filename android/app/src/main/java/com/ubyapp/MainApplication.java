package com.ubyapp;

import android.app.Application;
import android.content.Context;
import androidx.multidex.MultiDex;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.soloader.SoLoader;
// import com.qr_payment.www.qr_payment.rnqrpaymentpackage;
import com.uby.util.RSAEncryptPackage;
import com.ubyapp.APIGuardPackage;
import cl.json.ShareApplication;

import ai.advance.liveness.lib.GuardianLivenessDetectionSDK;
import ai.advance.liveness.lib.Market;
import ai.advance.liveness.sdk.rn.LivenessReactPackage;
import ai.advance.liveness.lib.Detector;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  @Override
  public String getFileProviderAuthority() {
    return "com.ubyapp.provider";
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      packages.add(new RSAEncryptPackage());
      packages.add(new LivenessReactPackage());
      packages.add(new APIGuardPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  // new RNQrPaymentPackage()

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
    // for liveness dev -> GuardianLivenessDetectionSDK.init(this, "2ccbe59580579d6b", "8506c186a6c87e31", Market.Indonesia);
    // for liveness prod -> GuardianLivenessDetectionSDK.init(this, "8cde198e6671d0ee", "511f41ea2fc8eb34", Market.Indonesia);
    
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    GuardianLivenessDetectionSDK.init(this, "2ccbe59580579d6b", "8506c186a6c87e31", Market.Indonesia);
    GuardianLivenessDetectionSDK.letSDKHandleCameraPermission();
    GuardianLivenessDetectionSDK.setActionSequence(true, Detector.DetectionType.MOUTH, Detector.DetectionType.BLINK, Detector.DetectionType.POS_YAW);
    SoLoader.init(this, false);
    
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }
}
