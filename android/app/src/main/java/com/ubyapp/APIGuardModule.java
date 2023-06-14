/**
 * Copyright (c) 2019 Shape Security, Inc. This source code and/or documentation is the confidential and copyrighted
 * property of Shape Security, Inc. All rights are reserved to Shape Security, Inc. The reproduction, preparation of
 * derivative works, distribution, public performance or public display of the source code and/or documentation is
 * not authorized unless expressly licensed.
 * Please contact
 *      Shape Security, Inc., Attn: Licensing Department,
 *      P.O. Box 772, Palo Alto, CA 94302
 *      licensing@shapesecurity.com
 *      650-399-0400
 * for information regarding commercial and/or trial license availability.
 */

package com.ubyapp;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.util.Log;
import com.apiguard3.AGRequest;
import com.apiguard3.AGResponse;
import com.apiguard3.APIGuard;
import com.apiguard3.NotReadyException;
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.io.IOException;
import java.security.cert.Certificate;
import java.util.List;
import java.util.Map;

/*
* Bridging layer for Mobile SDK
* */
public class APIGuardModule extends ReactContextBaseJavaModule {

    public static final String RES_DIR_RAW = "raw/";
    public final String TAG = "ReactNativeAndroid";
    private final ReactApplicationContext reactContext;
    APIGuard apiGuard;
    private boolean initialized = false;

    private APIGuard.Callback apiGuardCallback = new APIGuard.Callback() {
        @Override
        public void checkCertificates(List<Certificate> list, String s) throws IOException {
            // Provide cert pinning functionality for your domain here.
        }

        @Override
        public void log(String s) {
            ReactContext context = APIGuardModule.this.reactContext;
            if (context != null) {
                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("APIGuardLogEvent", s);
            }
        }
    };

    public APIGuardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.apiGuard = new APIGuard();
    }

    @Override
    public String getName() {
        return "APIGuard";
    }

    /**
     * This method initializes the APIGuard SDK. Call this method as early as possible preferably
     * in `componentDidMount` of the first component that your applications loads. This method
     * has protection built in to avoid getting called multiple times. So, you do not have to
     * worry about calling from multiple components in your app if you have multiple entry points.
     * @param resource - Name of the json config file provided in `res/raw` folder of the app.
     * @param environment - The environment where this app is being deployed to like "qa", "dev"
     *                    or "prod".
     */
    @ReactMethod
    public synchronized void initialize(String resource, String environment) {
        Log.d( TAG, "Initialize called with  " + resource);

        if (initialized) {
            return;
        }

        ReactApplication application = getApplication();
        if (application != null) {
            Context context = ((Application)application).getApplicationContext();
            if (context == null) {
                Log.e( TAG, "Error getting context from application");
                return;
            }

            int resourceId = context.getResources()
                    .getIdentifier(RES_DIR_RAW + resource, null, context.getPackageName());
            if (resourceId == 0) {
                Log.e( TAG, "Invalid resource id");
                return;
            }

            apiGuard.initialize((Application) application, apiGuardCallback,
                    resourceId, APIGuard.INIT_PROCEED, environment);
            initialized = true;
            Log.d( TAG, "Done initializing ");
        }
    }

    /**
     * This method gets the request headers for the protected URL. Please note that this method will
     * not return any headers if the provided URL is specified to be unprotected in the config file.
     * @param url - the url that needs to be protected.
     * @param callback - the method to be called with the results of the call.
     */
    @ReactMethod(isBlockingSynchronousMethod = true)    
    public WritableMap getRequestHeaders(String url) {
        try {
            AGRequest agRequest = new AGRequest.Builder().url(url).build();
            apiGuard.transformRequest(agRequest);
            WritableMap map = new WritableNativeMap();
            for (Map.Entry<String, String> entry : agRequest.getHeaders().entrySet()) {
                map.putString(entry.getKey(), entry.getValue());
            }
            return map;
        } catch (Exception e) {
            Log.d( TAG, "Exception while getting request headers: " + e.getMessage());
        }
        return null;
    }

    /**
     * This method processes the passed response headers from the response of the request made
     * to Shape servers.
     * @param headerMap - response headers from the server.
     */
    @ReactMethod
    public void parseResponseHeaders(ReadableMap headerMap) {
        Map<String, String> map = (Map) headerMap.toHashMap();
        if (map != null) {
            try {
                AGResponse agResponse = new AGResponse.Builder().headers(map).build();
                apiGuard.parseResponse(agResponse);
            } catch (NotReadyException e) {
                e.printStackTrace();
            }
        }
    }

    private ReactApplication getApplication() {
        Activity activity = this.reactContext.getCurrentActivity();
        if (activity != null) {
            return (ReactApplication)activity.getApplication();
        }
        return null;
    }
}
