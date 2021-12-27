import {ReactElement} from "react";
import {Dimensions, FlatList, ScrollView, Text, View} from "react-native";


function flatListDemo() {
  return (
    <FlatList
      data={Array(50).fill(0)}
      renderItem={(item): ReactElement => (
        <ScrollView
          snapToAlignment={"center"}
          pagingEnabled={true}
          // snapToInterval={1}
          horizontal
          key={String(item.index)}>
          {Array(8).fill(0).map((_, j) => (
            <View
              key={String(j)}
              style={{
                borderRightColor: "red",
                borderRightWidth: 3,
                width: Dimensions.get("window").width ,
                padding: 10,
                backgroundColor: "#789",
                marginBottom: 10,
              }}>
              <Text>{item.index}: page {j}</Text>
            </View>
          ))}
        </ScrollView>
      )} />
  );
}
