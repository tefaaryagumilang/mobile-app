//
//  RNAAILivenessView.h
//  Pods
//
//  Created by aaaa zhao on 2020/10/27.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNAAILivenessView : UIView

@property (nonatomic) BOOL showHUD;

@property (nonatomic, copy) NSArray<NSString *> *detectionActions;

// Should be called when view appear
- (void)graduallySetBrightness:(CGFloat)brightness;

// Should be called when view disappear
- (void)graduallyResumeBrightness;

// Reset view state
- (void)rnViewDidDisappear;

@end

NS_ASSUME_NONNULL_END
