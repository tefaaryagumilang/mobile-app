/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
//#import <FirebaseCore/FIRApp.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"

#import "TestFairy.h"
// #import <SplunkMint/SplunkMint.h>
#import <React/RCTLinkingManager.h>

// @import SplunkMint;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  [FIRApp configure];
//   [Mint sharedInstance].applicationEnvironment = @"SPLAppEnvRelease";
//  /** TODO: Replace with production URL and token **/
   // [[Mint sharedInstance] initAndStartSessionWithHECUrl:@"https:splunk.banksinarmas.com:8088/services/collector/mint" token:@"41EF2BFC-2FDC-4858-AE9D-5D61120383C4"];
   // [[Mint sharedInstance] disableNetworkMonitoring];
   // [[Mint sharedInstance] initAndStartSessionWithAPIKey:@"da917e0a"];


  /** Init TestFairy **/
  [TestFairy begin:@"563f426ca80b0e0c0b0418b78fca79f7bec95ca6"];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ubyapp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [RNSplashScreen show];
  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

@end
