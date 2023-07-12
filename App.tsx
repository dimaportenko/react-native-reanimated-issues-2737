import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Animated, {
  Easing,
  Layout,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

import {DataItemType, getData} from './src/data';
import {ListItem} from './src/ListItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function App() {
  const data = getData();
  console.log(data);

  const renderItem = ({item}: ListRenderItemInfo<DataItemType>) => {
    return <ListItem item={item} />;
  };

  const renderCell = useCallback((props: any) => {
    return (
      <Animated.View
        {...props}
        // layout={Layout.springify()}
        layout={Layout.easing(Easing.ease)}
        // entering={ZoomIn}
        exiting={ZoomOut}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFlatList
        data={data}
        keyExtractor={(item: DataItemType, index) => `${item.title}${index}`}
        renderItem={renderItem}
        CellRendererComponent={renderCell}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
