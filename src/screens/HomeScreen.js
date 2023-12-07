import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchBreakingNews, fetchRecommendedNews} from '../utils/NewsApi';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MiniHeader from '../components/MiniHeader';
import BreakingNews from '../components/BreakingNews';
import NewsSection from '../components/NewsSection';
import PropTypes from 'prop-types';

const HomeScreen = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);
  const [currentBreakingBatchIndex, setCurrentBreakingBatchIndex] = useState(0);
  const [currentRecommendedBatchIndex, setCurrentRecommendedBatchIndex] =
    useState(0);

  // Breaking News
  const {isLoading: isBreakingLoading} = useQuery({
    queryKey: ['breakingNews', currentBreakingBatchIndex],
    queryFn: () => fetchBreakingNews(currentBreakingBatchIndex),
    onSuccess: async data => {
      const updatedBreakingNews = [...breakingNews, ...data.articles];
      setBreakingNews(updatedBreakingNews);

      // Save breaking news to local storage
      await AsyncStorage.setItem(
        '@breakingNews',
        JSON.stringify(updatedBreakingNews),
      );

      // Check if all headlines from the current batch have been displayed
      if (data.articles.length === 0) {
        // Reset local storage for the current batch
        await AsyncStorage.removeItem('@breakingNews');
        // Fetch the next batch
        setCurrentBreakingBatchIndex(prevIndex => prevIndex + 1);
      }
    },
    onError: error => {
      console.error('Error fetching breaking news:', error);
    },
  });

  // Recommended News
  const {isLoading: isRecommendedNewsLoading} = useQuery({
    queryKey: ['recommendedNews', currentRecommendedBatchIndex],
    queryFn: () => fetchRecommendedNews(currentRecommendedBatchIndex),
    onSuccess: async data => {
      const updatedRecommendedNews = [...recommendedNews, ...data.articles];
      setRecommendedNews(updatedRecommendedNews);

      // Save recommended news to local storage
      await AsyncStorage.setItem(
        '@recommendedNews',
        JSON.stringify(updatedRecommendedNews),
      );

      // Check if all headlines from the current batch have been displayed
      if (data.articles.length === 0) {
        // Reset local storage for the current batch
        await AsyncStorage.removeItem('@recommendedNews');
        // Fetch the next batch
        setCurrentRecommendedBatchIndex(prevIndex => prevIndex + 1);
      }
    },
    onError: error => {
      console.error('Error fetching recommended news:', error);
    },
  });

  // Load headlines from local storage on component mount
  useEffect(() => {
    const loadHeadlinesFromStorage = async () => {
      try {
        const storedBreakingNews = await AsyncStorage.getItem('@breakingNews');
        const storedRecommendedNews = await AsyncStorage.getItem(
          '@recommendedNews',
        );

        if (storedBreakingNews) {
          setBreakingNews(JSON.parse(storedBreakingNews));
        }

        if (storedRecommendedNews) {
          setRecommendedNews(JSON.parse(storedRecommendedNews));
        }
      } catch (error) {
        console.error('Error loading headlines from storage:', error);
      }
    };

    loadHeadlinesFromStorage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header />

      {isBreakingLoading ? (
        <Loading />
      ) : breakingNews.length > 0 ? (
        <View>
          <MiniHeader label="Breaking News" />
          <BreakingNews label={'Breaking News'} data={breakingNews} />
        </View>
      ) : (
        <Text>No breaking news available.</Text>
      )}

      <View style={{flex: 1}}>
        <MiniHeader label="Recommended News" />
        <ScrollView>
          {isRecommendedNewsLoading ? (
            <Loading />
          ) : recommendedNews.length > 0 ? (
            <NewsSection label="Recommendation" newsData={recommendedNews} />
          ) : (
            <Text>No recommended news available.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
