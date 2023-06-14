//
//  AAILivenessSDK.h
//  AAILivenessSDK
//
//  Created by Advance.ai on 2019/2/21.
//  Copyright © 2019 Advance.ai. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AAIDetectionConstant.h"
#import "AAILocalizationUtil.h"
#import "AAILivenessWrapView.h"

NS_ASSUME_NONNULL_BEGIN

@interface AAILivenessSDK : NSObject

+ (void)initWithAccessKey:(NSString *)accessKey secretKey:(NSString *)secretKey market:(AAILivenessMarket)market;

+ (void)initWithMarket:(AAILivenessMarket)market;

+ (NSString *)sdkVersion;

+ (void)configTicket:(NSString *)ticket;

+ (void)configQueryId:(NSString *)queryId;

+ (void)configResultPictureSize:(CGFloat)size;

@end

NS_ASSUME_NONNULL_END
