//
//  RNAAILivenessSDK.m
//  Pods
//
//  Created by aaaa zhao on 2020/10/28.
//

#import "RNAAILivenessSDK.h"
#import <AAILivenessSDK/AAILivenessSDK.h>

@implementation RNAAILivenessSDK

RCT_EXPORT_MODULE()

- (instancetype)init
{
    self = [super init];
    if (self) {
        
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXPORT_METHOD(init:(NSString *)accessKey secretKey:(NSString *)secretKey market:(NSString *)market)
{
    AAILivenessMarket currMarket = [RNAAILivenessSDK marketWithStr: market];
    [AAILivenessSDK initWithAccessKey:accessKey secretKey: secretKey market: currMarket];
}

RCT_EXPORT_METHOD(sdkVersion:(RCTResponseSenderBlock)callback)
{
    NSString *version = [AAILivenessSDK sdkVersion];
    callback(@[version]);
}

+ (AAILivenessMarket)marketWithStr:(NSString *)marketStr
{
    NSDictionary *map = @{
        @"AAILivenessMarketIndonesia": @(AAILivenessMarketIndonesia),
        @"AAILivenessMarketIndia": @(AAILivenessMarketIndia),
        @"AAILivenessMarketPhilippines": @(AAILivenessMarketPhilippines),
        @"AAILivenessMarketVietnam": @(AAILivenessMarketVietnam),
        @"AAILivenessMarketThailand": @(AAILivenessMarketThailand)
    };
    return (AAILivenessMarket)(map[marketStr]);
}

@end
