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

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;
import java.util.Arrays;

/*
* APIGuardPackage wraps the APIGuardModule into a ReactPackage class so that it can be utilized in the class
* */
public class APIGuardPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new APIGuardModule(reactContext));
    }
}