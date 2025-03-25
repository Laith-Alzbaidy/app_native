import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";

export default function ReversedScrollView(props) {
  const { children } = props;
  const scrollViewRef = useRef(null);
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    // Scroll to the end of the content (for reverse scrolling)
    scrollViewRef.current.scrollToEnd({ animated: false });
  }, [windowWidth]);

  return (
    <ScrollView
      {...props}
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, flexDirection: "row-reverse" }}
      scrollEnabled={false}
    >
      {Platform.OS === "ios" ? (
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>{children}</View>
      ) : (
        children
      )}
    </ScrollView>
  );
}
