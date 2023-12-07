// Import necessary dependencies from React and React Native
import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {normalize, vh, vw} from '../constants/Dimension';
import PropTypes from 'prop-types'; // Import PropTypes
import {Images} from '../assets/Images/Images';

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  return text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

// Helper function to format a date
function formatDate(isoDate) {
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, options);
}

// Initialize animated values for row swiping
const rowSwipeAnimatedValues = {};
Array(20)
  .fill('')
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

// Functional component named NewsSection that takes newsData as a prop
const NewsSection = ({newsData}) => {
  // State hook to manage the list data
  const [listData, setListData] = useState(
    // Map newsData to an array of objects with keys and spreading the properties from each item
    newsData.map((item, index) => ({key: `${index}`, ...item})),
  );

  // Function to close a row
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  // Function to pin a row
  const pinRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    // Create a new array with the pinned item moved to the front
    const newData = [...listData];
    const pinnedItem = newData.find(item => item.key === rowKey);
    pinnedItem.isPinned = true; // Set the isPinned property
    newData.splice(newData.indexOf(pinnedItem), 1);
    newData.unshift(pinnedItem);
    setListData(newData);
  };

  // Function to delete a row
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    // Create a new array without the deleted item
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const unpinRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);

    // Find the item in the listData array
    const unpinnedItem = listData.find(item => item.key === rowKey);

    // Check if the item is already pinned
    if (unpinnedItem.isPinned) {
      // Create a new array with the unpinned item moved to its original position
      const newData = [...listData];
      unpinnedItem.isPinned = false; // Set the isPinned property to false
      newData.splice(newData.indexOf(unpinnedItem), 1);
      newData.splice(1, 0, unpinnedItem); // Move the item to its original position (adjust index accordingly)
      setListData(newData);
    } else {
      // Item is not pinned, no need to unpin
      console.warn('Item is not pinned. Cannot unpin.');
    }
  };

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    // Set the absolute value of the swipe to the corresponding animated value
    if (rowSwipeAnimatedValues[key]) {
      rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    }
  };

  // Function to render each item in the list
  const renderItem = data => (
    <TouchableOpacity style={styles.rowFront}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {data.item.isPinned && (
          <Image
            style={{width: 20, height: 20, marginRight: 5}}
            source={Images.pin}
          />
        )}
        {/* Display the image or a placeholder if the URL is not available */}
        <Image
          style={styles.newsImage}
          source={{
            uri: data.item.urlToImage || 'https://picsum.photos/200/300',
          }}
        />
        <View style={styles.newsTextContainer}>
          {/* Display truncated title, author, and formatted date */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* Add a pin icon if the item is pinned */}

            <Text style={styles.titleText}>
              {truncateText(data.item?.title, 35)}
            </Text>
          </View>
          <Text style={styles.authorText}>
            By {truncateText(data.item?.author, 20) || 'NA'}
          </Text>
          <Text>{formatDate(data.item.publishedAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Function to render the hidden swipe actions for each item
  const renderHiddenItem = ({item}, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.unpinBtn}
        onPress={() => unpinRow(rowMap, item.key)}>
        <Text style={styles.backTextWhite}>Unpin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => pinRow(rowMap, item.key)}>
        <Text style={styles.backTextWhite}>Pin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, item.key)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // Return the main component structure
  return (
    <View style={styles.container}>
      {/* SwipeListView component to display the list with swipe functionality */}
      <SwipeListView
        data={listData}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={100}
        rightOpenValue={-200}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={onSwipeValueChange}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backTextWhite: {
    color: '#FFF',
  },
  newsImage: {
    width: vw(100),
    height: vh(100),
    margin: normalize(12),
    borderRadius: normalize(20),
  },
  newsTextContainer: {
    flex: 1,
  },
  authorText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: normalize(8),
  },
  titleText: {
    marginBottom: normalize(8),
    fontSize: normalize(14),
    fontWeight: '600',
  },
  rowFront: {
    height: vh(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: normalize(10),
  },
  rowBack: {
    height: vh(100),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flex: 1,
    margin: normalize(10),
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: vw(90),
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: vw(90),
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  unpinBtn: {
    backgroundColor: 'grey',
    height: vh(100),
    width: vw(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

NewsSection.propTypes = {
  newsData: PropTypes.array.isRequired,
};

// Export the NewsSection component as the default export of this module
export default NewsSection;
